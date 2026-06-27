# Contracts Centralization & Modularity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor `packages/contracts` into domain-specific modules using a barrel pattern, and centralize frontend routing logic using these new contracts.

**Architecture:** Split `main.ts` into `env.ts`, `api.ts`, `categories.ts`, and `site.ts`. Export everything via `index.ts`. Then refactor frontend to use `CATEGORY_LIST` for navigation and `SITE_PATHS` for post routes.

**Tech Stack:** TypeScript, Next.js, pnpm workspaces

---

### Task 1: Extract Environment Variables (env.ts)

**Files:**
- Create: `packages/contracts/src/env.ts`

- [ ] **Step 1: Write implementation**

Create the file and copy the env definitions.

```typescript
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
```

- [ ] **Step 2: Verify compilation**

Run: `cd packages/contracts && npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add packages/contracts/src/env.ts
git commit -m "refactor(contracts): extract environment variable definitions to env.ts"
```

---

### Task 2: Extract Categories Domain (categories.ts)

**Files:**
- Create: `packages/contracts/src/categories.ts`

- [ ] **Step 1: Write implementation**

Define the global category list and their display names.

```typescript
// packages/contracts/src/categories.ts
export const CATEGORY_LIST = ["cs", "web", "code", "algorithm", "ai"] as const;

export type Category = (typeof CATEGORY_LIST)[number];

export const CATEGORY_LABELS: Record<Category, string> = {
	cs: "CS",
	web: "Web",
	code: "Code",
	algorithm: "Algorithm",
	ai: "AI",
} as const;
```

- [ ] **Step 2: Verify compilation**

Run: `cd packages/contracts && npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add packages/contracts/src/categories.ts
git commit -m "feat(contracts): add CATEGORY_LIST and labels metadata"
```

---

### Task 3: Extract API Logic (api.ts)

**Files:**
- Create: `packages/contracts/src/api.ts`

- [ ] **Step 1: Write implementation**

Extract backend URL resolution and API_PATHS.

```typescript
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
		byCategory: (category: string) => `/api/categories/${category}/posts`,
		bySlug: (category: string, slug: string) => `/api/categories/${category}/posts/${slug}`,
		latest: () => "/api/posts?sort=latest",
		latestRange: (offset: number, limit: number) =>
			`/api/posts?sort=latest&offset=${offset}&limit=${limit}`,
	},
	search: (query: string) => `/api/posts?q=${encodeURIComponent(query)}`,
};

const getEnvValue = (env: BackendUrlEnv, key: BackendUrlEnvName): string | undefined => {
	const value = env[key];
	if (value === undefined) return undefined;
	const trimmed = value.trim();
	return trimmed.length > 0 ? trimmed : undefined;
};

export function resolveBrowserBackendUrl({ env, fallback = DEFAULT_BACKEND_API_URL }: BackendUrlResolveInput): string {
	return getEnvValue(env, BACKEND_URL_ENV_KEYS.NEXT_PUBLIC_BACKEND_URL) ?? getEnvValue(env, BACKEND_URL_ENV_KEYS.EC2_PUBLIC_API_URL) ?? fallback;
}

export function resolveServerBackendUrl({ env, fallback = DEFAULT_BACKEND_API_URL }: BackendUrlResolveInput): string {
	return getEnvValue(env, BACKEND_URL_ENV_KEYS.BACKEND_API_URL) ?? resolveBrowserBackendUrl({ env, fallback });
}

export function resolveTestBackendUrl({ env, fallback = DEFAULT_BACKEND_API_URL }: BackendUrlResolveInput): string {
	return getEnvValue(env, BACKEND_URL_ENV_KEYS.TEST_BACKEND_URL) ?? resolveBrowserBackendUrl({ env, fallback });
}

export function resolvePlaywrightBackendUrl({ env, fallback = DEFAULT_BACKEND_API_URL }: BackendUrlResolveInput): string {
	return getEnvValue(env, BACKEND_URL_ENV_KEYS.PLAYWRIGHT_BACKEND_URL) ?? resolveServerBackendUrl({ env, fallback });
}

export function resolveBackendApiBaseUrl(runtime: BackendRuntime, input: BackendUrlResolveInput): string {
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

export function resolveRewriteTargetUrl({ env, fallback = DEFAULT_REWRITE_TARGET_URL }: BackendUrlResolveInput): string {
	return getEnvValue(env, BACKEND_URL_ENV_KEYS.BACKEND_API_URL) ?? getEnvValue(env, BACKEND_URL_ENV_KEYS.EC2_PUBLIC_API_URL) ?? getEnvValue(env, BACKEND_URL_ENV_KEYS.NEXT_PUBLIC_BACKEND_URL) ?? fallback;
}
```

- [ ] **Step 2: Verify compilation**

Run: `cd packages/contracts && npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add packages/contracts/src/api.ts
git commit -m "refactor(contracts): extract api routes and resolvers to api.ts"
```

