import fs from "node:fs/promises";
import { join } from "node:path";
import { beforeEach, bench, describe } from "vitest";
import postsGenerated from "../../src/generated/posts.generated.json";

describe("블로그 포스트 로딩 성능 비교", () => {
	beforeEach(() => {
		if (global.gc) {
			global.gc();
		}
	});

	bench(
		"메모리 객체를 JSON 문자열로 변환/파싱하는 경우",
		async () => {
			const raw = JSON.stringify(postsGenerated);
			const parsed = JSON.parse(raw);
			if (!parsed?.all?.length) {
				throw new Error("posts.generated.json 데이터가 비어 있습니다.");
			}
		},
		{
			time: 5000,
			iterations: 10,
			warmupIterations: 2,
		},
	);

	bench(
		"파일에서 posts.generated.json을 읽고 파싱하는 경우",
		async () => {
			const jsonPath = join(
				process.cwd(),
				"frontend",
				"src",
				"generated",
				"posts.generated.json",
			);
			const fileContent = await fs.readFile(jsonPath, "utf8");
			const parsed = JSON.parse(fileContent);
			if (!parsed?.all?.length) {
				throw new Error("posts.generated.json 파일 내용이 비어 있습니다.");
			}
		},
		{
			time: 5000,
			iterations: 10,
			warmupIterations: 2,
		},
	);
});
