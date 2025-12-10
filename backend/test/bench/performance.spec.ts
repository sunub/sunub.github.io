import { constants } from "node:fs";
import { access, readFile, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Test, TestingModule } from "@nestjs/testing";
import { BlogService } from "../../src/instances/blog/blog.service";

describe("BlogService Performance Benchmark", () => {
	let service: BlogService;
	const POSTS_DIR = join(process.cwd(), "../posts");
	const MOCK_DB_PATH = join(POSTS_DIR, "posts.jsonl");
	const ORIGINAL_DB_PATH = join(POSTS_DIR, "posts.jsonl.bak");

	const TARGET_COUNT = 10000;
	const DUMMY_DATA = Array.from({ length: TARGET_COUNT }, (_, i) => ({
		frontmatter: {
			title: `Post ${i}`,
			date: new Date().toISOString(),
			category: "code",
			slug: `post-${i}`,
		},
		filePath: `/path/to/post-${i}.mdx`,
	}))
		.map((p) => JSON.stringify(p))
		.join("\n");

	beforeAll(async () => {
		try {
			await access(MOCK_DB_PATH, constants.F_OK);
			const existing = await readFile(MOCK_DB_PATH, "utf-8");
			await writeFile(ORIGINAL_DB_PATH, existing);
		} catch (_e) {}

		await writeFile(MOCK_DB_PATH, DUMMY_DATA);

		const module: TestingModule = await Test.createTestingModule({
			providers: [BlogService],
		}).compile();

		service = module.get<BlogService>(BlogService);
		// Suppress logs
		jest.spyOn(service.logger, "log").mockImplementation(() => {});
		jest.spyOn(service.logger, "warn").mockImplementation(() => {});
		await service.onModuleInit();
	});

	afterAll(async () => {
		try {
			await unlink(MOCK_DB_PATH);
			try {
				await access(ORIGINAL_DB_PATH, constants.F_OK);
				const backup = await readFile(ORIGINAL_DB_PATH, "utf-8");
				await writeFile(MOCK_DB_PATH, backup);
				await unlink(ORIGINAL_DB_PATH);
			} catch {}
		} catch (_e) {}
	});

	it("should compare Lazy vs Eager evaluation speed", async () => {
		const FETCH_COUNT = 10;

		// 1. Measure Lazy Evaluation (Current Implementation)
		const startLazy = process.hrtime.bigint();
		const lazyResult = await service.getLatestPosts(FETCH_COUNT);
		const endLazy = process.hrtime.bigint();
		const lazyTime = Number(endLazy - startLazy) / 1e6; // ms

		// 2. Measure Eager Evaluation (Simulation of Old Way)
		const startEager = process.hrtime.bigint();
		const fileContent = await readFile(MOCK_DB_PATH, "utf-8");
		const allPosts = fileContent
			.split("\n")
			.filter((line) => line.trim())
			.map((line) => JSON.parse(line));
		const eagerResult = allPosts.slice(0, FETCH_COUNT);
		const endEager = process.hrtime.bigint();
		const eagerTime = Number(endEager - startEager) / 1e6; // ms

		console.log("\n=================================================");
		console.log(
			`Benchmark Results (N=${TARGET_COUNT} posts, Fetch=${FETCH_COUNT})`,
		);
		console.log("=================================================");
		console.log(`Lazy Evaluation (New): ${lazyTime.toFixed(4)} ms`);
		console.log(`Eager Evaluation (Old): ${eagerTime.toFixed(4)} ms`);
		console.log(`Improvement: ${(eagerTime / lazyTime).toFixed(2)}x faster`);
		console.log("=================================================\n");

		expect(lazyResult.length).toBe(FETCH_COUNT);
		expect(eagerResult.length).toBe(FETCH_COUNT);
		expect(lazyTime).toBeLessThan(eagerTime);
	});
});