---

### Task 4: Extract Site Logic (site.ts)

**Files:**
- Create: `packages/contracts/src/site.ts`

- [ ] **Step 1: Write implementation**

Extract frontend and site URL resolution, and define expanded `SITE_PATHS`.

```typescript
// packages/contracts/src/site.ts
import {
	FRONTEND_URL_ENV_KEYS,
	SITE_URL_ENV_KEYS,
	type FrontendUrlEnv,
	type FrontendUrlEnvName,
	type FrontendUrlResolveInput,
	type SiteUrlEnv,
	type SiteUrlEnvName,
	type SiteUrlResolveInput,
} from "./env";

export const DEFAULT_FRONTEND_BASE_URL = "http://localhost:3000";
export const DEFAULT_FRONTEND_TEST_URL = "http://localhost:4004";
export const DEFAULT_SITE_URL = "https://sunub.site";

export const SITE_PATHS = {
	archive: "/archive/all",
	archiveCategory: (category: string) => `/archive/${category}`,
	postCategory: (category: string) => `/post/${category}`,
	postDetail: (category: string, slug: string) => `/post/${category}/${slug}`,
} as const;

export const ROUTE_QUERY_PARAMS = {
	archiveCategory: "category",
} as const;

const getEnvValue = (env: FrontendUrlEnv | SiteUrlEnv, key: FrontendUrlEnvName | SiteUrlEnvName): string | undefined => {
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
	const normalizedPathname = pathname.startsWith("/") ? pathname : `/${pathname}`;
	return `${normalizedBaseUrl}${normalizedPathname}`;
}

export function resolveFrontendBaseUrl({ env, fallback = DEFAULT_FRONTEND_BASE_URL }: FrontendUrlResolveInput): string {
	return normalizeBaseUrl(getEnvValue(env, FRONTEND_URL_ENV_KEYS.NEXT_PUBLIC_BASE_URL) ?? fallback);
}

export function resolvePlaywrightFrontendUrl({ env, fallback = DEFAULT_FRONTEND_TEST_URL }: FrontendUrlResolveInput): string {
	return getEnvValue(env, FRONTEND_URL_ENV_KEYS.PLAYWRIGHT_FRONTEND_URL) ?? getEnvValue(env, FRONTEND_URL_ENV_KEYS.FRONTEND_E2E_BASE_URL) ?? resolveFrontendBaseUrl({ env, fallback }) ?? fallback;
}

export function resolveFrontendUrls(env: FrontendUrlEnv, fallback?: string) {
	const defaultBaseUrl = fallback ?? DEFAULT_FRONTEND_BASE_URL;
	const defaultTestUrl = DEFAULT_FRONTEND_TEST_URL;
	return {
		base: resolveFrontendBaseUrl({ env, fallback: defaultBaseUrl }),
		e2e: resolvePlaywrightFrontendUrl({ env, fallback: defaultTestUrl }),
	};
}

export function resolveSiteUrl({ env, fallback = DEFAULT_SITE_URL }: SiteUrlResolveInput): string {
	return normalizeBaseUrl(getEnvValue(env, SITE_URL_ENV_KEYS.SITE_URL) ?? getEnvValue(env, SITE_URL_ENV_KEYS.NEXT_PUBLIC_SITE_URL) ?? getEnvValue(env as any, FRONTEND_URL_ENV_KEYS.NEXT_PUBLIC_BASE_URL as any) ?? fallback);
}

export function resolveSitePathUrl(pathname: string, { env, fallback = DEFAULT_SITE_URL }: SiteUrlResolveInput): string {
	return joinBaseUrl(resolveSiteUrl({ env, fallback }), pathname);
}
```

- [ ] **Step 2: Verify compilation**

