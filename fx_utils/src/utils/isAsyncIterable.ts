export function isAsyncIterable<T>(a: unknown): a is AsyncIterable<T> {
  return typeof a === 'object' && typeof (a as any)?.[Symbol.asyncIterator] === 'function';
}
