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

await rm(indexFilePath, { force: true });

const child = spawn(process.execPath, [nestBin, "start"], {
	env: {
		...process.env,
		NODE_ENV: "production",
	},
	stdio: "inherit",
});

child.on("exit", (code, signal) => {
	if (signal) {
		process.kill(process.pid, signal);
		return;
	}

	process.exit(code ?? 1);
});
