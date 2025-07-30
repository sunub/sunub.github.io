export function* filter<A>(fn: (a: A) => boolean, iterable: Iterable<A>) {
  const iterator = iterable[Symbol.iterator]();
  while (true) {
    const { done, value } = iterator.next();
    if (done) break;
    if (fn(value)) {
      yield value;
    }
  }
}
