import { isIterable } from './utils/isIterable';

export function* findSync<T>(fn: (a: T) => boolean, iterable: Iterable<T>) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { value, done } = iterator.next();
    if (done) {
      break;
    }
    if (fn(value)) {
      yield value;
      return;
    }
  }
}

export async function* findAsync<T>(fn: (a: T) => boolean | Promise<boolean>, asyncIterable: AsyncIterable<T>) {
  const iterator = asyncIterable[Symbol.asyncIterator]();
  while (true) {
    const { value, done } = await iterator.next();
    if (done) {
      break;
    }
    if (await fn(value)) {
      yield value;
      return;
    }
  }
}

export function find<T>(fn: (a: T) => boolean, iterable: Iterable<T>): IterableIterator<T>;

export function find<T>(
  fn: (a: T) => boolean | Promise<boolean>,
  asyncIterable: AsyncIterable<T>
): AsyncIterableIterator<Awaited<T>>;

export function find<T>(
  fn: (a: T) => boolean | Promise<boolean>,
  iterable: Iterable<T> | AsyncIterable<T>
): IterableIterator<T> | AsyncIterableIterator<Awaited<T>> {
  return isIterable(iterable) ? findSync(fn as (a: T) => boolean, iterable) : findAsync(fn, iterable);
}
