import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const suppressedMessage = "[baseline-browser-mapping]";
const TERMINATION_SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"];
const FORCE_KILL_TIMEOUT_MS = 5_000;

const child = spawn(
	process.execPath,
	[nextBin, "build", ...process.argv.slice(2)],
	{
		env: {
			...process.env,
			BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA: "true",
			BROWSERSLIST_IGNORE_OLD_DATA: "true",
		},
		stdio: ["inherit", "pipe", "pipe"],
	},
);

let forcedKillTimer;
const signalHandlers = new Map();

const clearForcedKillTimer = () => {
	if (forcedKillTimer) {
		clearTimeout(forcedKillTimer);
		forcedKillTimer = undefined;
	}
};

const removeSignalHandlers = () => {
	for (const signal of TERMINATION_SIGNALS) {
		const handler = signalHandlers.get(signal);

		if (handler) {
			process.off(signal, handler);
		}
	}
	clearForcedKillTimer();
};

const handleTerminationSignal = (signal) => {
	if (child.exitCode !== null || child.signalCode !== null) {
		removeSignalHandlers();
		process.kill(process.pid, signal);
		return;
	}

	child.kill(signal);
	clearForcedKillTimer();
	forcedKillTimer = setTimeout(() => {
		if (child.exitCode === null && child.signalCode === null) {
			child.kill("SIGKILL");
		}
	}, FORCE_KILL_TIMEOUT_MS);
	forcedKillTimer.unref?.();
};

for (const signal of TERMINATION_SIGNALS) {
	const handler = () => {
		handleTerminationSignal(signal);
	};
	signalHandlers.set(signal, handler);
	process.on(signal, handler);
}

const forwardStream = (stream, target) => {
	stream.setEncoding("utf8");
	let buffer = "";

	stream.on("data", (chunk) => {
		buffer += chunk;

		while (true) {
			const newlineIndex = buffer.indexOf("\n");
			if (newlineIndex === -1) {
				break;
			}

			const line = buffer.slice(0, newlineIndex + 1);
			buffer = buffer.slice(newlineIndex + 1);

			if (!line.includes(suppressedMessage)) {
				target.write(line);
			}
		}
	});

	stream.on("end", () => {
		if (buffer && !buffer.includes(suppressedMessage)) {
			target.write(buffer);
		}
	});
};

forwardStream(child.stdout, process.stdout);
forwardStream(child.stderr, process.stderr);

child.on("error", (error) => {
	removeSignalHandlers();
	throw error;
});

child.on("exit", (code, signal) => {
	removeSignalHandlers();

	if (signal) {
		process.kill(process.pid, signal);
		return;
	}

	process.exit(code ?? 1);
});
