import { isIterable } from './isIterable';

function* mapSync<A, B>(fn: (a: A) => B, iterable: Iterable<A>) {
  for (const value of iterable) {
    yield fn(value);
  }
}

async function* mapAsync<A, B>(fn: (a: A) => Promise<B>, iterable: AsyncIterable<A>): AsyncIterable<B> {
  for await (const value of iterable) {
    yield await fn(value);
  }
}

export function map<A, B>(fn: (a: A) => B, iterable: Iterable<A>): Iterable<B>;
export function map<A, B>(fn: (a: A) => Promise<B>, iterable: AsyncIterable<A>): AsyncIterable<B>;

export function map<A, B>(
  fn: (a: A) => B | Promise<B>,
  iterable: Iterable<A> | AsyncIterable<A>
): Iterable<B> | AsyncIterable<B> {
  return isIterable(iterable) ? mapSync(fn as (a: A) => B, iterable) : mapAsync(fn as (a: A) => Promise<B>, iterable);
}
