# Blog Post Route Context

## 1. Role and Purpose
- Handles the dynamic route for rendering individual blog posts at `/post/[category]/[slug]`.
- Fetches Markdown (MDX) content based on category and slug using server actions.
- Renders the post with entry animations (`motion/react`), SEO metadata (JSON-LD), and custom MDX components.
- Pre-generates static routes for all available posts at build time.

## 2. Core Sub-domains
*(None - This directory serves as a leaf-level domain route)*

## 3. Shared Assets & Helpers
### Components
- `ClientArticle` (`ClientAritcle.tsx`): A client component wrapper that applies Framer Motion stagger animations when a user navigates to the post.
- `Loading` (`loading.tsx`): A full-screen fallback UI with cloud and bird animations displayed while post content is fetching.

### Server Actions (api/)
- `getAllPosts() => Promise<PostInfo[]>`: Fetches all posts to generate static paths at build time.
- `getPostContentByCategoryAndSlug(category: PostCategory, slug: string) => Promise<SpecificPostInfo | null>`: Fetches the specific frontmatter and content for the requested post.

## 4. Directory Structure (Max Depth 3)
```text
[slug]
├── ClientAritcle.tsx
├── api
│   ├── getAllPosts.ts
│   └── getPostContentByCategoryAndSlug.ts
├── loading.tsx
├── page.style.ts
└── page.tsx
```
