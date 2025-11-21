import fs from "node:fs/promises";
import { join } from "node:path";
import { beforeEach, bench, describe } from "vitest";
import { Post } from "../../db/blog/Posts";
import { JsonPostFrontMatterSchema } from "../../db/blog/Schema";

describe("블로그 포스트 로딩 성능 비교", () => {
	beforeEach(() => {
		Post.resetInstance();

		if (global.gc) {
			global.gc();
		}
	});

	describe("소규모 포스트 약 100개 미만", () => {
		bench(
			"Streaming 방식으로 읽어오는 경우",
			async () => {
				const post = Post.getInstance();
				await post.createProcessedFrontMatter(".");
			},
			{
				time: 5000,
				iterations: 10,
				warmupIterations: 2,
			},
		);

		bench(
			"Build시 작성된 JSON 파일을 읽어오는 경우",
			async () => {
				const post = Post.getInstance();
				const jsonPath = join(
					process.cwd(),
					"frontend",
					"public",
					"posts.json",
				);
				const jsonData = await post.processor.processFile(jsonPath);
				if (!jsonData) {
					throw new Error(`posts.json 파일을 찾을 수 없습니다: ${jsonPath}`);
				}
				if (!jsonData.content) {
					throw new Error(`posts.json 파일에 content가 없습니다: ${jsonPath}`);
				}
				const json = JSON.parse(jsonData.content) as unknown;
				const parsedJsonFrontMatter = JsonPostFrontMatterSchema.safeParse(json);
				if (!parsedJsonFrontMatter.success) {
					console.error(parsedJsonFrontMatter.error);
					throw new Error(
						`posts.json 파일의 형식이 잘못되었습니다: ${jsonPath}`,
					);
				}
			},
			{
				time: 5000,
				iterations: 10,
				warmupIterations: 2,
			},
		);

		bench("Fs 모듈을 사용하여 직접 파일을 읽는 경우", async () => {
			const jsonPath = join(process.cwd(), "frontend", "public", "posts.json");

			try {
				const fileContent = await fs.readFile(jsonPath, "utf8");
				const json = JSON.parse(fileContent) as unknown;

				const parsedJsonFrontMatter = JsonPostFrontMatterSchema.safeParse(json);
				if (!parsedJsonFrontMatter.success) {
					console.error(parsedJsonFrontMatter.error);
					throw new Error(
						`posts.json 파일의 형식이 잘못되었습니다: ${jsonPath}`,
					);
				}
			} catch (error) {
				console.error(error);
				throw new Error(
					`posts.json 파일을 처리하는 중 오류가 발생했습니다: ${jsonPath}`,
				);
			}
		});
	});
});
