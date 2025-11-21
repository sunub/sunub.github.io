import { isIterable } from "./utils/isIterable";

function* takeSync<T>(limit: number, iterable: Iterable<T>) {
	const iterator = iterable[Symbol.iterator]();
	while (true) {
		const { done, value } = iterator.next();
		if (done) {
			break;
		}
		yield value;
		if (limit-- === 0) break;
	}
}

async function* takeAsync<T>(limit: number, iterable: AsyncIterable<T>) {
	const iterator = iterable[Symbol.asyncIterator]();
	while (true) {
		const { done, value } = await iterator.next();
		if (done) {
			break;
		}
		yield value;
		if (limit-- === 0) break;
	}
}

export function take<T>(
	limit: number,
	iterable: Iterable<T>,
): IterableIterator<T>;

export function take<T>(
	limit: number,
	iterable: AsyncIterable<T>,
): AsyncIterableIterator<T>;

export function take<T>(
	limit: number,
	iterable: Iterable<T> | AsyncIterable<T>,
): IterableIterator<T> | AsyncIterableIterator<T> {
	return isIterable(iterable)
		? takeSync(limit, iterable)
		: takeAsync(limit, iterable);
}
