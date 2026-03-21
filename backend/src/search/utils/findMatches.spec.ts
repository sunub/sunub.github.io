import { findMatches } from "./findMatches";

describe("findMatches", () => {
	it("should support Korean initial consonant matching", () => {
		expect(findMatches("ㄱ", "그래프")).toEqual(["그"]);
	});

	it("should support loose Korean syllable matching on the final character", () => {
		expect(findMatches("가", "각")).toEqual(["각"]);
	});

	it("should stop collecting matches when the limit is reached", () => {
		expect(findMatches("a", "banana", { limit: 2 })).toEqual(["a", "a"]);
	});
});
