import { take } from "./take";

export function* chunk<A>(size: number, iterable: Iterable<A>) {
	const iterator = iterable[Symbol.iterator]();
	while (true) {
		const arr = [
			...take(size, {
				[Symbol.iterator]() {
					return iterator;
				},
			}),
		];
		if (arr.length) yield arr;
		if (arr.length < size) break;
	}
}
