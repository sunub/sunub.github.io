# Archive 개선 및 배포 디버깅 세션 정리

작성일: 현재 작업 기준
범위: 아카이브 UX 개선, 데이터 로딩 전략 전환, 테스트 정비, 배포 이슈 분석

## 1) 세션 목표

이번 세션의 핵심 목표는 기존 메인 페이지 중심의 무한 스크롤/가상 스크롤 구조를 아카이브 페이지 중심의 탐색 경험으로 재정리하는 것이었다.

출발점은 다음과 같았다.

1. 블로그 메인 페이지는 끝없는 탐색보다 최근 글을 빠르게 파악하고 선택하는 큐레이션 화면으로 바꾸고 싶었다.
2. 전체 글/카테고리 탐색은 `/archive` 페이지로 옮기고, 이 화면에서만 점진적 로딩이 동작하게 만들고 싶었다.
3. 뒤로가기/앞으로가기, 카테고리 전환, 빠른 스크롤, 배포 환경까지 포함해 실제 운영 가능한 수준으로 정리하고 싶었다.

## 2) 초기 설계 판단 정리

세션 초반에는 “가상 스크롤 기반 무한 스크롤에서 가장 좋은 UX는 무엇인가”를 제품 관점에서 다시 정리했다.

핵심 결론은 아래와 같았다.

1. 가장 좋은 UX는 목록을 unmount하지 않는 구조다.
2. 그게 어렵다면 “완벽한 스크롤 픽셀 복원”보다 “재진입 시 바로 다시 탐색 가능한 상태 복원”이 더 현실적이다.
3. 현재 코드 구조에서는 `TanStack Query` 도입 자체보다, 아카이브 UI 상태를 분리하고 유지하는 것이 더 직접적인 해결책이다.

이 판단을 바탕으로 아카이브 페이지에서는 다음 상태를 복원 대상으로 잡았다.

1. `selectedCategory`
2. `visibleCount`
3. `anchorPostKey` / `anchorIndex`

## 3) UI State 복원 구조 도입

처음에는 `PostArchiveSection` 내부 로컬 상태를 기준으로 복원 흐름을 설계했다. 이 단계에서 정리한 방향은 다음과 같다.

1. 카테고리는 URL query로 관리
2. `visibleCount`와 anchor 정보는 `sessionStorage`/`history.state`로 보조 저장
3. 구조 복원 후 스크롤 위치를 보정하는 2단계 복원

구현 과정에서는 상태 저장, 복원, 스크롤 보정을 컴포넌트 내부에 몰아넣지 않고 훅과 유틸로 분리해 책임을 나누는 방향으로 정리했다.

대표 변경 파일:

1. `frontend/src/components/Main/PostArchive/ui/PostArchiveSection.tsx`
2. `frontend/src/components/Main/PostArchive/hooks/useArchiveViewState.ts`
3. `frontend/src/components/Main/PostArchive/hooks/useArchiveScrollRestore.ts`
4. `frontend/src/components/Main/PostArchive/utils/archiveViewState.ts`

## 4) 전체 선로딩에서 range 기반 점진 로딩으로 전환

기존 아카이브는 서버에서 전체 frontmatter를 한 번에 받고, 클라이언트에서는 `visibleCount`로 “보여주는 양만” 제한하는 구조에 가까웠다. 이는 가상 스크롤은 사용하지만 JSONL 기반 점진 로딩의 장점을 충분히 살리지 못하는 구조였다.

이 문제를 정리한 뒤, 아카이브는 다음 구조로 바꿨다.

1. 서버 페이지는 `summary`와 초기 range만 받는다.
2. 클라이언트는 category별 range를 필요할 때만 추가로 요청한다.
3. 전체 데이터 선로딩 대신 `initial slice + load more` 구조로 동작한다.

대표 변경 파일:

1. `frontend/src/app/(site)/archive/page.tsx`
2. `frontend/src/components/Main/PostArchive/api/archive.ts`
3. `frontend/src/components/Main/PostArchive/hooks/useArchiveFeed.ts`
4. `backend/src/posts/posts.controller.ts`
5. `backend/src/posts/posts.service.ts`
6. `backend/src/instances/blog/blog.service.ts`

