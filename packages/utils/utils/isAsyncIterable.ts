export function isAsyncIterable<T>(a: unknown): a is AsyncIterable<T> {
	const isObject = typeof a === "object" && a !== null;
	const hasAsyncIterator =
		isObject &&
		typeof (a as { [Symbol.asyncIterator]?: unknown })[Symbol.asyncIterator] ===
			"function";

	return hasAsyncIterator;
}
