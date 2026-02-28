import {
	DEFAULT_FRONTEND_BASE_URL,
	resolveFrontendUrls,
} from "@sunub/contracts";

const frontendUrls = resolveFrontendUrls(
	process.env,
	DEFAULT_FRONTEND_BASE_URL,
);

export const E2E_TEST_URL = frontendUrls.e2e;
