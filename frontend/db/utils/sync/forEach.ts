export function* forEach<A, B>(fn: (a: A) => B, iterable: Iterable<A>) {
	for (const a of iterable) {
		yield fn(a);
	}
}
