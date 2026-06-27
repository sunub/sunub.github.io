// packages/contracts/src/api.ts
import {
	BACKEND_URL_ENV_KEYS,
	type BackendRuntime,
	type BackendUrlEnv,
	type BackendUrlEnvName,
	type BackendUrlResolveInput,
} from "./env";

export const DEFAULT_BACKEND_API_URL = "http://localhost:4008";
export const DEFAULT_REWRITE_TARGET_URL = DEFAULT_BACKEND_API_URL;

export const API_PATHS = {
	posts: {
		all: () => "/api/posts",
		archiveSummary: () => "/api/archives/summary",
		archiveRange: (category: string, offset: number, limit: number) =>
			`/api/archives/posts?category=${encodeURIComponent(category)}&offset=${offset}&limit=${limit}`,
		byCategory: (category: string) =>
			`/api/categories/${encodeURIComponent(category)}/posts`,
		bySlug: (category: string, slug: string) =>
			`/api/categories/${encodeURIComponent(category)}/posts/${encodeURIComponent(slug)}`,
		latest: () => "/api/posts?sort=latest",
		latestRange: (offset: number, limit: number) =>
			`/api/posts?sort=latest&offset=${offset}&limit=${limit}`,
	},
	search: (query: string) => `/api/posts?q=${encodeURIComponent(query)}`,
};

const getEnvValue = (
	env: BackendUrlEnv,
	key: BackendUrlEnvName,
): string | undefined => {
	const value = env[key];
	if (value === undefined) return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

export function resolveBrowserBackendUrl({
	env,
	fallback = DEFAULT_BACKEND_API_URL,
}: BackendUrlResolveInput): string {
	return (
		getEnvValue(env, BACKEND_URL_ENV_KEYS.NEXT_PUBLIC_BACKEND_URL) ??
		getEnvValue(env, BACKEND_URL_ENV_KEYS.EC2_PUBLIC_API_URL) ??
		fallback
	);
}

export function resolveServerBackendUrl({
	env,
	fallback = DEFAULT_BACKEND_API_URL,
}: BackendUrlResolveInput): string {
	return (
		getEnvValue(env, BACKEND_URL_ENV_KEYS.BACKEND_API_URL) ??
		resolveBrowserBackendUrl({ env, fallback })
	);
}

export function resolveTestBackendUrl({
	env,
	fallback = DEFAULT_BACKEND_API_URL,
}: BackendUrlResolveInput): string {
	return (
		getEnvValue(env, BACKEND_URL_ENV_KEYS.TEST_BACKEND_URL) ??
		resolveBrowserBackendUrl({ env, fallback })
	);
}

export function resolvePlaywrightBackendUrl({
	env,
	fallback = DEFAULT_BACKEND_API_URL,
}: BackendUrlResolveInput): string {
	return (
		getEnvValue(env, BACKEND_URL_ENV_KEYS.PLAYWRIGHT_BACKEND_URL) ??
		resolveServerBackendUrl({ env, fallback })
	);
}

export function resolveBackendApiBaseUrl(
	runtime: BackendRuntime,
	input: BackendUrlResolveInput,
): string {
	if (runtime === "browser") return resolveBrowserBackendUrl(input);
	if (runtime === "test") return resolveTestBackendUrl(input);
	return resolveServerBackendUrl(input);
}

export function resolveBackendUrls(env: BackendUrlEnv, fallback?: string) {
	return {
		playwright: resolvePlaywrightBackendUrl({ env, fallback }),
		browser: resolveBrowserBackendUrl({ env, fallback }),
		server: resolveServerBackendUrl({ env, fallback }),
		test: resolveTestBackendUrl({ env, fallback }),
	};
}

export function resolveRewriteTargetUrl({
	env,
	fallback = DEFAULT_REWRITE_TARGET_URL,
}: BackendUrlResolveInput): string {
	return (
		getEnvValue(env, BACKEND_URL_ENV_KEYS.BACKEND_API_URL) ??
		getEnvValue(env, BACKEND_URL_ENV_KEYS.EC2_PUBLIC_API_URL) ??
		getEnvValue(env, BACKEND_URL_ENV_KEYS.NEXT_PUBLIC_BACKEND_URL) ??
		fallback
	);
}