## 5) 스크롤 기반 load more 보정

range 기반 로딩으로 바꾼 뒤에는 과도한 초기 요청과 짧은 스크롤에도 연속으로 여러 range를 당겨오는 문제가 있었다. 이 문제는 `NewestPostList` 쪽 windowed range 기반 load more와 비교하면서 단계적으로 수정했다.

### 5.1 초기 과다 요청 문제

다음 문제가 관찰되었다.

1. 초기 렌더 직후 자동 preload가 너무 빨리 열림
2. 카테고리 전환 시 현재 스크롤 위치를 새 카테고리에 그대로 적용해 추가 요청이 연속 발생
3. 뒤로가기 복원 시 `visibleCount`를 너무 크게 되살려 첫 요청이 과하게 커짐

이를 해결하기 위해 다음을 반영했다.

1. 사용자 스크롤과 programmatic scroll을 구분
2. 복원 시 필요한 범위만 batch로 늘리기
3. in-flight 중복 요청 방지
4. 짧은 리스트와 windowing 활성 리스트의 load more 판단을 분리

### 5.2 빠른 스크롤 대응

이후에는 `NewestPostList`처럼 빠르게 아래로 내려가도 viewport를 따라잡을 수 있도록 `useWindowedRangeLoadMore` 기반으로 다시 맞췄다.

핵심은 다음과 같다.

1. “스크롤 한 번당 한 배치”가 아니라 남은 거리(`remainingPx`) 기준으로 재평가
2. 짧은 리스트는 실제 DOM 거리 기준 보정
3. windowing이 켜진 뒤에는 기존 `NewestPostList`와 같은 range 기반 판단 유지

대표 변경 파일:

1. `frontend/src/components/Main/PostArchive/ui/PostArchiveSection.tsx`
2. `frontend/src/components/Main/PostArchive/hooks/useArchiveAutoLoadGate.ts`
3. `frontend/src/components/Main/NewestPostList/hooks/useWindowedRangeLoadMore.ts`
4. `frontend/src/components/Main/PostArchive/utils/index.ts`

## 6) 카테고리별 상태 분리와 Jotai 캐시 계층 도입

아카이브 개선 과정에서 중요한 버그가 하나 확인되었다.

1. 특정 카테고리에서 많은 포스트를 로드한 뒤 다른 카테고리로 이동
2. 다시 돌아오면 일부 데이터는 캐시에 있어도 `visibleCount`가 초기화되어 전체를 다시 볼 수 없음
3. 이미 `hasMore`가 false인 상태라 추가 로드도 다시 일어나지 않음

이 문제는 단순 데이터 캐시가 아니라 “카테고리별 view state”가 필요하다는 점을 드러냈다. 이에 따라 Jotai 기반 캐시 계층을 도입해 아래를 category별로 분리했다.

1. feed cache
2. `visibleCount`
3. `anchorPostKey`
4. `anchorIndex`

대표 변경 파일:

1. `frontend/src/components/Main/PostArchive/store/archive.atom.ts`
2. `frontend/src/components/Main/PostArchive/hooks/useArchiveFeed.ts`
3. `frontend/src/components/Main/PostArchive/hooks/useArchiveViewState.ts`

## 7) 테스트 코드 정비

구조가 바뀌면서 기존 테스트는 홈 화면 중심의 오래된 흐름을 전제로 하고 있었다. 이번 세션에서는 아카이브 기준으로 테스트를 다시 정리했다.

주요 변경:

1. E2E 테스트를 아카이브 헤더 진입 및 뒤로가기 복원 흐름 기준으로 수정
2. 오래된 무한 스크롤 unit test를 `scroll-action.test.tsx`로 교체
3. category cache 유지, remount 후 no-refetch, 빠른 스크롤 대응 시나리오까지 검증 확장

대표 파일:

1. `frontend/test/e2e/App.test.tsx`
2. `frontend/test/unit/scroll-action.test.tsx`
3. `frontend/test/unit/PostArchive.test.ts`
4. `frontend/test/unit/api-config.test.ts`

## 8) 린트/포맷/테스트 정리

세션 후반에는 변경된 아카이브 관련 코드와 테스트에 대해 아래 작업을 수행했다.

