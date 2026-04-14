export const DEFAULT_BACKEND_API_URL = "http://localhost:4008";
export const DEFAULT_REWRITE_TARGET_URL = DEFAULT_BACKEND_API_URL;
export const DEFAULT_FRONTEND_BASE_URL = "http://localhost:3000";
export const DEFAULT_FRONTEND_TEST_URL = "http://localhost:4004";
export const DEFAULT_SITE_URL = "https://sunub.site";

export const SITE_PATHS = {
	archive: "/archive/all",
	archiveCategory: (category: string) => `/archive/${category}`,
} as const;

export const ROUTE_QUERY_PARAMS = {
	archiveCategory: "category",
} as const;

export const BACKEND_URL_ENV_KEYS = {
	PLAYWRIGHT_BACKEND_URL: "PLAYWRIGHT_BACKEND_URL",
	NEXT_PUBLIC_BACKEND_URL: "NEXT_PUBLIC_BACKEND_URL",
	BACKEND_API_URL: "BACKEND_API_URL",
	TEST_BACKEND_URL: "TEST_BACKEND_URL",
	EC2_PUBLIC_API_URL: "EC2_PUBLIC_API_URL",
} as const;

export const FRONTEND_URL_ENV_KEYS = {
	FRONTEND_E2E_BASE_URL: "FRONTEND_E2E_BASE_URL",
	NEXT_PUBLIC_BASE_URL: "NEXT_PUBLIC_BASE_URL",
	PLAYWRIGHT_FRONTEND_URL: "PLAYWRIGHT_FRONTEND_URL",
} as const;

export const SITE_URL_ENV_KEYS = {
	SITE_URL: "SITE_URL",
	NEXT_PUBLIC_SITE_URL: "NEXT_PUBLIC_SITE_URL",
} as const;

export type BackendEnv = typeof BACKEND_URL_ENV_KEYS;
export type BackendUrlEnvName = BackendEnv[keyof BackendEnv];
export type FrontendEnv = typeof FRONTEND_URL_ENV_KEYS;
export type FrontendUrlEnvName = FrontendEnv[keyof FrontendEnv];
export type SiteEnv = typeof SITE_URL_ENV_KEYS;
export type SiteUrlEnvName = SiteEnv[keyof SiteEnv];
export type BackendRuntime = "browser" | "server" | "test";

export type BackendUrlEnv = Readonly<Record<string, string | undefined>>;
export type FrontendUrlEnv = Readonly<Record<string, string | undefined>>;
export type SiteUrlEnv = Readonly<Record<string, string | undefined>>;

export type BackendUrlResolveInput = {
	env: BackendUrlEnv;
	fallback?: string;
};

export type FrontendUrlResolveInput = {
	env: FrontendUrlEnv;
	fallback?: string;
};

export type SiteUrlResolveInput = {
	env: SiteUrlEnv;
	fallback?: string;
};

export const API_PATHS = {
	posts: {
		all: () => "/posts/all",
		archiveSummary: () => "/posts/archive/summary",
		archiveRange: (category: string, start: number, end: number) =>
			`/posts/archive/range?category=${encodeURIComponent(category)}&start=${start}&end=${end}`,
		byCategory: (category: string) => `/posts/${category}`,
		bySlug: (category: string, slug: string) => `/posts/${category}/${slug}`,
		latest: () => "/posts/latest",
		latestRange: (start: number, end: number) =>
			`/posts/latest/range?start=${start}&end=${end}`,
	},
	search: (query: string) => `/api/search?query=${encodeURIComponent(query)}`,
};

const getEnvValue = (
	env: BackendUrlEnv | FrontendUrlEnv | SiteUrlEnv,
	key: BackendUrlEnvName | FrontendUrlEnvName | SiteUrlEnvName,
): string | undefined => {
	const value = env[key];
	if (value === undefined) {
		return undefined;
	}

	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

function normalizeBaseUrl(url: string): string {
	return url.replace(/\/+$/, "");
}

function joinBaseUrl(baseUrl: string, pathname: string): string {
	const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
	if (!pathname) {
		return normalizedBaseUrl;
	}

	if (/^https?:\/\//.test(pathname)) {
		return pathname;
	}

	const normalizedPathname = pathname.startsWith("/")
		? pathname
		: `/${pathname}`;
	return `${normalizedBaseUrl}${normalizedPathname}`;
}

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

export function resolveBackendApiBaseUrl(
	runtime: BackendRuntime,
	{ env, fallback = DEFAULT_BACKEND_API_URL }: BackendUrlResolveInput,
): string {
	if (runtime === "browser") {
		return resolveBrowserBackendUrl({ env, fallback });
	}

	if (runtime === "test") {
		return resolveTestBackendUrl({ env, fallback });
	}

	return resolveServerBackendUrl({ env, fallback });
}

export function resolveBackendUrls(env: BackendUrlEnv, fallback?: string) {
	return {
		playwright: resolvePlaywrightBackendUrl({ env, fallback }),
		browser: resolveBrowserBackendUrl({ env, fallback }),
		server: resolveServerBackendUrl({ env, fallback }),
		test: resolveTestBackendUrl({ env, fallback }),
	};
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
		resolveFrontendBaseUrl({
			env,
			fallback,
		}) ??
		fallback
	);
}

export function resolveFrontendUrls(env: FrontendUrlEnv, fallback?: string) {
	const defaultBaseUrl = fallback ?? DEFAULT_FRONTEND_BASE_URL;
	const defaultTestUrl = DEFAULT_FRONTEND_TEST_URL;
	const baseUrl = resolveFrontendBaseUrl({ env, fallback: defaultBaseUrl });

	return {
		base: baseUrl,
		e2e: resolvePlaywrightFrontendUrl({
			env,
			fallback: defaultTestUrl,
		}),
	};
}

export function resolveSiteUrl({
	env,
	fallback = DEFAULT_SITE_URL,
}: SiteUrlResolveInput): string {
	return normalizeBaseUrl(
		getEnvValue(env, SITE_URL_ENV_KEYS.SITE_URL) ??
			getEnvValue(env, SITE_URL_ENV_KEYS.NEXT_PUBLIC_SITE_URL) ??
			getEnvValue(env, FRONTEND_URL_ENV_KEYS.NEXT_PUBLIC_BASE_URL) ??
			fallback,
	);
}

export function resolveSitePathUrl(
	pathname: string,
	{ env, fallback = DEFAULT_SITE_URL }: SiteUrlResolveInput,
): string {
	return joinBaseUrl(resolveSiteUrl({ env, fallback }), pathname);
}
