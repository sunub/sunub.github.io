# BlogPost ListView 가상화/무한 스크롤 리팩토링 기록

작성일: 현재 작업 기준
대상: 가상 스크롤 + 무한 로딩 경로

## 1) 작업 의도

이 리팩토링의 목적은 단순히 `loadMore`를 보정하는 데 그치지 않고, 렌더 계산 전반의 좌표 체계를 실제 DOM 높이와 정렬하는 데 있습니다.

목표:

1. 가변 높이 카드에서도 `visibleRange` 오차를 줄인다.
2. 스크롤 중 매 프레임 강제 DOM 측정을 피한다.
3. `loadMore` 트리거를 사용자가 체감하기 전에 선행 호출한다.

## 2) 기존 구조의 핵심 문제

### 2.1 가상 렌더 계산의 좌표 모델이 고정 높이 가정

`useWindowedRange.ts`는 이전에 `itemHeight`(고정값)로 `start/end`를 계산했습니다.

- 리스트 내 텍스트 길이가 다르면 실제 높이가 달라짐.
- 실제 DOM에서 보이는 영역을 계산할 때도 `start = floor(viewportStart / 170)` 같은 수식이 계속 쓰였기 때문에 누적 오차가 누적됨.
- 그 결과:
  - 스크롤 위치 대비 렌더 범위가 엇박자.
  - 하단에 도달 시점이 늦거나 빨리 판단됨.
  - 메모리로는 정상처럼 보여도 체감 UX에서 빈 공간/점프/불필요 호출이 발생.

### 2.2 현재 리스트 영역 기반 preload가 아닌 아이템 카운트 기반 폴백

이전 판단식은 `posts.length - visibleRange.end <= preloadThreshold` 같은 “남은 개수” 조건 위주였습니다.

- 가변 높이 환경에서는 남은 개수보다 **거리(px)**가 사용자 체감에 더 직접적입니다.
- 짧은 카드가 많으면 실제로는 화면이 멀리 남았는데도 곧바로 호출되거나,
- 긴 카드가 연속이면 반대로 호출이 늦어질 수 있습니다.

### 2.3 실제 높이 측정 경로 부재

아이템 높이 반영 경로가 없어 `ResizeObserver` 기반 피드백 루프가 없었습니다.

- 렌더링 전 추정값만 쓰면 초반 계산은 빠르지만,
- 변동이 큰 데이터일수록 range 계산은 점진적으로 틀어집니다.

## 3) 설계 반영 요약

적용 범위 파일:

1. `frontend/src/components/Main/BlogPost/ui/BlogPostListView/useWindowedRange.ts`
2. `frontend/src/components/Main/BlogPost/ui/BlogPostListView/BlogPostListViewRoot.tsx`
3. `frontend/src/components/Main/BlogPost/ui/BlogPostItem.tsx`
4. `frontend/src/components/Main/BlogPost/ui/BlogPostItemRoot.tsx`

### 3.1 `useWindowedRange.ts` 변경

핵심 설계를 바꿨습니다.

- `estimatedHeight` 기반의 기본 추정값을 유지.
- 보이는 아이템을 실제로 렌더링하는 순간 개별 엘리먼트를 `registerItemElement(index, element)`로 등록.
- `ResizeObserver`가 크기 변화를 감지하고 `pending` 큐에 적재.
- `requestAnimationFrame` 1회 배치에서 누적 큐를 커밋.
- 각 업데이트 후 prefix height(누적 높이) 배열 기반으로 픽셀 좌표 → 아이템 인덱스로 변환.

반환값을 확장해 아래를 사용 가능하게 했습니다.

- `visibleRange: { start, end }`
- `topSpacerPx`
- `bottomSpacerPx`
- `totalHeightPx`
- `remainingPx`
- `registerItemElement`

#### 왜 prefix 배열인가

각 아이템 높이를 `h[i]`라 하면, 누적 높이 `prefix[i]`를 만들면

- `viewportStart`/`viewportEnd`를 기준으로 현재 보이는 인덱스 범위를 이진탐색으로 찾을 수 있습니다.
- 스크롤 좌표와 index 범위 간 변환이 일관되게 계산됩니다.
- 현재 구현은 O(n) prefix 생성이므로 충분히 실용적입니다.
  - 아이템 수가 커질 경우에는 `Fenwick Tree`나 세그먼트 트리로 `O(log n)` 전환 계획을 문서화했습니다(향후 확장).

### 3.2 `BlogPostListViewRoot.tsx` 변경