1. `pnpm run lint`
2. `pnpm exec biome ci`
3. frontend unit test
4. backend unit test
5. frontend E2E test

이 과정에서 `useLayoutEffect` dependency, import 정렬, 포맷 차이, `server-only` mock 문제 등을 정리했다.

추가로 backend 시작 전에 포트 점유를 정리하는 `ensure-port-free.sh` 스크립트도 도입해 개발/운영 편의성을 보완했다.

## 9) `posts.jsonl` 구조와 메모리/로딩 전략 검토

세션 중에는 `frontend/src/server/posts.ts`의 메모리 사용 방식도 함께 점검했다.

검토 결과는 다음과 같이 정리되었다.

1. 현재 규모에서는 전체 인덱스를 메모리에 올리는 방식이 크게 문제되지는 않음
2. 다만 JSONL의 장점은 “라인 기반 점진 처리”인데, 전체 선로딩 구조에서는 그 장점을 충분히 살리지 못함
3. 장기적으로는 아카이브처럼 탐색 의도가 분명한 페이지에 range 기반 API를 붙이는 방향이 더 일관됨

이 논의는 실제로 아카이브를 전체 선로딩에서 range 기반 점진 로딩 구조로 바꾸는 근거가 되었다.

## 10) 배포 환경 디버깅

세션 마지막에는 운영 환경에서 아카이브 추가 로딩이 실패하는 문제를 분석했다.

관찰된 현상:

1. 초기 아카이브 화면은 정상 렌더
2. 스크롤 후 `/posts/archive/range?category=all&start=9&end=15` 요청에서 500 발생
3. 콘솔에는 `Failed to fetch archive posts`와 SVG path 관련 오류가 함께 나타남

분석 결과는 다음과 같았다.

1. `start=9&end=15` 자체는 프런트 로직상 정상적인 첫 추가 요청
2. backend 직접 호출은 `127.0.0.1:4000`에서 200 응답
3. PM2 frontend log에는 `Failed to proxy http://localhost:4008/... ECONNREFUSED`가 기록됨
4. 따라서 실제 원인은 아카이브 로직이 아니라, frontend rewrite가 stale한 `4008` 포트를 바라보고 있던 배포 설정 문제

이 문제를 통해 아래를 추가로 정리했다.

1. frontend의 same-origin `/posts/*` 요청은 Next rewrite에 전적으로 의존
2. backend는 4000에서 정상인데, frontend build 산출물이 예전 4008 rewrite target을 들고 있을 수 있음
3. `NEXT_PUBLIC_API_URL`은 현재 코드 경로에서 의미가 거의 없고, `BACKEND_API_URL`과 `EC2_PUBLIC_API_URL`, `NEXT_PUBLIC_BACKEND_URL`이 실제로 중요함

## 11) 이번 세션에서 얻은 정리

이번 작업은 단순히 아카이브에 무한 스크롤을 붙이는 작업이 아니었다. 실제로는 아래를 함께 정리한 세션에 가까웠다.

1. 블로그 메인과 아카이브의 역할 분리
2. 가상 스크롤 환경에서의 현실적인 복원 전략 선택
3. 전체 선로딩에서 range 기반 점진 로딩으로의 전환
4. 카테고리별 상태와 캐시의 분리
5. 빠른 스크롤에도 대응 가능한 load more 재설계
6. 테스트와 배포 환경까지 포함한 품질 검증

결과적으로 이번 세션은 “기능을 추가했다”보다, 아카이브 탐색 경험을 제품 목적에 맞게 다시 설계하고, 그에 맞는 데이터 로딩/상태 관리/운영 경로를 재정비한 과정으로 정리할 수 있다.

## 12) 후속 체크 포인트

다음 단계에서 추가로 확인하면 좋은 항목은 아래와 같다.

1. production build가 실제로 어떤 rewrite target을 사용 중인지 재확인
2. frontend build 시점과 runtime 시점 env를 분리해 기록
3. archive fetch 실패 시 response body를 더 자세히 남기는 로깅 추가
4. SVG `path d="undefined"` 오류는 배포 번들 기준으로 별도 분리 디버깅
