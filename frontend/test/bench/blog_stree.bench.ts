import { beforeEach, bench, describe } from "vitest";
import { Post } from "../../db/blog/Posts";

describe("대규모 포스트 약 10000개", () => {
	beforeEach(() => {
		Post.resetInstance();
		if (global.gc) {
			global.gc();
		}
	});
	bench(
		"Streaming 방식으로 읽어오는 경우",
		async () => {
			const post = Post.getInstance();
			await post.createProcessedFrontMatter(".", "tmp");
		},
		{
			time: 10000,
			iterations: 3,
			warmupIterations: 1,
		},
	);
});
