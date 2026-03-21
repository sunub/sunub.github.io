import { spawn } from "node:child_process";
import { rm } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const nestBin = require.resolve("@nestjs/cli/bin/nest.js");

const resolvePostsRootPath = () => {
	const configuredPostsPath = process.env.BLOG_POSTS_PATH;
	if (configuredPostsPath) {
		return path.isAbsolute(configuredPostsPath)
			? configuredPostsPath
			: path.resolve(process.cwd(), configuredPostsPath);
	}

	return path.resolve(scriptDir, "../../posts");
};

const postsRootPath = resolvePostsRootPath();
const indexFilePath = path.join(postsRootPath, "posts.jsonl");
const TERMINATION_SIGNALS = ["SIGINT", "SIGTERM", "SIGHUP"];
const FORCE_KILL_TIMEOUT_MS = 5_000;

await rm(indexFilePath, { force: true });

const child = spawn(process.execPath, [nestBin, "start"], {
	env: {
		...process.env,
		NODE_ENV: "production",
	},
	stdio: "inherit",
});

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
