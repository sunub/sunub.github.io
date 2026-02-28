export function isIterable<T>(a: unknown): a is Iterable<T> {
	const isObject = typeof a === "object" && a !== null;
	const hasIterable =
		isObject &&
		typeof (a as { [Symbol.iterator]?: unknown })[Symbol.iterator] ===
			"function";

	return hasIterable;
}
