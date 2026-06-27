# Zod Validation Pipe Migration Design Spec

## Overview
Migrate the Nest.js backend validation pipeline completely from `class-validator` to a Zod Schema-based approach at the Controller Edge. This addresses the current mixed validation strategy and enables a strictly true claim of having a Zod validation pipe architecture.

## Architecture & Data Flow
- **Domain Schemas**: We will reuse existing domain schemas (like `ArchiveCategoryFilterSchema`) from `@sunub/types` to maintain single-source-of-truth.
- **DTO Definitions**: Query DTOs will be redefined as Zod schemas inside `backend/src/posts/dto/get-posts.dto.ts` instead of using class-based decorators.
- **Controller Edge Interception**: Network requests will be intercepted at the Controller method parameter level (`@Query`) by injecting the `ZodValidationPipe` loaded with the specific DTO schema.
- **Type Coercion**: We will utilize `z.coerce` to safely parse incoming string query parameters into appropriate types (e.g., numbers for `limit` and `offset`).

## Component Details

### 1. `backend/src/posts/dto/get-posts.dto.ts`
- Remove all imports from `class-validator` and `class-transformer`.
- Import `z` from `zod` and `ArchiveCategoryFilterSchema` from `@sunub/types`.
- Define `GetPostsQuerySchema`:
  - `sort`: literal "latest", optional
  - `offset`: coerced number, int, min 0, optional
  - `limit`: coerced number, int, min 1, max 50, optional
  - `q`: string, optional
- Define `GetArchivePostsQuerySchema`:
  - `category`: `ArchiveCategoryFilterSchema`, default "all"
  - `offset`: coerced number, int, min 0, default 0
  - `limit`: coerced number, int, min 1, default 10
- Export inferred types `GetPostsQueryDto` and `GetArchivePostsQueryDto`.

### 2. `backend/src/posts/posts.controller.ts`
- Replace `@Query(new ValidationPipe({ transform: true }))` with `@Query(new ZodValidationPipe(GetPostsQuerySchema))`.
- Update imports accordingly.

### 3. `backend/src/posts/archives.controller.ts`
- Replace `@Query(new ValidationPipe({ transform: true }))` with `@Query(new ZodValidationPipe(GetArchivePostsQuerySchema))`.
- Update imports accordingly.

### 4. `backend/src/main.ts`
- Remove the global `app.useGlobalPipes(new ValidationPipe(...))` configuration since validation is now explicitly handled at the controller edge.
- Remove `ValidationPipe` import.

## Cleanup
- Run `npm uninstall class-validator class-transformer` in the `backend` directory to remove legacy dependencies.

## Testing Strategy
- Ensure backend builds successfully after modifications (`npm run build`).
- Verify API endpoints still correctly validate query parameters (e.g., throwing 400 Bad Request if `limit` is invalid).
