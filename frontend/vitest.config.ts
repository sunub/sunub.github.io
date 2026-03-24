import { fileURLToPath } from "node:url";
import {
	DEFAULT_FRONTEND_BASE_URL,
	resolveFrontendUrls,
} from "@sunub/contracts";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

const frontendUrls = resolveFrontendUrls(
	process.env,
	DEFAULT_FRONTEND_BASE_URL,
);

const frontendBaseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? frontendUrls.base;

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	resolve: {
		alias: {
			"server-only": fileURLToPath(
				new URL("./test/mocks/server-only.ts", import.meta.url),
			),
		},
	},
	test: {
		env: {
			NODE_ENV: "test",
			NEXT_PUBLIC_BASE_URL: frontendBaseUrl,
		},
		name: "unit",
		include: ["test/unit/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["node_modules/**", "dist/**", ".next/**"],
		globals: true,
		environment: "jsdom",
		setupFiles: ["./test/setup.ts"],
		coverage: {
			reporter: ["text", "json-summary", "json", "html", "lcovonly"],
			thresholds: {
				lines: 60,
				branches: 60,
				functions: 63,
				statements: 60,
			},
		},
	},
});
