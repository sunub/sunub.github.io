import fs from "node:fs";
import { resolve } from "node:path";
import { beforeEach, bench, describe } from "vitest";

const resolvePostsIndexPath = () => {
	const candidates = [
		resolve(process.cwd(), "../posts/posts.jsonl"),
		resolve(process.cwd(), "posts/posts.jsonl"),
	];

	return (
		candidates.find((candidate) => fs.existsSync(candidate)) ?? candidates[0]
	);
};

const POSTS_FROM_INDEX = fs
	.readFileSync(resolvePostsIndexPath(), "utf8")
	.split("\n")
	.filter((line) => line.trim().length > 0)
	.map((line) => JSON.parse(line));

describe("대규모 포스트 약 10000개", () => {
	beforeEach(() => {
		if (global.gc) {
			global.gc();
		}
	});

	bench(
		"포스트 카테고리별 집계 처리",
		async () => {
			const categories = POSTS_FROM_INDEX.reduce(
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
