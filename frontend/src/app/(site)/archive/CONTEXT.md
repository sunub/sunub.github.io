# Archive Route Context

## 1. Role and Purpose
- Serves as the root layout for the `/archive` route of the blog.
- Provides a global `Jotai` state provider to manage shared state across archive views.
- Constructs the core archive layout shell, including scroll restoration management (`ScrollRestorationController`), visual decoration (`Wave`), and the overarching header structure (`PostArchiveHeader`).

## 2. Core Sub-domains
- [[category]](./[category]/CONTEXT.md): Handles rendering the post archive list for a specific category (or "all"). It handles static generation and initial server data fetching.

## 3. Shared Assets & Helpers
- None

## 4. Directory Structure (Max Depth 3)
```text
.
├── CONTEXT.md
├── [category]
│   ├── CONTEXT.md
│   └── page.tsx
├── layout.tsx
└── page.style.ts
```