- `useWindowedRange` config를 `estimatedHeight` 키 중심으로 사용.
- `topSpacerPx` / `bottomSpacerPx`를 hook에서 직접 받음.
- `loadMore` 트리거 조건을 픽셀 거리를 기준으로 변경:
  - `remainingPx <= preloadReservePx`
  - 백업으로 `posts.length - visibleRange.end <= 4`
- `BlogPostItem`에 `registerItemElement` 전달해 높이 수집 체인을 연결.

### 3.3 `BlogPostItem` / `BlogPostItemRoot` 변경

- `ref` 전달 의존을 `itemRef` 콜백으로 변경하고,
- 렌더 시 index 기반으로 hook에 등록.
- 훨씬 명시적으로 “이 index의 이 엘리먼트의 높이”를 연결 가능해져 높이 수집 경로가 닫힘.

## 4) 작업 흐름 (실행 시퀀스)

1. `BlogPostListViewRoot` 렌더 시작.
2. `useWindowedRange`가 추정 높이 기반으로 초기 `visibleRange`/스페이서 계산.
3. 실제 렌더된 `BlogPostItem`들이 `registerItemElement(index, el)`를 호출.
4. `ResizeObserver`가 각 아이템 높이를 수집해 `pending` 큐에 적재.
5. `requestAnimationFrame` 타이밍에서 큐를 반영하고 누적 높이(prefix) 재계산.
6. 뷰포트 픽셀 좌표로 `visibleRange`, top/bottom spacer, `remainingPx` 계산.
7. `remainingPx`/백업 조건을 만족하면 `loadMore()`를 실행.

## 5) 이전 코드 대비 개선점과 이유

- 이전: 고정 높이로 전체 range 계산
- 변경: 추정값 + 관찰된 실제 높이 반영 + 픽셀 기준 범위 변환

핵심은 “빠름”을 포기하지 않고도 정확도를 확보하는 점입니다.

- `ResizeObserver`는 브라우저의 레이아웃 결과를 소비합니다. 즉, 스크롤마다 강제 reflow를 직접 발생시키지 않습니다.
- `requestAnimationFrame`로 병합해 상태 업데이트를 묶습니다.
- 정확도와 성능을 동시에 가져가는 현실적인 하이브리드입니다.

## 6) 성능/정확도 관점에서 남은 트레이드오프

- 현재는 매 변화마다 O(n) prefix 재계산을 수행합니다.
  - 현재 아이템량이 크지 않다면 실용적입니다.
  - 더 커지면 `Fenwick Tree` 전환은 고려 대상입니다.
- `remainingPx` 기반 preload는 훨씬 체감 우선순위가 높지만,
  - `window.innerHeight` 기반 임계값은 반응형/회전 시 갱신 주기가 필요할 수 있습니다.
  - 현재는 초기치 기반입니다(필요 시 resize listener 기반으로 재평가).
- `loadMore` 자체의 in-flight 제어는 `useWindowedRange` 바깥(Provider)의 가드에 의존합니다.

## 7) 이 작업에서 필요한 지식

적용한 지식:

- `ResizeObserver`의 callback 라이프사이클
- `requestAnimationFrame` 배치 업데이트 패턴
- 누적합(prefix sum), 이진 탐색
- 가상 리스트에서 좌표계가 깨질 때 생기는 오차 전파(visibleRange drift)
- 무한 로딩 트리거와 UX 체감 지연의 상관관계

## 8) 검증 기준(완료 조건)

1. 긴 요약/짧은 요약이 섞인 리스트를 스크롤할 때 빈 구간이 발생하지 않는다.
2. 하단 접근 시 1프레임~수십 ms 내 `loadMore` 판단이 일어난다.
3. `remainingPx`와 백업 조건으로 과도한 중복 호출이 줄어든다.
4. 네트워크 로드 전 `isPending` 상태와 데이터 길이 변화에 따라 중복 요청이 제한된다.

## 9) 현재 구현의 검토 포인트 (운영 전 체크)

- `ResizeObserver` 미지원 환경(매우 오래된 브라우저) 대체 경로가 필요하면 폴백을 추가할지 검토.
- `window.innerHeight` 재계산 주기(회전/리사이즈) 반영 필요 시 resize 이벤트와 동기화 추가.
- 스켈레톤/로더가 `ul` 자식으로 들어오며 태그 구조 의미론(ul>li) 정합성 점검.

## 10) 추가 작업 수행 결과 (폴백 + 구조 정합성)

### 10.1 `ResizeObserver` 미지원 환경 폴백

이번 단계에서 폴백을 직접 코드에 넣었다.

