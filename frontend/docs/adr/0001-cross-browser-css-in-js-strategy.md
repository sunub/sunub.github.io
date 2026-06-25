# 0001: CSS-in-JS 환경에서의 모던 CSS 크로스 브라우징 전략

상태: accepted

**맥락 (Context):**
`styled-components` 내부에서 `color-mix`, `oklch`, `@container` 등의 최신 CSS 문법을 적극적으로 활용하고 있으나, PostCSS(`postcss-preset-env`)는 자바스크립트 템플릿 리터럴 내부의 CSS를 빌드 타임에 해석 및 폴리필하지 못합니다. 또한 런타임 테마 변수(`var()`)를 포함한 `color-mix`는 근본적으로 빌드 타임 정적 폴리필이 불가능합니다. 이로 인해 구형 브라우저(Safari 15 이하 등)에서 서비스의 레이아웃과 색상이 완전히 붕괴되는 심각한 호환성 문제가 존재했습니다.

**결정 (Decision):**
빌드 타임 트랜스파일 도구에 의존하는 대신, CSS Feature Queries(`@supports`)를 활용하여 수동으로 Fallback을 제공하는 **'점진적 향상(Progressive Enhancement)' 및 '우아한 성능 저하(Graceful Degradation)' 전략**을 채택합니다.

**왜 이 결정을 내렸는가 (Why):**
CSS Modules, Vanilla Extract, 혹은 Tailwind CSS 등으로 기존 스타일링 아키텍처를 전면 개편하는 것은 현재 프로젝트 자원상 마이그레이션 비용이 지나치게 큽니다. 반면 `@supports`와 `hex`/`rgba` 폴백을 명시적으로 작성하는 방식은 다소 번거롭지만, 기존 `styled-components` 구조의 파편화를 막고 확실한 하위 호환성을 즉각적으로 보장할 수 있는 가장 실용적이고 견고한 프론트엔드 엔지니어링 패턴이기 때문입니다.

**고려된 대안 (Considered Options):**
- **부분적 CSS Modules 전환**: 스타일링 패러다임의 파편화 및 런타임 변수(`var()`) 폴리필 불가 한계로 인해 기각
- **Zero-runtime CSS-in-JS / Utility-first 프레임워크 전면 도입**: 높은 마이그레이션 비용으로 인해 보류

**결과 (Consequences):**
- 향후 컴포넌트 개발 시 `color-mix`, `oklch`, `@container` 등 최신 문법을 사용할 때는 브라우저 호환성을 고려하여 반드시 기본 속성으로 안전한 `hex`/`rgba` 값을 선언해야 합니다.
- 최신 문법은 `@supports` 블록 내부에 캡슐화하여 오버라이딩하는 엄격한 코드 컨벤션을 유지해야 합니다.
