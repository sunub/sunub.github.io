import { describe, expect, it } from "vitest";
import { take } from "./take";

async function collectAsync<T>(iterable: AsyncIterable<T>) {
	const values: T[] = [];

	for await (const value of iterable) {
		values.push(value);
	}

	return values;
}

describe("take", () => {
	it("returns exactly the requested number of items for sync iterables", () => {
		expect([...take(5, [1, 2, 3, 4, 5, 6, 7])]).toEqual([1, 2, 3, 4, 5]);
	});

	it("returns an empty iterable when limit is 0", () => {
		expect([...take(0, [1, 2, 3])]).toEqual([]);
	});

	it("returns exactly the requested number of items for async iterables", async () => {
		async function* source() {
			for (const value of [1, 2, 3, 4, 5, 6, 7]) {
				yield value;
			}
		}

		await expect(collectAsync(take(5, source()))).resolves.toEqual([
			1, 2, 3, 4, 5,
		]);
	});
});
