export function range(length: number): IterableIterator<number>;

export function range(start: number, end: number): IterableIterator<number>;

export function range(
	start: number,
	end: number,
	step: number,
): IterableIterator<number>;

export function* range(
	start: number,
	end?: number,
	step = 1,
): IterableIterator<number> {
	if (end === undefined) return yield* range(0, start);
	if (step < 0) {
		while (start > end) {
			yield start;
			start += step;
		}
	} else {
		while (start < end) {
			yield start;
			start += step;
		}
	}
}
