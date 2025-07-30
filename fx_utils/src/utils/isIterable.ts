export function isIterable<T>(a: unknown): a is Iterable<T> {
  return typeof (a as any)?.[Symbol.iterator] === 'function';
}
