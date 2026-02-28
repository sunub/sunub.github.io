export function isPromise<T>(a: T): boolean {
	if (a instanceof Promise) {
		return true;
	}

	if (
		a !== null &&
		typeof a === "object" &&
		typeof (a as { then?: unknown; catch?: unknown }).then === "function" &&
		typeof (a as { then?: unknown; catch?: unknown }).catch === "function"
	) {
		return true;
	}

	return false;
}
