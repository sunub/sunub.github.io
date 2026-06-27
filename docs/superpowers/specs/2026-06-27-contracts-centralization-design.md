# Contracts Centralization & Modularity Design

## 1. 개요 (Overview)
현재 `packages/contracts/main.ts`에 집중된 역할을 여러 도메인으로 분리(모듈화)하고, 프론트엔드 라우팅 및 카테고리 메타데이터의 주도권을 Contracts 패키지로 완전히 위임(중앙화)합니다. 이후 진행될 Next.js App Router 디렉토리 구조 개편(Option C)을 100% 안전하게 수행하기 위한 사전(Phase 1) 작업입니다.

## 2. 패키지 모듈화 (Packages Contracts)
기존 `main.ts` (단일 파일) 구조를 폐기하고, 배럴(Barrel) 패턴을 적용하여 다음과 같이 파일을 분할합니다.

- `src/categories.ts`: 
  - 블로그 전역 카테고리 배열(`CATEGORY_LIST`) 정의.
  - 카테고리별 UI 라벨(예: "Web knowledge", "Algorithm") 매핑 메타데이터 제공.
- `src/site.ts`: 
  - 프론트엔드 URL 및 사이트 URL 리졸버 로직.
  - `SITE_PATHS` 객체에 `postCategory(category)`, `postDetail(category, slug)` 라우팅 생성 함수 추가.
- `src/api.ts`: 
  - 백엔드 URL 리졸버 로직 및 `API_PATHS` 객체.
- `src/env.ts`: 
  - 환경 변수 키(`ENV_KEYS`) 및 관련 타입 정의.
- `src/index.ts`: 
  - 위 4개의 모듈을 모두 `export * from ...`으로 묶어주는 배럴 파일.

## 3. 프론트엔드 연동 (Frontend Integration)
- **UI 자동화**: `Header/Navigation.tsx` 및 `MobileNav.tsx`에서 하드코딩된 링크 대신, `contracts`의 `CATEGORY_LIST`를 순회(map)하여 렌더링하도록 수정합니다.
- **라우팅 중앙화**: 프론트엔드 전역(`sitemap.ts`, `constants`, 컴포넌트, E2E 테스트 등)에 흩어진 `/post/...` 하드코딩 문자열을 찾아내어 모두 `SITE_PATHS.postCategory()`, `SITE_PATHS.postDetail()`로 변경합니다.

## 4. 기대 효과
- **단일 책임 원칙(SRP)** 준수를 통한 `contracts` 패키지의 유지보수성 향상.
- 프론트엔드의 링크 깨짐(Broken Link) 걱정 없이 단 한 번의 Contract 수정으로 안전한 대규모 라우팅 개편 가능.
