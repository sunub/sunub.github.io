---
title: 무한 스크롤링으로!
date: 2023-08-10
tags: javascript
summary: sns에서 자주 보이던 무한스크롤링은 무엇일까?
slug: howto-activate-infinite-scrolling
category: javascript
---

## 무한 스크롤링으로'!'

무한스크롤링은 여러 twitter(현 X), Instgram등등 여러 sns에서 사용되는 방법이다. 무한스크롤링은 페이지의 모든 내용을 페이지가 로딩될때 렌더하는 것이 아닌 Viewport를 기반으로 추가 콘텐츠를 렌더링 하는 방법이다. 

> ## Viewport란?
>
>viewport는 chrome 앱을 실행하거나 다른 firefox등등의 앱을 실행시켰을때 컴퓨터 화면에서 보이는 사각형 영역내에 현재 보이는 영역들을 뜻한다. 여기서 중요한 것은 **"현재"** 보이는 부분이라는 것이다. viewport는 사용자의 상호작용에 따라서 크기나 위치가 바뀌는 동적인 영역이다. 그렇기 때문에 위에서 강조한 현재 보이는 부분이라는 것이 굉장히 중요하다. 

인피니티 스크롤링은 인터넷의 기능을 향상시키기 위하여 등장한 방법이다. 이 방법이 성능을 올려주는 방법은 무엇일까? 페이지에 방문할 경우 우리가 당장 그 페이지의 모든 내용이 필요한 것은 아니다. 예를 들어 현재 보고 있는 viewport에는 그 페이지 내에서 상대적으로 적은 데이터를 차지하는 이미지나 컨텐츠들이 있을 수 있다. 하지만 페이지를 로딩할 때 한 번의 모든 내용을 렌더링할 경우 당장 필요하지 않은 큰 용량을 차지하는 데이터들도 같이 로드되면서 당장 필요하지 않은 내용들이 인터넷의 속도를 저하시킬 수 있다.

결론으로, 인피니티 스크롤링은 당장에 필요한 것들만 사용하자! 라는 생각으로 등장한 방법이다. 이러한 방법들의 예시는 아래와 같다. 

- Lazy-loading: 이미지 또는 기타 컨텐츠를 스크롤링에 따라 지연시킨다. 보이지 않는 부분은 이미지는 보든 데이터를 불러 오는 것이 아닌 일 부분만 로드한다. 
- Infintie scrolling
- 페이지가 보이는 곳에 따른 애니메이션을 수행할지 말지에 대한 결정


## 무한 스크롤링에서 필요한 요소

무한 스크롤링에서 가장 중요한 것이 또 있다. 바로 **"사용자가 무한 스크롤링이 일어나고 있는지 몰라야 한다"** 는 것이다. 이러한 것을 이뤄내기 위하여 필요한 것들이 있다. 

1. 기준으로 할 타겟이 필요하다. 
대상으로 삼은 타겟이 장치의 뷰포트 또는 지정된 요소와 교차한다는 기준점이 필요하고 이러한 기준점으로 삼는 요소를 root 또는 root element라고 한다. 
2. 페이지가 맨 처음 로드 되었을 때 사용자가 볼 수 있는 요소가 필요하다. 