- `ResizeObserver`가 있는 환경
  - 아이템 노드에 `registerItemElement(index, el)`가 호출되면 즉시 observer에 등록.
  - 크기 변경은 observer 콜백에서 감지되어 `pendingHeights` 큐에 적재.
  - `rAF` 배치 커밋으로 `measuredHeights` 업데이트.
- `ResizeObserver`가 없는 환경
  - `registerItemElement`에서 최초 높이를 즉시 읽어서 pending에 등록.
  - `calculateRange` 실행 시 현재 렌더된 아이템들(`observedElementsRef`)의 높이를 `getBoundingClientRect()`로 한 번 더 스냅샷해 보정.
  - 동일하게 `rAF`로 누적 반영.

이 폴백은 `ResizeObserver`가 없던 환경에서 최소 동작 보장을 목표로 한다.  
동적 높이 변동이 잦은 환경에서 완벽한 실시간 정밀도(이미지 지연 로딩, 폰트 교체)까지는 100% 동일하지 않지만, 초기 노출/스크롤 동작 품질은 확보된다.

### 10.2 `ul > children` 구조 정합성 보강

`BlogPostListViewRoot`에서 슬롯 children(현재는 loader)을 바로 `ul` 하위로 두던 부분을 보강했다.

- `children`이 존재하면 `li` 래퍼로 감싼 뒤 렌더.
- 이로써 DOM 의미론(`ul`의 자식이 `li`)을 유지하면서도 스켈레톤/로더를 안전하게 넣을 수 있다.

### 10.3 문서화 대상으로 추가한 운영 체크리스트

이 단계에서 실제 릴리스 판단 기준을 더 구체화했다.

1. 기능 검증
   - 고정 높이/긴 텍스트/짧은 텍스트를 섞은 100개 항목에서 `loadMore`가 과도하게 앞당겨지거나 늦어지지 않는지 확인.
   - 화면 상단/중앙/하단에서 스크롤 재개 시 `remainingPx`가 급변해도 `visibleRange`가 비정상적으로 뒤집히지 않아야 함.
2. DOM 정합성
   - `ul` 하위가 실제로 `li`로만 구성되는지 브라우저 DOM로 확인.
   - loader 삽입/제거 시 React key/리스트 순회가 깨지지 않는지 확인.
3. 성능
- `scroll` 연속 수행 시 `ResizeObserver` 콜백 처리량과 `rAF` 스케줄 빈도가 폭주하지 않는지 모니터링.
   - `ResizeObserver` 미지원 환경에서 `getBoundingClientRect`를 통한 fallback 경로가 매 렌더에서 과도하게 도는지 프로파일링.
4. 호출 안정성
   - `hasMore`가 false일 때 `loadMore`가 더 이상 호출되지 않아야 함.
   - `isPending` 중복/중첩 호출이 없는지(Provider의 가드와 연동) 점검.

## 11) 앞으로 바로 이어서 점검할 부분

다음 단계는 문서 기준으로 바로 실행 가능한 두 항목이다.

1. `ResizeObserver` 미지원 브라우저에서 긴 텍스트 카드 변화(이미지 로드 후 높이 증가) 시점의 `remainingPx` 보정 정확도 추가 개선.
2. `preloadThresholdPx`를 `window.innerHeight` 기반 고정값에서 리사이즈 감지 상태로 이동(회전/분할 화면 대응).

## 12) 정량 측정 항목(데이터 입력 템플릿)

이 문서를 기준으로 정량값을 기록할 때는 아래 항목을 표준화하면 판단 속도가 빨라집니다.

### 12.1 핵심 지표 정의

- `driftPx` (가시 범위 오차)
  - 정의: 가상 계산 `visibleRange`로 예측한 첫 항목 시작 좌표와 실제 첫 보이는 항목 시작 좌표의 오차.
  - 계산식: `driftPx = |calc.visibleStartOffset - actual.visibleStartOffset|`
  - 목표: `driftPx <= 24px`

- `remainLeadPxAtLoad` (loadMore 선행 여유거리)
  - 정의: `loadMore()` 호출 시점의 `remainingPx` 값.
  - 목표: `1000px ~ 1500px` (viewport 1.25~1.5배권장)

- `loadMoreReactionMs` (감지 → 요청 반응 시간)
  - 정의: `remainingPx`가 임계값을 통과한 시점부터 실제 `loadMore` 호출까지 경과 ms.
  - 목표: `<= 16.7ms (1프레임)` 이상이면 거의 즉시, `<= 33ms` 내외면 허용.

- `gapEventCount` (빈 구간 빈발 횟수)
  - 정의: 스크롤 중 “마지막 아이템 하단 y좌표가 viewport bottom보다 위로 빠져나가고 다음 데이터가 아직 없을 때” 발생 횟수.
  - 목표: `0회`

