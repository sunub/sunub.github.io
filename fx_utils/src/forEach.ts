import { isIterable } from './utils';

function* forEachSync<T>(fn: (v: T) => void, iterable: Iterable<T>): IterableIterator<void> {
  for (const val of iterable) {
    yield fn(val);
  }
}

async function* forEachAsync<T>(
  fn: (v: T) => void | Promise<void>,
  asyncIterable: AsyncIterable<T>
): AsyncIterableIterator<void> {
  for await (const val of asyncIterable) {
    yield await fn(val);
  }
}

export function forEach<T>(fn: (v: T) => void, iterable: Iterable<T>): IterableIterator<void>;

export function forEach<T>(
  fn: (v: T) => void | Promise<void>,
  asyncIterable: AsyncIterable<T>
): AsyncIterableIterator<void>;

export function forEach<T>(fn: (v: T) => void | Promise<void>, iterable: Iterable<T> | AsyncIterable<T>) {
  return isIterable(iterable) ? forEachSync(fn, iterable) : forEachAsync(fn, iterable);
}
