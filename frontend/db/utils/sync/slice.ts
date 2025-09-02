export function* slice<A>(start: number, end: number, iterable: Iterable<A>): Iterable<A> {
  const iterator = iterable[Symbol.iterator]();
  let index = 0;
  while (index < start) {
    if (iterator.next().done) {
      return;
    }
    index++;
  }
  while (index < end) {
    const { done, value } = iterator.next();
    if (done) {
      return;
    }
    yield value;
    index++;
  }
}
