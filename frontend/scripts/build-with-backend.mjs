import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const nodeBin = process.execPath;
const TERMINATION_SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"];
const BACKEND_HOST = "127.0.0.1";
const BACKEND_READY_TIMEOUT_MS = 30_000;
const BACKEND_POLL_INTERVAL_MS = 250;
const FORCE_KILL_TIMEOUT_MS = 5_000;
const runNextBuildScript = fileURLToPath(
	new URL("./run-next-build.mjs", import.meta.url),
);
const backendStartScript = fileURLToPath(
	new URL("../../backend/scripts/start-ci.mjs", import.meta.url),
);
const backendWorkingDirectory = path.dirname(path.dirname(backendStartScript));

const getExplicitBackendUrl = () => {
	const value = process.env.BACKEND_API_URL?.trim();
	return value ? value : undefined;
};

const resolveCommandExit = (child, name) =>
	new Promise((resolve, reject) => {
		child.once("error", reject);
		child.once("exit", (code, signal) => {
			resolve({ code, name, signal });
		});
	});

const exitWithResult = ({ code, signal }) => {
	if (signal) {
		process.kill(process.pid, signal);
		return;
	}

	process.exit(code ?? 1);
};

const createAvailablePort = () =>
	new Promise((resolve, reject) => {
		const server = net.createServer();

		server.once("error", reject);
		server.listen(0, BACKEND_HOST, () => {
			const address = server.address();

			if (!address || typeof address === "string") {
				server.close(() => {
					reject(new Error("사용 가능한 포트를 확인하지 못했습니다."));
				});
				return;
			}

			server.close((error) => {
				if (error) {
					reject(error);
					return;
				}

				resolve(address.port);
			});
		});
	});

const waitForBackend = async (backendUrl, child) => {
	const deadline = Date.now() + BACKEND_READY_TIMEOUT_MS;
	let lastError;

	while (Date.now() < deadline) {
		if (child.exitCode !== null || child.signalCode !== null) {
			throw new Error("임시 백엔드가 준비되기 전에 종료되었습니다.");
		}

		try {
			const response = await fetch(`${backendUrl}/healthz`);

			if (response.ok) {
				return;
			}

			lastError = new Error(
				`백엔드 상태 확인에 실패했습니다. status=${response.status}`,
			);
		} catch (error) {
			lastError = error;
		}

		await delay(BACKEND_POLL_INTERVAL_MS);
	}

	throw new Error(
		`임시 백엔드 준비 시간이 초과되었습니다.${
			lastError instanceof Error ? ` ${lastError.message}` : ""
		}`,
	);
};

const terminateProcessGroup = (pid, signal) => {
	if (process.platform === "win32") {
		return false;
	}

	try {
		process.kill(-pid, signal);
		return true;
	} catch {
		return false;
	}
};

const terminateChild = async (child, signal = "SIGTERM") => {
	if (child.exitCode !== null || child.signalCode !== null) {
		return;
	}

	const exitPromise = resolveCommandExit(child, "child");
	const hasKilledProcessGroup = child.pid
		? terminateProcessGroup(child.pid, signal)
		: false;

	if (!hasKilledProcessGroup) {
		child.kill(signal);
	}

	const forceKillPromise = delay(FORCE_KILL_TIMEOUT_MS).then(() => {
		if (child.exitCode === null && child.signalCode === null) {
			const hasKilledProcessGroupWithSigKill = child.pid
				? terminateProcessGroup(child.pid, "SIGKILL")
				: false;

			if (!hasKilledProcessGroupWithSigKill) {
				child.kill("SIGKILL");
			}
		}
	});

	await Promise.race([exitPromise, forceKillPromise]);
	await exitPromise;
};

const spawnBackend = (port) => {
	const backendUrl = `http://${BACKEND_HOST}:${port}`;
	const backendProcess = spawn(nodeBin, [backendStartScript], {
		cwd: backendWorkingDirectory,
		detached: process.platform !== "win32",
		env: {
			...process.env,
			PORT: String(port),
		},
		stdio: "inherit",
	});

	return { backendProcess, backendUrl };
};

const spawnBuild = (backendUrl) =>
	spawn(nodeBin, [runNextBuildScript, ...process.argv.slice(2)], {
		cwd: process.cwd(),
		env: {
			...process.env,
			BACKEND_API_URL: backendUrl,
		},
		stdio: "inherit",
	});

let backendProcess;
let shuttingDown = false;
const signalHandlers = new Map();

const cleanup = async (signal) => {
	if (shuttingDown) {
		return;
	}

	shuttingDown = true;

	for (const [registeredSignal, handler] of signalHandlers) {
		process.off(registeredSignal, handler);
	}
	signalHandlers.clear();

	if (backendProcess) {
		await terminateChild(backendProcess, signal ?? "SIGTERM");
	}
};

for (const signal of TERMINATION_SIGNALS) {
	const handler = async () => {
		await cleanup(signal);
		process.kill(process.pid, signal);
	};

	signalHandlers.set(signal, handler);
	process.on(signal, handler);
}

try {
	const explicitBackendUrl = getExplicitBackendUrl();
	const backendUrl = explicitBackendUrl
		? explicitBackendUrl
		: `http://${BACKEND_HOST}:${await createAvailablePort()}`;

	if (!explicitBackendUrl) {
		const port = new URL(backendUrl).port;
		const spawnedBackend = spawnBackend(Number(port));
		backendProcess = spawnedBackend.backendProcess;
		const backendResultPromise = resolveCommandExit(backendProcess, "backend");

		await Promise.race([
			waitForBackend(spawnedBackend.backendUrl, backendProcess),
			backendResultPromise.then(({ code, signal }) => {
				throw new Error(
					`임시 백엔드가 조기에 종료되었습니다. code=${code ?? "null"} signal=${signal ?? "null"}`,
				);
			}),
		]);
	}

	const buildProcess = spawnBuild(backendUrl);
	const buildResult = await resolveCommandExit(buildProcess, "build");

	await cleanup();
	exitWithResult(buildResult);
} catch (error) {
	await cleanup();
	throw error;
}
