import { beforeEach, bench, describe } from "vitest";
import postsGenerated from "../../src/generated/posts.generated.json";

describe("대규모 포스트 약 10000개", () => {
	beforeEach(() => {
		if (global.gc) {
			global.gc();
		}
	});

	bench(
		"포스트 카테고리별 집계 처리",
		async () => {
			const categories = postsGenerated.all.reduce(
				(acc, item) => {
					const category = item.frontmatter.category;
					acc[category] = (acc[category] ?? 0) + 1;
					return acc;
				},
				{} as Record<string, number>,
			);
			if (
				categories.web +
					categories.code +
					categories.cs +
					categories.algorithm <
				1
			) {
				throw new Error("카테고리 집계 결과가 비어 있습니다.");
			}
		},
		{
			time: 10000,
			iterations: 3,
			warmupIterations: 1,
		},
	);
});