Run: `cd packages/contracts && npx tsc --noEmit`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add packages/contracts/src/site.ts
git commit -m "refactor(contracts): extract site routes and resolvers to site.ts"
```

---

### Task 5: Barrel Export and Clean Up

**Files:**
- Create: `packages/contracts/src/index.ts`
- Modify: `packages/contracts/package.json`
- Delete: `packages/contracts/main.ts`

- [ ] **Step 1: Write barrel file**

```typescript
// packages/contracts/src/index.ts
export * from "./env";
export * from "./categories";
export * from "./api";
export * from "./site";
```

- [ ] **Step 2: Update package.json to point to index**

Modify `packages/contracts/package.json` to map `"main"` and `"types"` to the output of `src/index.ts`. 

```json
{
  "name": "@sunub/contracts",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 3: Delete main.ts and verify build**

Run: `rm packages/contracts/main.ts && cd packages/contracts && pnpm build`
Expected: PASS (build completes and dist/index.js is created)

- [ ] **Step 4: Commit**

```bash
git add packages/contracts
git commit -m "refactor(contracts): apply barrel pattern and remove monolithic main.ts"
```

---

### Task 6: Frontend - Update Navigation Components

**Files:**
- Modify: `frontend/src/components/Header/Navigation/Navigation.tsx`
- Modify: `frontend/src/components/MobileNav/MobileNav.tsx`

- [ ] **Step 1: Update Navigation.tsx**

Refactor to map over `CATEGORY_LIST` using `CATEGORY_LABELS` and `SITE_PATHS.postCategory`.

```tsx
// Edit frontend/src/components/Header/Navigation/Navigation.tsx
import { usePathname } from "next/navigation";
import { CATEGORY_LABELS, CATEGORY_LIST, SITE_PATHS } from "@sunub/contracts";
import {
	Indicator,
	NavItem,
	NavList,
	NavigationRoot,
} from "./Navigation.style";

export function Navigation() {
	const pathname = usePathname();

	return (
		<NavigationRoot>
			<NavList>
				{CATEGORY_LIST.map((category) => {
					const href = SITE_PATHS.postCategory(category);
					const isActive = pathname.startsWith(href);
					return (
						<NavItem key={category} href={href}>
							{CATEGORY_LABELS[category]}
							{isActive && <Indicator layoutId="activeNav" />}
						</NavItem>
					);
				})}
			</NavList>
		</NavigationRoot>
	);
}
```

- [ ] **Step 2: Update MobileNav.tsx**

```tsx
// Edit frontend/src/components/MobileNav/MobileNav.tsx
import { usePathname } from "next/navigation";
import { memo } from "react";
import { CATEGORY_LABELS, CATEGORY_LIST, SITE_PATHS } from "@sunub/contracts";
import {
	MobileNavItem,
	MobileNavList,
	MobileNavRoot,
} from "./MobileNav.style";

type MobileNavProps = {
	className?: string;
	onClose: () => void;
};

const MobileNav = memo(({ className, onClose }: MobileNavProps) => {
	const pathname = usePathname();

	return (
		<MobileNavRoot className={className}>
			<MobileNavList>
				{CATEGORY_LIST.map((category) => {
					const href = SITE_PATHS.postCategory(category);
					const isActive = pathname.startsWith(href);
					return (
						<MobileNavItem
							key={category}
							href={href}
							$isActive={isActive}
							onClick={onClose}
						>
							{CATEGORY_LABELS[category]}
						</MobileNavItem>
					);
				})}
			</MobileNavList>
		</MobileNavRoot>
	);
});
MobileNav.displayName = "MobileNav";

export { MobileNav };
```

- [ ] **Step 3: Run linter and typecheck**

Run: `cd frontend && pnpm run lint`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add frontend/src/components/Header/Navigation/Navigation.tsx frontend/src/components/MobileNav/MobileNav.tsx
git commit -m "refactor(frontend): automate navigation items via contracts CATEGORY_LIST"
```

---

### Task 7: Frontend - Update Hardcoded Routes

**Files:**
- Modify: `frontend/src/shared/utils/postRoute.ts`
- Modify: `frontend/src/app/sitemap.ts`
- Modify: `frontend/src/app/(site)/post/[category]/[slug]/page.tsx`
- Modify: `frontend/src/widgets/Search/ui/SearchResultList.tsx`

- [ ] **Step 1: Modify postRoute.ts**

```typescript
// Replace content of frontend/src/shared/utils/postRoute.ts
import { SITE_PATHS } from "@sunub/contracts";

export const getPostRoute = (category: string, slug: string) => {
	return SITE_PATHS.postDetail(category, slug);
};
```

- [ ] **Step 2: Modify sitemap.ts**

Find `/post/${frontmatter.category}/${frontmatter.slug}` and replace with `SITE_PATHS.postDetail(frontmatter.category, frontmatter.slug)`.
Find `/post/${category}` and replace with `SITE_PATHS.postCategory(category)`.
Add `import { SITE_PATHS } from "@sunub/contracts";`.

- [ ] **Step 3: Modify page.tsx (Canonical URLs)**

In `frontend/src/app/(site)/post/[category]/[slug]/page.tsx`:
Replace `/post/${category}/${slug}` with `SITE_PATHS.postDetail(category, slug)` inside `resolveSitePathUrl`.
Ensure `SITE_PATHS` is imported.

- [ ] **Step 4: Modify SearchResultList.tsx**

In `frontend/src/widgets/Search/ui/SearchResultList.tsx`:
Replace ``const url = `/post/${frontmatter.category}/${frontmatter.slug}`;`` with ``const url = SITE_PATHS.postDetail(frontmatter.category, frontmatter.slug);``.
Add `import { SITE_PATHS } from "@sunub/contracts";`.

- [ ] **Step 5: Verify types**

Run: `cd frontend && pnpm exec tsc --noEmit`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add frontend
git commit -m "refactor(frontend): centralize post routing to use SITE_PATHS contract"
```
