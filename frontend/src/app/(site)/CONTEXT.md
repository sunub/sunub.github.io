# Site Route Group Context

## 1. Role and Purpose
- Serves as the primary route group (`(site)`) for the blog's frontend.
- Provides the global layout (`layout.tsx`) that wraps all pages with `ThemeProvider` and `SiteShell`.
- The root page (`page.tsx`) renders the blog's home page, which includes the hero section (`HomeHeroSection`) and recent featured posts (`FreshChroniclesSection`).

## 2. Core Sub-domains
- [[archive](file:///Users/sunub/workspace/sunub-blog/frontend/src/app/(site)/archive/CONTEXT.md)]: Root layout for the `/archive` route. Manages shared state (Jotai) across archive views, handles scroll restoration, and renders the post list for categories.
- [[post](file:///Users/sunub/workspace/sunub-blog/frontend/src/app/(site)/post/CONTEXT.md)]: Top-level route grouping for blog posts. Organizes content first by category (`/post/[category]`) and then by individual post slug (`/post/[category]/[slug]`).

## 3. Shared Assets & Helpers
### Components
- `HomeHeroSection`: Composes `HeroImagePreload` and `HeroImageSection` to render the hero visual on the home page.

## 4. Directory Structure (Max Depth 3)
```text
(site)
├── HomeHeroSection.tsx
├── archive
│   ├── [category]
│   ├── layout.style.ts
│   └── layout.tsx
├── layout.tsx
├── page.style.ts
├── page.tsx
└── post
    └── [category]
        ├── [slug]
        ├── api
        ├── loading.tsx
        ├── page.style.ts
        └── page.tsx
```
