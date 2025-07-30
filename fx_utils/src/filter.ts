import { isIterable } from './utils/isIterable';

function* filterSync<T>(fn: (a: T) => boolean, iterable: Iterable<T>): IterableIterator<T> {
  for (const val of iterable) {
    if (fn(val)) {
      yield val;
    }
  }
}

async function* filterAsync<T>(
  fn: (a: T) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<T>
): AsyncIterableIterator<Awaited<T>> {
  for await (const val of asyncIterable) {
    if (await fn(val)) {
      yield val;
    }
  }
}

export function filter<T>(fn: (a: T) => boolean, iterable: Iterable<T>): IterableIterator<T>;

export function filter<T>(
  fn: (a: T) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<T>
): AsyncIterableIterator<Awaited<T>>;

export function filter<T>(fn: (a: T) => boolean | Promise<boolean>, iterable: AsyncIterable<T> | Iterable<T>) {
  return isIterable(iterable) ? filterSync(fn as (a: T) => boolean, iterable) : filterAsync(fn, iterable);
}
