import {
	DEFAULT_FRONTEND_TEST_URL,
	resolveFrontendUrls,
} from "@sunub/contracts";

export const E2E_TEST_URL = resolveFrontendUrls(
	process.env,
	DEFAULT_FRONTEND_TEST_URL,
).e2e;
