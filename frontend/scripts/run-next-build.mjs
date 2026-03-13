import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const suppressedMessage = "[baseline-browser-mapping]";

const child = spawn(
	process.execPath,
	[nextBin, "build", ...process.argv.slice(2)],
	{
		env: {
			...process.env,
			BACKEND_API_URL: process.env.BACKEND_API_URL ?? "http://localhost:4008",
			BASELINE_BROWSER_MAPPING_IGNORE_OLD_DATA: "true",
			BROWSERSLIST_IGNORE_OLD_DATA: "true",
		},
		stdio: ["inherit", "pipe", "pipe"],
	},
);

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

child.on("exit", (code, signal) => {
	if (signal) {
		process.kill(process.pid, signal);
		return;
	}

	process.exit(code ?? 1);
});
