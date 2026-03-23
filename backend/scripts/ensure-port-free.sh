#!/bin/sh

set -eu

TARGET_PORT="${BACKEND_PORT:-${PORT:-4008}}"

if ! command -v lsof >/dev/null 2>&1; then
	echo "[ensure-port-free] lsof 명령을 찾을 수 없어 포트 점검을 건너뜁니다. port=${TARGET_PORT}"
	exit 0
fi

LISTENING_PIDS="$(lsof -tiTCP:"${TARGET_PORT}" -sTCP:LISTEN 2>/dev/null || true)"

if [ -z "${LISTENING_PIDS}" ]; then
	echo "[ensure-port-free] port ${TARGET_PORT} is already free"
	exit 0
fi

echo "[ensure-port-free] port ${TARGET_PORT} is in use by: ${LISTENING_PIDS}"
echo "[ensure-port-free] sending SIGTERM to the listening process(es)"

for pid in ${LISTENING_PIDS}; do
	kill "${pid}" 2>/dev/null || true
done

sleep 1

for pid in ${LISTENING_PIDS}; do
	if kill -0 "${pid}" 2>/dev/null; then
		echo "[ensure-port-free] pid ${pid} is still alive, sending SIGKILL"
		kill -9 "${pid}" 2>/dev/null || true
	fi
done

echo "[ensure-port-free] port ${TARGET_PORT} cleanup finished"
