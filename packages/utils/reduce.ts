import { isAsyncIterable } from "./utils/isAsyncIterable";
import { isIterable } from "./utils/isIterable";

function reduceBase<A, Acc>(
	fn: (acc: Acc, a: A) => Acc,
	acc: Acc,
	iterable: Iterable<A>,
): Acc {
	for (const a of iterable) {
		acc = fn(acc, a);
	}
	return acc;
}

async function reduceBaseAsync<A, Acc>(
	fn: (acc: Acc, a: A) => Acc | Promise<Acc>,
	acc: Acc,
	asyncIterable: AsyncIterable<A>,
): Promise<Acc> {
	for await (const a of asyncIterable) {
		acc = await fn(acc, a);
	}
	return acc;
}

// export function reduce<A, Acc>(fn: (acc: Acc, a: A) => Acc, acc: Acc, iterator: Iterable<A>): IterableIterator<Acc>;

// export function reduce<A, Acc>(
//   fn: (acc: Acc | A, a: A) => Acc,
//   accOrIterable: Iterable<A> | Acc,
//   iterator: Iterable<A>
// ): IterableIterator<Acc>;

// export function reduce<A, Acc>(fn: (acc: Acc | A, a: A) => Acc, iterator: Iterable<A>): IterableIterator<Acc>;

// export function reduce<A, Acc>(
//   fn: (acc: Acc, a: A) => Acc | Promise<Acc>,
//   iterator: AsyncIterable<A>
// ): AsyncIterableIterator<Awaited<Acc>>;

// export function reduce<A, Acc>(
//   fn: (acc: Promise<Acc> | A, a: A) => Acc | Promise<Acc>,
//   accOrIterable: AsyncIterable<A> | Acc,
//   iterator: AsyncIterable<A>
// ): AsyncIterableIterator<Awaited<Acc>>;

export function reduce<A, Acc>(
	fn: (acc: Acc, a: A) => Acc,
	acc: Acc,
	iterator: Iterable<A>,
): IterableIterator<Acc>;

export function reduce<A, Acc>(
	fn: (acc: Acc, a: A) => Acc,
	iterator: Iterable<A>,
): IterableIterator<Acc>;

export function reduce<A, Acc>(
	fn: (acc: Acc, a: A) => Acc | Promise<Acc>,
	iterator: AsyncIterable<A>,
): AsyncIterableIterator<Awaited<Acc>>;

export function reduce<A, Acc>(
	fn: (acc: Acc, a: A) => Acc | Promise<Acc>,
	acc: Acc,
	iterator: AsyncIterable<A>,
): AsyncIterableIterator<Awaited<Acc>>;

export function reduce<A, Acc>(
	fn: (acc: Acc | A, a: A) => Acc | Promise<Acc>,
	accOrIterable: Acc | Iterable<A> | AsyncIterable<A>,
	iterable?: Iterable<A> | AsyncIterable<A>,
) {
	if (iterable === undefined) {
		if (!isIterable(accOrIterable) && !isAsyncIterable(accOrIterable)) {
			throw new TypeError(
				"인자로 Iterable 또는 AsyncIterable을 제공해야 합니다.",
			);
		}
		if (isIterable(accOrIterable)) {
			return reduceBase(fn as (acc: Acc, a: A) => Acc, 0 as Acc, accOrIterable);
		}
	} else {
		return isIterable(iterable)
			? reduceBase(
					fn as (acc: Acc, a: A) => Acc,
					accOrIterable as Acc,
					iterable,
				)
			: reduceBaseAsync(fn, accOrIterable as Acc, iterable as AsyncIterable<A>);
	}
}
