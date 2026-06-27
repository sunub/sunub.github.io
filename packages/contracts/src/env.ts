// packages/contracts/src/env.ts
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
