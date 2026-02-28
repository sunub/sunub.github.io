import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import {
	DEFAULT_BACKEND_API_URL,
	DEFAULT_FRONTEND_BASE_URL,
	resolveBackendUrls,
	resolveFrontendUrls,
} from "@sunub/contracts";

const backendUrls = resolveBackendUrls(process.env, DEFAULT_BACKEND_API_URL);
const frontendUrls = resolveFrontendUrls(
	process.env,
	DEFAULT_FRONTEND_BASE_URL,
);

const testBackendUrl = process.env.TEST_BACKEND_URL ?? backendUrls.test;
const nextPublicBackendUrl =
	process.env.NEXT_PUBLIC_BACKEND_URL ?? backendUrls.browser;
const serverBackendUrl = process.env.BACKEND_API_URL ?? backendUrls.server;
const frontendBaseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? frontendUrls.base;

export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	test: {
		env: {
			NODE_ENV: "test",
			TEST_BACKEND_URL: testBackendUrl,
			NEXT_PUBLIC_BACKEND_URL: nextPublicBackendUrl,
			BACKEND_API_URL: serverBackendUrl,
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
