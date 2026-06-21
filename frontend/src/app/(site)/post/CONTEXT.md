# Post Route Context

## 1. Role and Purpose
- Serves as the top-level route grouping for all blog post-related views.
- Organizes blog contents first by category (`/post/[category]`), and then by individual post slug (`/post/[category]/[slug]`).
- Does not have a root page; it acts purely as a routing wrapper.

## 2. Core Sub-domains
- `[category]`: Handles the dynamic route for displaying a list of posts filtered by a specific category (e.g., code, web, cs, algorithm, ai). It features a category title, wave animation, and a suspense-wrapped grid of `PostCards`.
- `[category]/[slug]`: Handles the dynamic route for rendering individual blog posts at `/post/[category]/[slug]`. Fetches Markdown (MDX) content, renders with entry animations, and pre-generates static routes at build time. (See [`[category]/[slug]/CONTEXT.md`](file:///Users/sunub/workspace/sunub-blog/frontend/src/app/%28site%29/post/%5Bcategory%5D/%5Bslug%5D/CONTEXT.md)).

## 3. Shared Assets & Helpers
### Server Actions (api/)
Located inside `[category]/api/`:
- `getPostsMetadataByCategory(category: PostCategory) => Promise<PostInfo[]>`: Fetches metadata for all posts belonging to the specified category.

## 4. Directory Structure (Max Depth 3)
```text
post
└── [category]
    ├── api
    │   └── getPostsMetadataByCategory.ts
    ├── page.style.ts
    ├── page.tsx
    └── [slug]
        ├── ClientAritcle.tsx
        ├── api
        ├── loading.tsx
        ├── page.style.ts
        └── page.tsx
```
