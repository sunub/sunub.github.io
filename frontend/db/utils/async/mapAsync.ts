export function mapAsync<A, B>(fn: (a: A | Promise<A>) => B, iterable: AsyncIterable<A>): AsyncIterableIterator<B> {
  const asyncIterator = iterable[Symbol.asyncIterator]();
  return {
    async next() {
      const { done, value } = await asyncIterator.next();
      return done ? { done, value } : { done, value: await fn(value) };
    },
    [Symbol.asyncIterator]() {
      return this;
    },
  };
}
