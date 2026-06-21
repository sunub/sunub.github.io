# UI Components Context

## 1. Role and Purpose
- Contains shared, reusable UI components for the frontend application.
- Provides base components (e.g., `Button`), complex visual states (e.g., `InfiniteScrollStatus`), and domain-specific UI mappers like `customMdxRemote` for MDX article rendering.

## 2. Core Sub-domains
- None (This directory primarily acts as an Auxiliary Domain housing shared components).

## 3. Shared Assets & Helpers
### Components
- `Button` (`button.tsx`): Reusable styled-button component with variants (`default`, `destructive`) and sizes (`sm`, `lg`, `wide`, `pill`, `icon`). Uses `styled-components` and supports `asChild` delegation via Radix UI Slot.
- `customMdxRemote` (`customMdxRemote.tsx`): Normalizes raw markdown text (handling inline HTML, tables, and Obsidian embeds) and renders it using `next-mdx-remote/rsc` mapping to `PostArticleComponents`.
- `InfiniteScrollStatus` (`InfiniteScrollStatus/`): A UI indicator for loading and error states during infinite scrolling, featuring pulse animations and retry capabilities.
- `PostArticleComponents` (`PostArticleComponents/`): A comprehensive mapping of standard HTML tags (e.g., `a`, `blockquote`, `code`, `img`, `table`, `ul`, `ol`) to custom styled React components used exclusively inside the MDX renderer.

## 4. Directory Structure (Max Depth 3)
```text
.
├── InfiniteScrollStatus
│   ├── InfiniteScrollStatus.tsx
│   ├── index.ts
│   └── style.ts
├── PostArticleComponents
│   ├── index.ts
│   └── ui
│       ├── BlockQuote.tsx
│       ├── CodeBlock/
│       ├── CustomLink.tsx
│       ├── HorizontalRule.tsx
│       ├── ListItem.tsx
│       ├── OrderedList.tsx
│       ├── PostArticleComponents.style.ts
│       ├── PostArticleComponents.tsx
│       ├── PostImage/
│       ├── Table.tsx
│       ├── UnOrderedList.tsx
│       ├── Video.tsx
│       └── sharedTheme.ts
├── button.tsx
└── customMdxRemote.tsx
```
