# Archive Category Route Context

## 1. Role and Purpose
- Renders the post archive list for a specific category (or "all") in the blog.
- Handles static data fetching on the server (`getStaticArchiveSummary`, `getStaticArchivePostsInRange`) for initial render optimization.
- Generates static parameters for category routes (`generateStaticParams`) utilizing `getAllPosts`.
- Composes UI from `@/components/Main/PostArchive` (e.g., `PostArchiveFilterPanel`, `PostArchiveListSection`).

## 2. Core Sub-domains
- None

## 3. Shared Assets & Helpers
### Types & Interfaces (types/)
- `type Params = { category: Categories | "all" }`: Defines the dynamic route parameters representing the currently selected category.

## 4. Directory Structure (Max Depth 3)
```text
.
└── page.tsx
```
