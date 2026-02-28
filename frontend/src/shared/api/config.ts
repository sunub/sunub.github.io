import {
	DEFAULT_BACKEND_API_URL,
	resolveBackendApiBaseUrl,
	type BackendRuntime,
} from "@sunub/contracts";

const runtime: BackendRuntime = (() => {
	if (typeof window !== "undefined") {
		return "browser";
	}

	if (process.env.NODE_ENV === "test") {
		return "test";
	}

	return "server";
})();

const baseUrl = resolveBackendApiBaseUrl(runtime, {
	env: process.env,
	fallback: DEFAULT_BACKEND_API_URL,
});

export const API_CONFIG = {
	baseUrl,
};

export function buildApiUrl(path: string) {
	return `${API_CONFIG.baseUrl}${path}`;
}