- `duplicateLoadCount` (중복 요청)
  - 정의: 동일한 `cursor` 또는 연속 프레임에서 중복 트리거된 `loadMore` 시도.
  - 목표: `0회`

- `layoutTaskOverheadMs` (rAF 배치 재계산 비용)
  - 정의: rAF 콜백에서 `setMetrics`까지 소요된 합산 시간.
  - 목표: `P95 <= 4ms`, `P99 <= 8ms`

### 12.2 측정 시나리오

1. `viewport`: 375x812(모바일), 1366x768(데스크톱) 각 1개씩
2. 데이터셋: 
   - `short` 80개 (`summary` 40자 이하)
   - `long` 120개 (`summary` 400~1200자)
3. 네트워크: `Slow 3G` + `Normal 4G` 각 1회
4. 동작:
   - 연속 스크롤 5회 왕복(상단→하단→상단)
   - 각 프레임에서 `useWindowedRange` 결과 로그 수집

### 12.3 기록 템플릿

| timestamp | env | scenario | viewportPx | scrollY | visibleStart | visibleEnd | remainingPx | leadPxAtLoad | loadMoreReactionMs | driftPx | gapEvent | duplicateLoad | frameMs |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 2026-02-26T10:00:01.120Z | mobile | short+long mix | 812 | 1240 | 34 | 52 | 1320 | 1320 | 8 | 12 | 0 | 2.1 |
| 2026-02-26T10:00:01.233Z | mobile | short+long mix | 812 | 1380 | 36 | 54 | 1160 | 1160 | 11 | 18 | 0 | 1.8 |
| 2026-02-26T10:00:01.347Z | mobile | short+long mix | 812 | 1600 | 39 | 57 | 940 | 940 | 15 | 14 | 0 | 3.0 |

### 12.4 판정 규칙

- 합격 조건
  - `gapEventCount = 0`
  - `duplicateLoadCount = 0`
  - `driftPx` 95퍼센타일 `<= 24px`
  - `loadMoreReactionMs` 평균 `<= 16.7ms`
  - `remainLeadPxAtLoad` 평균 `1000~1500px`

- 경고 조건
  - `loadMoreReactionMs` 평균이 `33ms` 초과
  - `driftPx` 피크가 `40px` 이상
  - `gapEventCount >= 1`

### 12.5 수치 기반 개선 사이클

1. 현재 값 수집 → 2개 이상 기준 위반 여부 판별
2. 위반 구간의 `scrollY` 구간에서 `remainingPx`, `topSpacerPx`, `bottomSpacerPx`, `itemHeight` 분포 추적
3. `preloadReservePx`와 `overscan`을 각각 ±120 단위로 조정한 A/B 비교
4. 3회 반복 후 최종 지표 갱신

이전 기록은 1행당 1초 내 `useWindowedRange` 계산 주기를 기준으로 누적하면 되고, 수치만 바뀌더라도 비교 기준은 그대로 유지됩니다.

## 13) 실제 계측 실행 가이드

### 13.1 데이터 수집 토글

개발 콘솔(또는 데스크탑 브라우저)에서 아래 중 한 가지로 수집을 켭니다.

- URL 쿼리 파라미터: `?blogWindowRangeDebug=1`
- 로컬스토리지: `localStorage.setItem("blogWindowRangeDebug", "1")`

수집이 활성화되면 다음 버퍼에 이벤트가 적재됩니다.

- `window.__blogPostWindowRangeDebug`

최대 500개 이벤트만 유지되어야 한다는 정책으로 롤링 처리됩니다.

### 13.2 수집용 콘솔 스니펫

```ts
// 시작
localStorage.setItem("blogWindowRangeDebug", "1");
location.reload();

// 수집 이벤트 확인
const events = window.__blogPostWindowRangeDebug ?? [];
console.log("eventCount", events.length);
console.table(events.slice(-200));

// 지표 집계
const ranges = events.filter((x) => x.type === "range_update");
const loads = events.filter((x) => x.type === "load_more_invoked");
const avgMs = (arr: { frameMs: number }[]) =>
  arr.reduce((sum, cur) => sum + cur.frameMs, 0) / Math.max(arr.length, 1);
const p95 = (arr: { frameMs: number }[]) => {
  const sorted = [...arr].map((x) => x.frameMs).sort((a, b) => a - b);
  const idx = Math.max(0, Math.floor(sorted.length * 0.95) - 1);
  return sorted[idx] ?? 0;
};

console.log("avg frameMs", avgMs(ranges));
console.log("p95 frameMs", p95(ranges));
console.log("loadMore 호출 수", loads.length);
console.log(
  "avg loadMoreReaction",
  loads.reduce((sum, x) => sum + x.loadMoreReactionMs, 0) / Math.max(loads.length, 1),
);
```

