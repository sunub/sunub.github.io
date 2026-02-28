import { defineConfig, devices } from "@playwright/test";
import {
	DEFAULT_BACKEND_API_URL,
	DEFAULT_FRONTEND_BASE_URL,
	resolveBackendUrls,
	resolveFrontendUrls,
} from "@sunub/contracts";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const backendUrls = resolveBackendUrls(process.env, DEFAULT_BACKEND_API_URL);
const backendUrl = backendUrls.playwright;
const frontendUrls = resolveFrontendUrls(
	process.env,
	DEFAULT_FRONTEND_BASE_URL,
);
const testFrontendUrl = process.env.PLAYWRIGHT_FRONTEND_URL ?? frontendUrls.e2e;
const fallbackBackendPort = new URL(DEFAULT_BACKEND_API_URL).port;
let backendPort = fallbackBackendPort;
try {
	const parsedBackendUrl = new URL(backendUrl);
	backendPort = parsedBackendUrl.port || fallbackBackendPort;
} catch {
	// Keep fallback port when custom URL is not parseable.
}

export default defineConfig({
	testDir: "./test/e2e",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,

	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : 3,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	timeout: 60 * 1000,
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		baseURL: testFrontendUrl,
		/* Base URL to use in actions like `await page.goto('/')`. */
		// baseURL: 'http://localhost:3000',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: "on-first-retry",
		actionTimeout: 15 * 1000,
		navigationTimeout: 30 * 1000,
		launchOptions: {
			slowMo: 0,
		},
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},

		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		// {
		//   name: 'Google Chrome',
		//   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: [
		{
			command: "pnpm --filter backend run start:ci",
			url: `${backendUrl}/healthz`,
			reuseExistingServer: !process.env.CI,
			timeout: 180 * 1000, // 빌드 시간 + 서버 구동 시간 고려해서 넉넉하게
			cwd: ".",
			stdout: "pipe",
			stderr: "pipe",
			env: {
				NODE_ENV: "test",
				PORT: backendPort,
			},
		},
		{
			command: "pnpm --filter frontend run start",
			url: testFrontendUrl,
			reuseExistingServer: !process.env.CI,
			timeout: 180 * 1000,
			cwd: ".",
			stdout: "pipe",
			stderr: "pipe",
			env: {
				NODE_ENV: "test",
				NEXT_PUBLIC_BASE_URL: testFrontendUrl,
				NEXT_PUBLIC_BACKEND_URL: backendUrl,
				BACKEND_API_URL: backendUrl,
				TEST_BACKEND_URL: backendUrl,
			},
		},
	],

	/* 전역 설정으로 서버 준비 대기 */
	// globalSetup: './test/global-setup.ts',
});
