import { filter } from "./filter";

export function* find<A>(fn: (a: A) => boolean, iterable: Iterable<A>) {
  return filter(fn, iterable);
}