### 13.3 이벤트 스키마

수집 이벤트는 아래 두 타입입니다.

- `range_update`
  - `frameMs`, `viewportStart`, `viewportEnd`, `remainingPx`, `measuredCount`, `pendingCount`, `totalHeightPx`
  - 용도: `visibleRange` 계산 비용/안정성 모니터링

- `load_more_invoked`
  - `loadMoreReactionMs`, `reason`, `preloadReservePx`, `remainingPx`, `visibleRangeStart`, `visibleRangeEnd`
  - 용도: `loadMore` 선행 호출 지연 분석

### 13.4 Drift 계산 오프라인 산식

실제 DOM 오프셋 기준 오차는 별도 계측 로그에서 계산할 수 있습니다.

```
driftPx = |observedFirstVisibleOffset - calcFirstVisibleOffset|
```

- `observedFirstVisibleOffset`은 `range_update` 시점에서 첫 번째 실제 노출 항목의 `offsetTop - list.scrollTop`로 계산.
- `calcFirstVisibleOffset`은 `prefixHeights[visibleRange.start]`로 근사.

`range_update` 이벤트 수만으로는 `driftPx`를 직접 제공하지 않으므로, 실측 스크립트(간단한 임시 스크립트)로 동시 수집합니다.

## 14) 추가 런타임 이슈 해결 (중첩 `<li>` 오류)

- 발생 증상
  - `In HTML, <li> cannot be a descendant of <li>.`
  - 스택에서 `BlogPostListViewLoader -> FrontMatterLoading -> LoadingAnimation -> <li>` 경로가 `ul` 계층에서 중첩됨.

- 원인 분석
  - `BlogPostListViewRoot`는 예전부터 `children`을 무조건 `<li>`로 래핑.
  - `FrontMatterLoading`은 `div` 래퍼 + 내부 `li`를 렌더링.
  - 조합 결과가 `ul > li (wrapper) > div > li` 형태로 파고듦.

- 적용 변경
  - `BlogPostListViewRoot`에서 `children`의 추가 `<li>` 래퍼 제거.
  - `FrontMatterLoading`에 `isListItem` 모드 추가:
    - 기본(false): 페이지 레벨 로딩에서 사용되는 기존 div 컨테이너 기반 렌더 유지.
    - true: 스켈레톤 아이템을 `li`로 바로 렌더해 가상 리스트 내부에서 사용 가능하게 변경.
  - `BlogPostListViewLoader`에서 `FrontMatterLoading` 호출 시 `isListItem` 켬.

- 결과
  - `ul` 직계 자식으로 렌더되는 항목은 `li`/`text/whitespace` 수준으로 정리.
  - 중첩 `<li>` hydration warning 제거를 기대.

## 15) 하단 도달 후 반복 액션 버그 대응 (최근 수정)

### 15.1 증상

- 마지막 페이지 도달 후에도 `hasMore`가 `false`로 보이지 않아 `loadMore()`가 반복 호출.
- 화면에는 추가 데이터가 없어도 스크롤 위치에 맞춰 액션 시도가 반복되어 1~2px 단위 미세 진동이 발생.

### 15.2 원인

- `BlogPostProvider`에서 종료 플래그를 `endReachedRef`(ref)로만 관리.
- ref 변경은 렌더링 트리거가 아니므로 `hasMore`가 false로 바뀌어도 즉시 다시 계산되지 않음.
- 마지막 응답이 빈 배열인 케이스에서 `setAtomState`가 생략되면 재렌더링이 발생하지 않아 `loadMore` 가드가 반복.

### 15.3 수정 내용

- `BlogPostProvider`에 `hasMoreState`를 `useState`로 도입.
- `loadMore` 진입부 가드에 `!hasMoreState`를 추가.
- 응답 처리 후 `nextHasMore` 계산을 명시:
  - `filteredNewPosts.length > 0 && nextLength < nextTotalCount`
- `nextHasMore`를 `setHasMoreState`로 반영해 `BlogPostListViewRoot`에서 즉시 `loadMore` 조건이 끊기게 변경.
- 마지막 구간에서 `nextHasMore`가 `false`면 상태가 렌더링 경로로 전달되어 스크롤에 상관없이 이후 반복 요청을 차단.

### 15.4 정량 지표(수치 기반 검증)

하단 도달 종료 조건이 제대로 반영되는지 판단할 때 아래 지표를 수치로 확인한다.

