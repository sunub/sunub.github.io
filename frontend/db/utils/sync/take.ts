export function* take<A>(limit: number, iterable: Iterable<A>) {
	const iterator = iterable[Symbol.iterator]();
	while (true) {
		const { done, value } = iterator.next();
		if (done) break;
		yield value;
		if (--limit === 0) break;
	}
}
