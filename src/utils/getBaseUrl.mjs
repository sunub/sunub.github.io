import { exec } from "child_process";

export const getBaseUrl = async () => {
	return new Promise((resolve, reject) => {
		exec("git rev-parse --abbrev-ref HEAD", (err, stdout) => {
			if (process.env.NODE_ENV === "development") {
				resolve("http://localhost:3000");
			}

			if (err) {
				reject(err);
			}
			if (typeof stdout === "string" && stdout.trim() === "dev") {
				resolve("https://sunub.vercel.app");
			} else if (
				typeof stdout === "string" &&
				stdout.trim() === "sunub"
			) {
				resolve("https://sunub.vercel.app");
			}
		});
	});
};