- `load_more_after_exhaustion_count`: `hasMoreState`가 false가 된 뒤 호출된 `loadMore()`
- `end_reached_load_distance_px`: 종료 판정 시점의 `remainingPx`
- `stop_delay_ms`: `remainingPx`가 임계값 이하가 되어 다음 프레임에서 `hasMoreState`가 false로 반영되기까지 걸린 시간
- `duplicate_load_near_end`: 동일 스크롤 구간에서의 중복 `loadMore` 호출 수

목표:
- `load_more_after_exhaustion_count = 0`
- `stop_delay_ms <= 16.7ms` (1frame) 또는 동일 프레임 반영
- `duplicate_load_near_end = 0`

샘플 계산식(브라우저 콘솔 예시):

```ts
const events = window.__blogPostWindowRangeDebug ?? [];
const loads = events.filter((x) => x.type === "load_more_invoked");
const ranges = events.filter((x) => x.type === "range_update");

const sorted = [...loads].sort((a, b) => a.timestamp - b.timestamp);
let lastHasMoreFalseTs: number | null = null;
const endAfterLoad = sorted.filter((load) => {
  if (load.hasMore === false) {
    lastHasMoreFalseTs = load.timestamp;
    return false;
  }
  if (lastHasMoreFalseTs === null) {
    return false;
  }
  return true;
});

console.table({
  end_reached_load_calls: endAfterLoad.length,
  first_load_after_false_ms:
    endAfterLoad.at(0)?.loadMoreReactionMs ?? 0,
  duplicate_load_near_end: endAfterLoad.length,
});
```

참고: 현재 디버그 이벤트에는 `load_more_invoked.hasMore` 값이 포함되므로, 실제 운영에서는
해당 값이 `false`로 바뀐 이후 이벤트가 수집되지 않는지 우선 확인한다.

## 16) 추가 조치: 바닥 도달 진입 시 스크롤 흔들림 대응 (진행 중)

### 16.1 증상

- 하단 데이터가 더 이상 없는데도 스크롤이 최하단 부근에서 1~2px 단위로 반복적으로 흔들림.
- 최종 페이지 도달 시점에서 `remainingPx <= threshold` 판정 자체는 정상 동작하더라도
  `bottom spacer + 가변 높이 오차`가 결합되며 체감 흔들림이 남을 수 있음.

### 16.2 이번에 추가한 보강

- `BlogPostListViewLoader`:
  - `isPending`만으로 스켈레톤을 출력하지 않고, `hasMore && posts.length < totalCount`일 때만 출력.
  - 종료 구간에서 pending 요청 중이라도 하단에 빈 공간/높이 점프가 반복되던 패턴 완화.
- `BlogPostListViewRoot`:
  - `canLoadMore = hasMore && posts.length < totalCount` 가드 추가.
  - `loadMore`/`load_more_invoked` 조건도 `canLoadMore` 기준으로만 평가.
- `BlogPostProvider`:
  - `hasMore` 값도 `frontmatters.length < totalCount`와 교차 검증하여, 상태 불일치 시 종료로 오판하지 않도록 보강.
- `app/GlobalStyle.ts`:
  - `blog-main__landing-page`의 `overflow: hidden` 제거.
  - 루트 영역이 스크롤 경계에서 하위 컨텐츠를 클리핑할 가능성 제거.
- `useWindowedRange`:
  - 미측정 항목 높이 추정치를 고정 `estimatedHeight`에서 “측정된 평균 높이”로 보정.
  - 실제 렌더된 항목 높이들의 평균이 누적되며, unrendered 영역의 spacer 오차를 축소.

### 16.3 디버그 로그 확인 방법

현재는 브라우저 콘솔에서 다음으로 직접 추출 가능:

```ts
// 최근 이벤트를 200개까지 확인
const events = (window.__blogPostWindowRangeDebug ?? []).slice(-200);
console.table(events);

// hasMore false 이후 load_more_invoked가 발생했는지 체크
const falseIndex = events
  .map((x, idx) => (x.type === "load_more_invoked" && x.hasMore === false ? idx : -1))
  .find((x) => x >= 0);
console.log("first false event index:", falseIndex);

const hasLoadAfterFalse = events.some((x, idx) =>
  x.type === "load_more_invoked" &&
  x.hasMore === false
);
console.log("load_more_invoked with hasMore false count:", hasLoadAfterFalse ? "exists" : 0);

// 바닥 근처 판정용 remainingPx 분포
const tail = events.filter((x) => x.type === "range_update" && x.remainingPx <= 3000);
console.table(tail.map((x) => ({
  t: x.timestamp,
  remainingPx: x.remainingPx,
  visibleRange: `${x.visibleRangeStart}-${x.visibleRangeEnd}`,
  measuredCount: x.measuredCount,
  pendingCount: x.pendingCount,
  totalHeightPx: x.totalHeightPx,
})));
```

