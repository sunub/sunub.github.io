import {
	type BackendRuntime,
	DEFAULT_BACKEND_API_URL,
	resolveBackendApiBaseUrl,
} from "@sunub/contracts";

const getBackendRuntime = (): BackendRuntime => {
	if (typeof window !== "undefined") {
		return "browser";
	}

	if (process.env.NODE_ENV === "test") {
		return "test";
	}

	return "server";
};

const normalizePath = (path: string) =>
	path.startsWith("/") ? path : `/${path}`;

const resolveBrowserBaseUrl = () => "";

const resolveBackendBaseUrl = (runtime: BackendRuntime): string => {
	return resolveBackendApiBaseUrl(runtime, {
		env: process.env,
		fallback: DEFAULT_BACKEND_API_URL,
	});
};

const resolveFrontendSafeBaseUrl = (): string => {
	const runtime = getBackendRuntime();

	if (runtime === "browser") {
		return resolveBrowserBaseUrl();
	}

	return resolveBackendBaseUrl(runtime);
};

export const API_CONFIG = {
	get baseUrl() {
		return resolveFrontendSafeBaseUrl();
	},
};

export function buildApiUrl(path: string) {
	const normalizedPath = normalizePath(path);
	const currentRuntime = getBackendRuntime();
	const baseUrl =
		currentRuntime === "browser" ? "" : resolveBackendBaseUrl(currentRuntime);

	return `${baseUrl}${normalizedPath}`;
}
