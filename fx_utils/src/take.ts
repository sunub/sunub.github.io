import { isIterable } from "./utils/isIterable";

function* takeSync<T>(limit: number, iterable: Iterable<T>) {
	const iterator = iterable[Symbol.iterator]();
	while (limit-- > 0) {
		const { done, value } = iterator.next();
		if (done) {
			break;
		}
		yield value;
	}
}

async function* takeAsync<T>(limit: number, iterable: AsyncIterable<T>) {
	const iterator = iterable[Symbol.asyncIterator]();
	while (limit-- > 0) {
		const { done, value } = await iterator.next();
		if (done) {
			break;
		}
		yield value;
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
