export async function fromAsync<T>(
	iterable: Iterable<Promise<T>> | AsyncIterable<T>,
) {
	const arr: T[] = [];
	for await (const a of iterable) {
		arr.push(a);
	}
	return arr;
}
