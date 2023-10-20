---
title: Backtracking에 관하여...
date: 2023-08-12
tags: algorithm
summary: 모든 배열을 순환하여 탐색할 수 있는 방법
slug: whatis-backtracking
category: algorithm
---

## Backtracking

알고리즘 문제에 백트렉킹(back tracking)을 요구하는 경우는 주어지는 값의 모든 경우를 탐색해야할 경우에 주로 사용된다. 예를 들어 `input = [1, 2, 3, 4, 5]`의 값이 주어졌고 해당 배열로 만들 수 있는 배열의 길이가 2인 배열들을 요구할 경우가 있다. 이 문제의 경우 주어지는 배열의 모든 값을 탐색해야 한다. 이 문제의 해결 방법을 간단하게 설명해보겠다.

```javascript
function backtracking(input, target) {
    const answer = [];
    dfs(0, [])
    return answer

    function dfs(start, curr) {
      if(start >= input.length) {
          return
      }

      if(curr.length === target) {
          answer.push([...curr]);
        return
      }

      for(let i = start; i < input.length; i++) {
          curr.push(input[i]);
          curr.pop();
      }
    }
}

backtracking([1, 2, 3, 4, 5], 2)
```

위의 문제의 해결방법에서 주목해야 할 것은 3가지가 있다.

1. 상태를 식별해야 한다.
여기서 상태란 정답에 도달하기 위해 추적해야할 값의 상태를 말한다. 위의 문제를 해결하기 위해 계속해서 변화 시키는 값은 curr 값이다. 이 curr 값이 어떻게 하면 목표에 도달할 수 있으며 목표로 해야할 값이 무엇인지를 식별해야 한다.

2. 변화하는 상태 값을 트리의 형태로 구성하여 정답을 만들어 볼 것
예를 들어 `[1]`로 시작하는 값 뒤에 올 수 있는 값들인 `[2], [3], [4], [5]`들을 이용하여 배열의 길이가 2인 정답을 나열해보자는 것이다.

3. 정답에 도달하기 위한 배열의 값을 줄일 것인지 유지할 것인지 판단할 것
만약 정답에 도달하기 위해 변화 시켜야 하는 상태 값이 유지가 되어야 한다면 위와 같이 계속해서 값을 줄이는 것은 옳지 않은 방법일 것이다. 아래의 경우를 살펴보자.

```typescript
const input = [1, 2, 3, 4, 5];
const answer: number[][] = [];

function backtracking(curr: number[], visit: boolean[]) {
   if(curr.length === input.length) {
      answer.push([...curr]);
      return
   }

   for(let i = 0; i < input.length; i++) {
      if(visit[i]) continue
      curr.push(input[i]);
      visit[i] = true;
      backtracking(curr, visit);
      curr.pop();
      visit[i] = false;
   }
}
```

위의 경우는 주어지는 input 배열의 내부의 값의 순서를 변화 시켜서 서로 다른 모든 배열을 구하는 문제이다. 이 문제는 유명한 문제로 순열(permutation)을 구하는 문제이다. 이 경우 배열의 길이는 유지하되 이미 사용한 값을 다시 사용하면 안되기 때문에 visit을 통해서 반복을 없애는 방법을 사용한다. 위의 경우가 다른 점은 `start = i + 1`을 통해 input 배열을 줄이지 않고 `i = 0`부터 시작하여 모두 사용한다는 점이 다른 점이다.
