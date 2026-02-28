import { join } from "node:path";
import { readdir, readFile } from "node:fs/promises";
import { Test, TestingModule } from "@nestjs/testing";
import { BlogService } from "../../src/instances/blog/blog.service";
import { PostsService } from "../../src/posts/posts.service";
import * as matter from "gray-matter";

interface BenchPost {
	frontmatter: {
		date: string | number | Date;
	};
	filePath: string;
}

// ==========================================
// Native / Eager Implementation for Comparison
// ==========================================
class NativeBlogService {
	public posts: BenchPost[] = [];

	constructor(private rootPath: string) {}

	async buildIndex() {
		this.posts = [];
		const files = await this.getFiles(this.rootPath);

		// Eagerly process all files (Naively) using Promise.all
		// To prevent instant crash on 500k files, we chunk it slightly, but keep it "Eager" in spirit
		// relative to the "Streaming/Lazy" approach.
		const chunkSize = 5000;
		for (let i = 0; i < files.length; i += chunkSize) {
			const chunk = files.slice(i, i + chunkSize);
			await Promise.all(
				chunk.map(async (file) => {
					const content = await readFile(file, "utf-8");
					// Naive parsing: Reads full content just to get frontmatter (inefficient memory)
					const parsed = matter(content);
					this.posts.push({
						frontmatter: parsed.data,
						filePath: file,
					});
				}),
			);
		}
	}

	// Faster recursive file search (Native)
	private async getFiles(dir: string): Promise<string[]> {
		const dirents = await readdir(dir, { withFileTypes: true });
		const files = await Promise.all(
			dirents.map((dirent) => {
				const res = join(dir, dirent.name);
				return dirent.isDirectory() ? this.getFiles(res) : res;
			}),
		);
		return Array.prototype
			.concat(...files)
			.filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
	}

	findAll() {
		return this.posts;
	}

	findLatest(count: number) {
		// Standard array sort and slice
		return this.posts
			.sort(
				(a, b) =>
					new Date(b.frontmatter.date).getTime() -
					new Date(a.frontmatter.date).getTime(),
			)
			.slice(0, count);
	}
}

// ==========================================
// Benchmark Suite
// ==========================================
describe("PostsService Benchmark: Lazy (User) vs Eager (Native)", () => {
	let postsService: PostsService;
	let blogService: BlogService;
	let nativeService: NativeBlogService;

	const BENCH_POSTS_PATH = join(process.cwd(), "test/bench/tmp/posts");

	beforeAll(async () => {
		process.env.BLOG_POSTS_PATH = BENCH_POSTS_PATH;

		const module: TestingModule = await Test.createTestingModule({
			providers: [BlogService, PostsService],
		}).compile();

		blogService = module.get<BlogService>(BlogService);
		postsService = module.get<PostsService>(PostsService);
		nativeService = new NativeBlogService(BENCH_POSTS_PATH);

		jest.spyOn(blogService.logger, "log").mockImplementation(() => {});
		jest.spyOn(blogService.logger, "warn").mockImplementation(() => {});
	});

	afterAll(async () => {
		// Cleanup DISABLED for manual inspection if needed, or re-enable:
		// await rmdir(BENCH_POSTS_PATH, { recursive: true });
		delete process.env.BLOG_POSTS_PATH;
	});

	const getMemory = () => {
		if (global.gc) global.gc();
		return process.memoryUsage().heapUsed / 1024 / 1024;
	};

	it("Comparison: Initial Index Building (Cold Start)", async () => {
		console.log("\n[Benchmark] Index Building (Cold Start)...");

		// 1. measure Lazy/User Logic (BlogService)
		// It builds index from files if jsonl doesn't exist.
		// We simulate this by ensuring jsonl might NOT exist or forcing rebuild logic if exposed,
		// but blogService.onModuleInit() checks for it.
		// We will test `buildIndexFromFiles` directly for fair comparison.

		const startMemLazy = getMemory();
		const startLazy = performance.now();
		await blogService.buildIndexFromFiles();
		// Note: blogService writes to posts.jsonl, but also loads to memory?
		// Actually onModuleInit does the loading. buildIndexFromFiles just writes disk.
		// So we should measure `buildIndexFromFiles` (Disk I/O + Parsing) AND `onModuleInit` (Loading).
		// Let's just measure `onModuleInit` assuming no index exists for the first run?
		// To be precise, let's measure `buildIndexFromFiles` as "Indexing Task".
		const endLazy = performance.now();
		const endMemLazy = getMemory();

		console.log(
			`[User Logic] Index Build Time: ${(endLazy - startLazy).toFixed(2)}ms`,
		);
		console.log(
			`[User Logic] Memory Delta: ${(endMemLazy - startMemLazy).toFixed(2)} MB`,
		);

		// 2. Measure Native/Eager Logic
		if (global.gc) global.gc();
		const startMemNative = getMemory();
		const startNative = performance.now();
		await nativeService.buildIndex();
		const endNative = performance.now();
		const endMemNative = getMemory();

		console.log(
			`[Native Logic] Index Build Time: ${(endNative - startNative).toFixed(2)}ms`,
		);
		console.log(
			`[Native Logic] Memory Delta: ${(endMemNative - startMemNative).toFixed(2)} MB`,
		);
	}, 600000); // 10 min timeout for 500k files

	it("Comparison: Querying (Find Latest 100)", async () => {
		// Ensure both are ready (reload blogService from the index we just built)
		await blogService.onModuleInit();

		console.log("\n[Benchmark] Find Latest 100...");

		// User Logic
		const startLazy = performance.now();
		await postsService.findLatest(100);
		const endLazy = performance.now();

		// Native Logic
		const startNative = performance.now();
		const nativeRes = nativeService.findLatest(100);
		if (nativeRes.length === 0) throw new Error("Native empty");
		const endNative = performance.now();

		console.log(
			`[User Logic] Query Time: ${(endLazy - startLazy).toFixed(2)}ms`,
		);
		console.log(
			`[Native Logic] Query Time: ${(endNative - startNative).toFixed(2)}ms`,
		);
	});
});