목표 판정:

- `load_more_invoked` 중 `hasMore === false`가 없어야 함.
- 하단 접근 구간(`remainingPx` 작음)에서 `measuredCount`가 점진 상승하고 `totalHeightPx`/`remainingPx`가 과도하게 진동하지 않아야 함.
- 200개 샘플 내에서 `range_update` 연속 프레임에서 `remainingPx`가 급격히 양/음 진동하지 않아야 함.

### 16.4 추가 보강: 종료 구간에서 전체 렌더 폴백 전환

- `canLoadMore === false`(더 이상 요청 가능한 데이터가 없는 상태)로 확정되면
  `BlogPostListViewRoot`에서 가상화 슬라이스 렌더를 중단하고 현재까지 로드된 전체 포스트를 직접 렌더링한다.
- 효과:
  - tail 구간에서 `top/bottom spacer` 누적 오차 영향 제거
  - 마지막 구간 미세 흔들림/바닥 미도달 이슈를 즉시 상쇄
  - 정적 높이 추정 오차가 더 이상 스크롤 고정점에 영향을 주지 않음
- 트레이드오프:
  - 종료 시점 전체 항목 수가 매우 클 경우 초기 렌더 비용 증가 가능
  - 현재 데이터셋 기준(최대 수십~백 단위)에서는 체감 성능 영향이 크지 않음

### 16.5 재발 시 확인 절차

콘솔에서 아래 스니펫 그대로 실행해서 최근 200개 이벤트를 남겨주세요.

```ts
localStorage.setItem("blogWindowRangeDebug", "1");
location.reload();
const events = (window.__blogPostWindowRangeDebug ?? []).slice(-200);
console.table(events);

const loadInvokedAfterFinish = events.filter(
  (x): x is any =>
    x.type === "load_more_invoked" && x.hasMore === false
);
console.log("load_more_invoked.hasMore=false count:", loadInvokedAfterFinish.length);

const tailRangeUpdates = events
  .filter((x) => x.type === "range_update")
  .filter((x) => x.totalHeightPx > 0)
  .map((x) => ({
    t: x.timestamp,
    remainingPx: x.remainingPx,
    visibleRange: `${x.visibleRangeStart}-${x.visibleRangeEnd}`,
    totalHeightPx: x.totalHeightPx,
    measuredCount: x.measuredCount,
    pendingCount: x.pendingCount,
    deltaRemaining:
      x.remainingPx - (x.previousRemainingPx ?? x.remainingPx),
  }));

console.table(tailRangeUpdates.slice(-120));
```

### 16.6 이번 실행 반영 버전 (요약 반영 사항)

#### 반영된 핵심 코드 변경

- `useWindowedRange.ts`
  - `enabled` 설정값 추가 반영 완료
    - `canLoadMore === false`일 때 `calculateRange`/`scroll/resize` 계산 자체를 사실상 중지
    - `createDisabledMetrics`로 `visibleRange`를 전체 항목 범위로 고정
    - `ResizeObserver` pending/observed 상태를 정리해 종료 구간에서 상태 흔들림 차단
  - 높이 측정/측정 반영 흐름은 유지하되, 종료 구간에서만 동작을 억제
  - itemCount 변경 시 `enabled`가 false면 `remainingPx`를 0으로 정규화

- `BlogPostListViewRoot.tsx`
  - `buildVirtualConfig`에 `enabled` 전달
  - `shouldRenderAllPosts = !canLoadMore`에서 실제 렌더 전환 유지
  - `canLoadMore === false`일 때 loadMore 조건 분기 최상단에서 종료(타이머/신호 리셋 포함)
  - `children`은 `li` 래퍼로 감싸 UL 구조 정합성 유지

- `ContentLoading.tsx`
  - `isListItem` 분기에서 `li` 출력 제거 (`div` 기반 `BlogPostLoadingItem` 사용)
  - 기존 `li` 직접 렌더 경로 제거로 `ul` 자식 위반 경고 최소화

#### 디버그 데이터 수치화(요청 템플릿)

요청하신 “~200개 샘플”은 아래 형태로 붙여주시면 됩니다.

```ts
const events = (window.__blogPostWindowRangeDebug ?? []);
console.log("total", events.length);
console.log("tail_200", events.slice(-200));
```

제출 시 체크 포인트:

