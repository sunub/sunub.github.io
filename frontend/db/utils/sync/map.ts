export function* map<A, B>(fn: (a: A) => B, iterable: Iterable<A>): IterableIterator<B> {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    yield fn(value);
  }
}
