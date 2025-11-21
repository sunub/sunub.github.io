export async function* toAsync<T>(
	iterable: Iterable<T | Promise<T>>,
): AsyncIterableIterator<Awaited<T>> {
	for await (const v of iterable) {
		yield v;
	}
}
