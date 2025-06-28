export function toAsync<A>(
  iterable: Iterable<A | Promise<A>>
): AsyncIterable<Awaited<A>> {
  return {
    [Symbol.asyncIterator](): AsyncIterator<Awaited<A>> {
      const iterator = iterable[Symbol.iterator]();
      return {
        async next() {
          const { done, value } = iterator.next();
          return done ? { done, value } : { done, value: await value };
        },
      };
    },
  };
}
