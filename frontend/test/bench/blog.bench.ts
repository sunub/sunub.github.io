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

const POSTS_INDEX_PATH = resolvePostsIndexPath();
const POSTS_INDEX_LINES = fs
	.readFileSync(POSTS_INDEX_PATH, "utf8")
	.split("\n")
	.filter((line) => line.trim().length > 0);
const POSTS_FROM_INDEX = POSTS_INDEX_LINES.map((line) => JSON.parse(line));

describe("블로그 포스트 로딩 성능 비교", () => {
	beforeEach(() => {
		if (global.gc) {
			global.gc();
		}
	});

	bench(
		"메모리에 적재된 posts.jsonl 결과를 범위로 잘라 쓰는 경우",
		async () => {
			const parsed = POSTS_FROM_INDEX.slice(0, 10);
			if (!parsed.length) {
				throw new Error("posts.jsonl 메모리 데이터가 비어 있습니다.");
			}
		},
		{
			time: 5000,
			iterations: 10,
			warmupIterations: 2,
		},
	);

	bench(
		"파일에서 posts.jsonl을 읽고 파싱하는 경우",
		async () => {
			const fileContent = await fs.promises.readFile(POSTS_INDEX_PATH, "utf8");
			const parsed = fileContent
				.split("\n")
				.filter((line) => line.trim().length > 0)
				.map((line) => JSON.parse(line));
			if (!parsed.length) {
				throw new Error("posts.jsonl 파일 내용이 비어 있습니다.");
			}
		},
		{
			time: 5000,
			iterations: 10,
			warmupIterations: 2,
		},
	);
});
