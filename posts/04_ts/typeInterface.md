---
title: 타입스크립트의 선언문들
date: 2023-06-12
tags: typescript
description: 타입 선언문 Interface에 대해서 이해하고 또 다른 타입 선언문인 type 과의 차이를 이해하고 적용해보자.
slug: /03_ts/typeInterface
---

### 타입스크립트의 타입추론을 적극적으로 이용하자

```typescript
let x = 12;
const axis1: string = "x";
const axis2 = "y";
```

위의 예제를 한 번 살펴보자 위의 경우 x는 number라는 타입을 따로 추론하지 않더라도 x는 number 타입이라는 것이 명확하기 때문에 따로 선언하지 않아도 된다.

아래의 문자열의 경우 axis1의 string의 타입은 광범위한 타입이다. 타입을 정함에 있어서 광범위한 타입 보다는 더 좁은 타입을 사용해야 한다. 이러한 의미에서 axis2는 타입이 “y”로 정해져 있다. 이 경우 string보다 더 정확한 값이라고 할 수 있다.

### 비구조 할당문을 적극적으로 사용하자

```typescript
interface Product {
  id: string;
  name: string;
  price: string;
}

function logProduct(product: Product) {
  const id: string = product.id;
  const name: string = product.name;
  const price: number = product.price;
}
// 이렇게 사용할 경우 타입을 이미 선언 했음에도 제대로 사용하지 못하고 따로 따로 선언하고 있는 불편한 경우를 볼 수 있다.

function logProduct(product: Product) {
  const { id, name, price } = product;
}
// 이 경우에는 번잡하게 사용하지 않더라도 편하게 타입 선언이 가능한 것을 볼 수 있다.
```

### 반환 타입을 명시할 것

```typescript
interface Vector2D {
  x: nubmer;
  y: number;
}

function add(a: Vector2D, b: Vector2D) {
  return { x: a.x + a.y, y: b.x + b.y };
}
```

위의 예시를 보았을 때 주어진 타입인 Vector2D가 있음에도 불구하고 반환 값에 대한 타입이 선언되어 있지 않기 때문에 add 함수의 반환 값이 어떠한 것인지 명확하게 알 수 없기 때문에 혼란을 야기할 수 있다.

### 넓히기 Widening

여기서 설명하는 넓히기는 타입스크립트가 자체적으로 변수에 대한 타입을 확장하는 것을 이야기 한다.

```typescript
type Vector2D {
	x : number,
	y : number,
}

function add(a: Vector2D, key: "x" | "y" | "c"){
	reutn a[key]
}

let x = "x"
let vec = {x: 10, y: 20, z: 30}
add(vec, x)
// Error occurred
```

위의 예제에서는 오류가 발생한다. 오류가 발생하는 이유는 x에 대한 값이 넓혀져서 파악이 되었기 때문이다. key의 경우 "x" | "y" | "c"로 타입이 좁혀져서 선언이 되었다. 하지만 x의 경우 넓혀져서 string 으로 파악되어 사용되기 때문에 제대로 추론이 이루어지지 않아 오류가 발생하는 것이다.

넓히기의 경우 타입을 선언함에 있어서
