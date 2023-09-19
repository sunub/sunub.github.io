---
title: Hydration에 대해 알아보자
date: 2023-07-28
tags: code
summary: react에서 이야기하는 Hydration이란 무엇인가?
slug: howto-activate-hydration
category: javascript
---
## Hydration이란?

Hydration은 정적인 HTML 파일을 React 애플리케이션으로 변환하는 과정을 이야기하는 것이다.

Hydration은 주로 SSR(Server-side rendering)에서 많이 사용되는 방법이다. SSR은 클라이언트에게 웹페이지가 렌더링이 되기 이전에 서버 측에서 React 컴포넌트를 미리 불러오고 렌더링 함으로써 성능 향상과 SEO의 향상을 얻을 수 있다는 장점이 있다. 하지만 SSR의 단점은 페이지가 로드 되는 동안 데이터의 변경이 일어난다면 사용자들은 이미 지난 데이터를 기반으로 구성된 페이지를 이용할 수 있다는 단점이 있다. 이러한 단점을 개선하기 위하여 등장한 것이 Hydration이다.

### hydrateRoot(domNode, reactNode, options?)

hydrateRoot는 기존에 서버 환경에 렌더링 되어 있는 HTML에 reactNode를 붙여 사용할 수 있게끔 만들어준다.

- domNode : 서버에서 이미 렌더되어 서버에 연결 시 Root 요소로써 사용할 수 있게끔 초기에 구성된 DOM element를 뜻한다.
- reactNode : 기존의 HTML을 렌더링하기 위하여 사용되는 React Node를 요구하며, 일반적으로 renderToPipeableStream이나 ReactDOM Server로 렌더링 된 JSX 형식의 `<App />`을 요구한다.

```html
// index.html
<div id="root">
 <h1>Hello World!>
 <input placeholder="Type something" />
</div>
```

우선 위의 index.html을 예제로 생각을 해보자. hydreateRoot server에서 렌더링 된 html에 추가적인 기능을 붙여처 사용할 수 있게 끔 하는 기능이라고 위에서 이야기 했다. 우리는 여기에 시간이 지날 때 마다 숫자가 증가하는 타이머의 기능을 추가하고 싶다. 그렇다면 어떻게 해야 할까?

```javascript
const rootDOM = docuemnt.getElementByID("root");

const App = ({ counter }) => {
 return <>
  <h1>Hello World! ${counter} </h1>
  <input placeholder="Type something" />
 </>;
};

const root = hydrationRoot(rootDom, <App count={0} />);

document.requestAnimationFrame(() => {
 root.render(<App count={i} />);
 i++;
});
```

위와 같이 코드를 작성한다면 우리가 원하던 기능을 구현할 수 있다. 이러한 경우는 주로 사용하는 방법이 아니지만 Hydration을 설명하기에는 적절하다. root.render()를 통하여 매번 root 요소를 만드는 것이 아닌 root에 포함되어 있는 트리내의 요소를 업데이트 할 수 있다. 위의 경우에서 root에서 렌더링 된 HTML 파일과 ReactNode를 보면 서로 겹치는 부분이 있다는 것을 알 수 있다. 이렇게 겹치는 부분이 있을 경우 서버에서 렌더링 되어 있는 부분을 없애는 것이 아니라 기존의 상태를 보존하고 업데이트 되는 부분만 렌더링할 수 있다는 장점이 있다.
