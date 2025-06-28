import { filter } from "./sync/filter";
import { map } from "./sync/map";
import { reduce as baseReduce } from "./sync/reduce";
import { take } from "./sync/take";
import { chunk } from "./sync/chunk";
import { slice } from "./sync/slice";

class FxIterable<A> {
  private _iterator?: Iterator<A> | null = null;
  constructor(private iterable: Iterable<A>) {}

  [Symbol.iterator](): FxIterable<A> {
    return this;
  }

  chunk(size: number) {
    return fx(chunk(size, this));
  }

  next(): IteratorResult<A> {
    if (!this._iterator) {
      this._iterator = this.iterable[Symbol.iterator]();
    }
    return this._iterator.next();
  }

  map<B>(fn: (a: A) => B): FxIterable<B> {
    return fx(map(fn, this));
  }

  reduce<Acc>(fn: (acc: Acc, a: A) => Acc, acc: Acc): Acc;

  reduce<Acc>(fn: (acc: A, a: A) => Acc): Acc;

  reduce<Acc>(fn: (acc: Acc | A, a: A) => Acc, acc?: Acc) {
    return acc ? baseReduce(fn, acc, this) : baseReduce(fn, this);
  }

  filter(fn: (a: A) => boolean) {
    return fx(filter(fn, this));
  }

  take(limit: number) {
    return fx(take(limit, this));
  }

  to<R>(converter: (iterable: this) => R): R {
    return converter(this);
  }

  chain<B>(fn: (iterable: this) => Iterable<B>): FxIterable<B> {
    return fx(fn(this));
  }

  toArray() {
    return [...this];
  }

  slice(start: number, end: number) {
    return fx(slice(start, end, this));
  }
}

export function fx<A>(iterable: Iterable<A>) {
  return new FxIterable<A>(iterable);
}
