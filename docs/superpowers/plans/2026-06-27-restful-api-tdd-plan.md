# RESTful API Server Refactoring - TDD Implementation Plan

## Overview
이 구현 계획은 앞서 수립한 `RESTful API Refactoring Design`을 **TDD(Test-Driven Development) 원칙**에 입각하여 코드로 구현하기 위한 단계별 가이드입니다. 

**핵심 원칙**: "실패하는 테스트 코드를 먼저 작성하지 않고는 프로덕션 코드를 작성하지 않는다." (Red-Green-Refactor)

---

## Step 1: Update Tests & Watch Them Fail (RED)
현재 API 엔드포인트들을 검증하고 있는 테스트 코드들을 새로운 RESTful 설계(Level 2)에 맞게 먼저 수정합니다.

### 1.1 Integration Tests 수정 (`backend/src/main.http.spec.ts`)
- `GET /posts/latest?count=2` ➡️ `GET /api/posts?sort=latest&limit=2`
- `GET /posts/latest/range?start=1&end=3` ➡️ `GET /api/posts?sort=latest&offset=1&limit=2`
- `GET /posts/archive/summary` ➡️ `GET /api/archives/summary`
- `GET /posts/archive/range?category=algorithm&start=0&end=2` ➡️ `GET /api/archives/posts?category=algorithm&offset=0&limit=2`
- `GET /posts/web` ➡️ `GET /api/categories/web/posts`
- `GET /posts/web/hello-backend` ➡️ `GET /api/categories/web/posts/hello-backend`
- 위와 같이 라우팅 및 쿼리 파라미터를 변경한 후 `pnpm test`를 실행하여 명확하게 **테스트가 실패(404 Not Found)**하는 것을 확인합니다.

### 1.2 Unit Tests 구조 개편 (`posts.controller.spec.ts`)
- 기존 `PostsController` 테스트를 분리하여 `categories.controller.spec.ts`, `archives.controller.spec.ts`의 기본 형태(Mock)를 작성합니다.
- 테스트 실패를 확인합니다.

---

## Step 2: Minimal Code Implementation (GREEN)
테스트를 통과하기 위한 최소한의 컨트롤러 코드를 작성합니다.

### 2.1 DTO 업데이트
- `backend/src/posts/dto/get-posts.dto.ts`를 수정하여 `offset`, `limit`, `sort` 파라미터를 받을 수 있도록 변경합니다.

### 2.2 PostsController 수정 (`/api/posts`)
- `PostsController`의 Prefix를 `@Controller('api/posts')`로 변경합니다.
- 변경된 DTO에 맞게 기존 서비스(`BlogService`)를 호출하는 로직을 업데이트합니다.

### 2.3 새로운 Controllers 생성
- `CategoriesController` (`/api/categories`) 생성 및 연동.
- `ArchivesController` (`/api/archives`) 생성 및 연동.
- 새 컨트롤러들을 `AppModule`에 등록합니다.

### 2.4 테스트 통과 확인
- 다시 `pnpm test`를 실행하여 수정된 앤드포인트들이 의도대로 데이터를 반환하여 **모든 테스트가 통과(GREEN)**하는지 확인합니다.

---

## Step 3: Cleanup & Optimization (REFACTOR)
- 테스트가 모두 통과하는 안정적인 상태에서 중복 코드를 제거하고, 모듈(Module) 구조를 정리합니다.
- (예: `categories`, `archives` 관련 비즈니스 로직을 `PostsService`에서 분리할지 여부 검토)
- 최종적으로 린트(`pnpm run lint`)와 포맷팅(`pnpm run format`)을 수행하여 마무리합니다.