- `type === "range_update"`: `timestamp`, `viewportStart`, `viewportEnd`, `remainingPx`, `visibleRangeStart`, `visibleRangeEnd`, `measuredCount`, `pendingCount`, `totalHeightPx`
- `type === "load_more_invoked"`: `timestamp`, `loadMoreReactionMs`, `remainingPx`, `reason`, `hasMore`, `isPending`, `itemCount`
- 반드시 시점 기준으로 정렬(오름차순) 후, `hasMore === false` 이후에 `load_more_invoked`가 있는지 확인
- 하단 흔들림 의심 구간의 경우 아래 간단 지표를 산출
  - `remainingPx_min`, `remainingPx_max` (window 마지막 500px 이내 구간)
  - `remainingPx` 연속 프레임 차분의 절대값 평균(`|ΔremainingPx|`) 
  - `load_more_invoked` 발생 시점 분포(중복/재진입)

#### 합격/경고 판정(정량)

- 합격
  - `canLoadMore === false` 이후 `load_more_invoked.hasMore=false` 0건
  - 하단 200샘플 구간에서 `remainingPx`의 진동 횟수(방향 전환) 0~1회
  - 마지막 구간 `visibleRange`가 스크롤 위치와 일치하면서 큰 왕복(>2회) 없음
- 경고
  - 하단 200샘플에서 `load_more_invoked`가 잦게 반복
  - `remainingPx`가 연속 프레임에서 급격히 왕복(예: 80px 이상 진폭)
  - `measuredCount`와 `pendingCount`가 하단 구간에서 반복적으로 0↔증가를 반복

### 16.7 추가 대응 적용 (최신 반영)

바닥에서 미세 진동이 남는 구간을 줄이기 위해 아래 항목을 추가 반영했다.

1. 터미널 모드 진입 타이밍 안정화
   - `BlogPostListViewRoot`에 `isTerminalMode` 상태를 추가했다.
   - `canLoadMore === false && !isPending`일 때 바로 전체 렌더로 전환하지 않고,
     `requestAnimationFrame` 한 번 뒤 전환한다.
   - 목적: 마지막 fetch 응답 이후 레이아웃 수렴 전에 전환이 일어나면서 생기는 첫 프레임 흔들림 제거.

2. 스크롤 앵커 보정
   - `BlogPostList` 스타일에 `overflow-anchor: none`을 추가했다.
   - 목적: 동적 높이 변경/아이템 마운트 언마운트 시 브라우저의 자동 스크롤 보정으로 인한 1~2px 단위 역진동 억제.

3. 터미널 진입 직전 `itemCount` 브랜치 추정치 보정
   - `useWindowedRange`에서 `itemCount` 변경 처리 시
     `config.estimatedHeight` 대신 `getEstimatedHeight()`(측정 평균값)로
     `totalHeightPx`, `remainingPx`, `bottomSpacerPx`를 계산한다.
   - 목적: 최종 구간에서 상수 추정치 오차로 인한 보정 과도동작 완화.

4. 뷰포트 오프셋 정수화
   - `viewportStart`, `viewportEnd`를 정수화하여 경계 프레임 진동을 감소.

### 16.8 숫자 기반 재검증

동일 방식으로 마지막 200샘플을 확인한다.

```ts
const events = (window.__blogPostWindowRangeDebug ?? []);
console.log("total", events.length);
console.log("tail_200", events.slice(-200));

const ranges = events
  .filter((x): x is any => x.type === "range_update")
  .slice(-200);
const hasMoreFalseLoads = (events as any[]).filter(
  (x) => x.type === "load_more_invoked" && x.hasMore === false,
).length;
const remainingDeltas = ranges
  .map((cur, idx, arr) =>
    idx === 0 ? 0 : Math.abs(cur.remainingPx - arr[idx - 1].remainingPx),
  )
  .slice(1);
const avgAbsRemainingDelta =
  remainingDeltas.reduce((sum, v) => sum + v, 0) / Math.max(remainingDeltas.length, 1);

console.log("hasMore false load count:", hasMoreFalseLoads);
console.log("avgAbsRemainingPxDelta(last200):", avgAbsRemainingDelta);
console.log(
  "last range_update:",
  ranges.at(-1) ? { remaining: ranges.at(-1).remainingPx, totalHeightPx: ranges.at(-1).totalHeightPx } : null,
);
```

판정 기준

- 합격 (0): `hasMore false load count === 0`
- 하단 흔들림 완화: `avgAbsRemainingPxDelta <= 1.5`
- 터미널 후 `topSpacerPx`, `bottomSpacerPx`가 더 이상 반복 재배치 되지 않음
