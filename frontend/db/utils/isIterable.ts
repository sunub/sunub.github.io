export function isIterable<T>(value: unknown): value is Iterable<T> {
	return (
		value != null &&
		typeof (value as Iterable<T>)[Symbol.iterator] === "function"
	);
}
