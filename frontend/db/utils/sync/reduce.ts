function baseReduce<A, Acc>(
	fn: (a: Acc, b: A) => Acc,
	acc: Acc,
	iterator: Iterator<A>,
): Acc {
	while (true) {
		const { done, value } = iterator.next();
		if (done) break;
		acc = fn(acc, value);
	}
	return acc;
}

function reduce<A, Acc>(fn: (a: A, b: A) => Acc, iterable: Iterable<A>): Acc;

function reduce<A, Acc>(
	fn: (acc: Acc | A, b: A) => Acc,
	acc: Acc,
	iterable?: Iterable<A>,
): Acc;

function reduce<A, Acc>(
	fn: (a: Acc | A, b: A) => Acc,
	accOrIterable: Acc | Iterable<A>,
	iterable?: Iterable<A>,
) {
	if (iterable === undefined) {
		const iterator = (accOrIterable as Iterable<A>)[Symbol.iterator]();
		const { done, value } = iterator.next();
		if (done) {
			throw TypeError(
				"인자가 2개일 경우에 2번째 인자에는 Iterable 이 주어져야 합니다.",
			);
		}
		return baseReduce(fn, value, iterator);
	} else {
		return baseReduce(fn, accOrIterable as Acc, iterable[Symbol.iterator]());
	}
}

export { reduce };
