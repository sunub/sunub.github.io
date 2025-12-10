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

	it("should compare Lazy vs Eager evaluation across multiple fetch sizes", async () => {
		const FETCH_COUNTS = [10, 100, 1000, 5000, 10000];
		
		// Helper to measure memory
		const getMemoryUsage = () => {
			if (global.gc) global.gc();
			return process.memoryUsage().heapUsed / 1024 / 1024; // MB
		};

		console.log("\n========================================================================================");
		console.log(`Benchmark Results (Total Posts: ${TARGET_COUNT})`);
		console.log("========================================================================================");
		console.log("| Fetch Count | Lazy Time (ms) | Eager Time (ms) | Speedup (x) | Lazy Mem (MB) | Eager Mem (MB) | Mem Reduction (x) |");
		console.log("|------------:|---------------:|----------------:|------------:|--------------:|---------------:|------------------:|");

		for (const count of FETCH_COUNTS) {
			// Force GC before each run to get clean baseline
			if (global.gc) global.gc();

			// 1. Measure Lazy Evaluation
			const startMemLazy = getMemoryUsage();
			const startLazy = process.hrtime.bigint();
			const lazyResult = await service.getLatestPosts(count);
			const endLazy = process.hrtime.bigint();
			const endMemLazy = getMemoryUsage();
			
			const lazyTime = Number(endLazy - startLazy) / 1e6;
			const lazyMemory = Math.max(0, endMemLazy - startMemLazy);

			// Force GC between tests
			if (global.gc) global.gc();

			// 2. Measure Eager Evaluation
			const startMemEager = getMemoryUsage();
			const startEager = process.hrtime.bigint();
			// Simulate old way: read all, parse all, then slice
			const fileContent = await readFile(MOCK_DB_PATH, "utf-8");
			const allPosts = fileContent
				.split("\n")
				.filter((line) => line.trim())
				.map((line) => JSON.parse(line));
			const eagerResult = allPosts.slice(0, count);
			const endEager = process.hrtime.bigint();
			const endMemEager = getMemoryUsage();

			const eagerTime = Number(endEager - startEager) / 1e6;
			const eagerMemory = Math.max(0, endMemEager - startMemEager);

			const speedup = (eagerTime / lazyTime).toFixed(2);
			const memReduction = (eagerMemory / (lazyMemory || 0.0001)).toFixed(2);

			console.log(
				`| ${count.toString().padEnd(11)} | ${lazyTime.toFixed(4).padStart(14)} | ${eagerTime.toFixed(4).padStart(15)} | ${speedup.padStart(11)} | ${lazyMemory.toFixed(4).padStart(13)} | ${eagerMemory.toFixed(4).padStart(14)} | ${memReduction.padStart(17)} |`
			);

			expect(lazyResult.length).toBe(count);
			expect(eagerResult.length).toBe(count);
			
			// Lazy should generally be faster for smaller subsets
			if (count < 5000) {
				expect(lazyTime).toBeLessThan(eagerTime);
			}
		}
		console.log("========================================================================================\n");
	});
});
