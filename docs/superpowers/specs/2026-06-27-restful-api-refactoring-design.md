# RESTful API Server Refactoring Design (Level 2 Pragmatic REST)

## 1. Overview
현재 `backend`의 API 구조가 갖고 있는 RPC(Remote Procedure Call) 스타일 및 라우팅 일관성 부족 문제를 해결합니다. 본 설계는 면접에서 "RESTful API 서버를 완벽히 구현했다"라고 논리적으로 방어할 수 있도록(리처드슨 성숙도 모델 Level 2), 기존의 API를 명사 중심의 자원(Resource)과 쿼리 파라미터(Query Parameters) 기반으로 재설계하는 것을 목표로 합니다.

## 2. Global API Consistency
- **변경 사항**: 각 컨트롤러의 베이스 경로에 `/api` Prefix를 통일하여 적용합니다. 
  - `posts.controller.ts` -> `@Controller('api/posts')`, `@Controller('api/categories')`, `@Controller('api/archives')`
  - `search.controller.ts` -> `@Controller('api/search')` (현재 유지)
- **기대 효과**: 프론트엔드/백엔드 간의 통신에서 경로 일관성을 확보하고 시스템 구조를 명확히 합니다.

## 3. Resource & URI Design

시스템을 `posts`, `categories`, `archives` 세 가지 독립적인 리소스로 분리하여 책임을 명확히 합니다.

### 3.1 포스트 컬렉션 (Posts)
포스트의 일반적인 전체 조회 및 필터링(정렬, 페이징)을 담당합니다.
- `GET /api/posts` 
  - 역할: 모든 포스트 전체 조회 
  - 대체: 기존 `GET /posts/all`
- `GET /api/posts?sort=latest&limit=10` 
  - 역할: 최신 포스트 N개 조회 
  - 대체: 기존 `GET /posts/latest`
- `GET /api/posts?sort=latest&offset=0&limit=10` 
  - 역할: 최신 포스트 범위 페이징 조회 
  - 대체: 기존 `GET /posts/latest/range`

### 3.2 카테고리 네임스페이스 (Categories)
슬러그(slug) 중복 방지를 위한 네임스페이스이자 서브 컬렉션 역할을 수행합니다. 면접 방어의 핵심 포인트(복합 키 활용)가 적용되는 부분입니다.
- `GET /api/categories/:category/posts` 
  - 역할: 특정 카테고리에 속한 포스트 목록 조회 
  - 대체: 기존 `GET /posts/:category`
- `GET /api/categories/:category/posts/:slug` 
  - 역할: 특정 카테고리의 특정 단일 포스트 조회 
  - 대체: 기존 `GET /posts/:category/:slug`

### 3.3 아카이브 컬렉션 (Archives)
목록 조회가 아닌 통계/요약 성격의 데이터를 별도의 자원으로 독립시킵니다.
- `GET /api/archives/summary` 
  - 역할: 전체 아카이브 통계 및 요약 데이터 조회 
  - 대체: 기존 `GET /posts/archive/summary`
- `GET /api/archives/posts?category={category}&offset=0&limit=10` 
  - 역할: 특정 카테고리 기준의 아카이브 범위 데이터 조회 
  - 대체: 기존 `GET /posts/archive/range`

## 4. HTTP Status Codes & Principles
- 읽기 전용 작업은 반드시 `GET`을 사용하고, 파라미터는 쿼리스트링(`?`)으로 처리하여 캐싱 효율성을 극대화합니다.
- 리소스를 찾을 수 없을 때는 반드시 `404 Not Found` 예외를 반환하여 상태 코드 표준을 준수합니다.

## 5. Implementation Scope
- `backend/src/posts/posts.controller.ts` 내의 모든 라우팅 규칙 재작성
- `posts.controller.ts`를 관심사에 맞게 `categories.controller.ts`, `archives.controller.ts`로 분리할지 여부는 구현 단계에서 코드량에 따라 결정
- API 구조 변경에 따른 DTO 파일 검토 및 리팩토링 (`offset`, `limit` 등 표준 파라미터 반영 여부)
