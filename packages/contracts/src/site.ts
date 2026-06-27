import type { Category } from "./categories";
import {
	FRONTEND_URL_ENV_KEYS,
	type FrontendUrlEnv,
	type FrontendUrlEnvName,
	type FrontendUrlResolveInput,
	SITE_URL_ENV_KEYS,
	type SiteUrlEnv,
	type SiteUrlEnvName,
	type SiteUrlResolveInput,
} from "./env";

export const DEFAULT_FRONTEND_BASE_URL = "http://localhost:3000";
export const DEFAULT_FRONTEND_TEST_URL = "http://localhost:4004";
export const DEFAULT_SITE_URL = "https://sunub.site";

export const SITE_PATHS = {
	archive: "/archive/all",
	archiveCategory: (category: Category) =>
		`/archive/${encodeURIComponent(category)}`,
	postCategory: (category: Category) => `/post/${encodeURIComponent(category)}`,
	postDetail: (category: Category, slug: string) =>
		`/post/${encodeURIComponent(category)}/${encodeURIComponent(slug)}`,
} as const;

export const ROUTE_QUERY_PARAMS = {
	archiveCategory: "category",
} as const;

const getEnvValue = (
	env: FrontendUrlEnv | SiteUrlEnv,
	key: FrontendUrlEnvName | SiteUrlEnvName,
): string | undefined => {
	const value = env[key];
	if (value === undefined) return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

function normalizeBaseUrl(url: string): string {
	return url.replace(/\/+$/, "");
}

function joinBaseUrl(baseUrl: string, pathname: string): string {
	const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
	if (!pathname) return normalizedBaseUrl;
	if (/^https?:\/\//.test(pathname)) return pathname;
	const normalizedPathname = pathname.startsWith("/")
		? pathname
		: `/${pathname}`;
	return `${normalizedBaseUrl}${normalizedPathname}`;
}

export function resolveFrontendBaseUrl({
	env,
	fallback = DEFAULT_FRONTEND_BASE_URL,
}: FrontendUrlResolveInput): string {
	return normalizeBaseUrl(
		getEnvValue(env, FRONTEND_URL_ENV_KEYS.NEXT_PUBLIC_BASE_URL) ?? fallback,
	);
}

export function resolvePlaywrightFrontendUrl({
	env,
	fallback = DEFAULT_FRONTEND_TEST_URL,
}: FrontendUrlResolveInput): string {
	return (
		getEnvValue(env, FRONTEND_URL_ENV_KEYS.PLAYWRIGHT_FRONTEND_URL) ??
		getEnvValue(env, FRONTEND_URL_ENV_KEYS.FRONTEND_E2E_BASE_URL) ??
		resolveFrontendBaseUrl({ env, fallback }) ??
		fallback
	);
}

export function resolveFrontendUrls(env: FrontendUrlEnv, fallback?: string) {
	const defaultBaseUrl = fallback ?? DEFAULT_FRONTEND_BASE_URL;
	const defaultTestUrl = DEFAULT_FRONTEND_TEST_URL;
	return {
		base: resolveFrontendBaseUrl({ env, fallback: defaultBaseUrl }),
		e2e: resolvePlaywrightFrontendUrl({ env, fallback: defaultTestUrl }),
	};
}

export function resolveSiteUrl({
	env,
	fallback = DEFAULT_SITE_URL,
}: SiteUrlResolveInput): string {
	return normalizeBaseUrl(
		getEnvValue(env, SITE_URL_ENV_KEYS.SITE_URL) ??
			getEnvValue(env, SITE_URL_ENV_KEYS.NEXT_PUBLIC_SITE_URL) ??
			getEnvValue(
				env as any,
				FRONTEND_URL_ENV_KEYS.NEXT_PUBLIC_BASE_URL as any,
			) ??
			fallback,
	);
}

export function resolveSitePathUrl(
	pathname: string,
	{ env, fallback = DEFAULT_SITE_URL }: SiteUrlResolveInput,
): string {
	return joinBaseUrl(resolveSiteUrl({ env, fallback }), pathname);
}
