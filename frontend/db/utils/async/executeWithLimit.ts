import { fromAsync } from './fromAsync';
import { fx } from '../fx';

export function executeWithLimit<A>(limit: number, iterable: Iterable<() => Promise<A>>) {
  return fx(iterable)
    .chunk(limit)
    .map(fs => fs.map(fn => fn()))
    .map(fa => Promise.all(fa))
    .to(fromAsync)
    .then(iterable => iterable.flat());
}
