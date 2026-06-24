import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, devices } from "@playwright/test";
import { resolveFrontendUrls } from "@sunub/contracts";

const skipWebServer = process.env.PLAYWRIGHT_SKIP_WEB_SERVER === "1";

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
const testFrontendUrl = "http://localhost:4004";
const frontendUrls = resolveFrontendUrls(process.env, testFrontendUrl);
const resolvedFrontendUrl = frontendUrls.e2e;
const repoRootPath = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	testDir: "./test/e2e/tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	snapshotPathTemplate: "{testDir}/__snapshots__/{testFileBaseName}/{arg}{ext}",

	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : 3,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: "html",
	timeout: 60 * 1000,
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		baseURL: resolvedFrontendUrl,
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
		{
			name: "Mobile Chrome",
			use: { ...devices["Pixel 5"] },
		},
		{
			name: "Mobile Safari",
			use: { ...devices["iPhone 12"] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: skipWebServer
		? undefined
		: [
				{
					command: "pnpm run start:all",
					url: resolvedFrontendUrl,
					reuseExistingServer: !process.env.CI,
					timeout: 240 * 1000, // 빌드 시간 포함하여 더 넉넉하게
					cwd: ".",
					stdout: "pipe",
					stderr: "pipe",
					env: {
						NODE_ENV: "test",
						NEXT_PUBLIC_BASE_URL: resolvedFrontendUrl,
						PLAYWRIGHT_FRONTEND_URL: resolvedFrontendUrl,
						BLOG_POSTS_PATH: path.resolve(repoRootPath, "../posts"),
						PORT: "4004",
					},
				},
			],
});
