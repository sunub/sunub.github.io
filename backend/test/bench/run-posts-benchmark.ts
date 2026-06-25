import { constants } from "node:fs";
import {
	access,
	readdir,
	readFile,
	stat,
	unlink,
	writeFile,
} from "node:fs/promises";
import { cpus } from "node:os";
import { join, resolve } from "node:path";
import { performance } from "node:perf_hooks";
import { FrontMatterSchema, type PostFrontMatter } from "@sunub/types";
import * as matter from "gray-matter";
import { BlogService } from "../../src/instances/blog/blog.service";

type MemorySnapshot = {
	rssMb: number;
	heapUsedMb: number;
	externalMb: number;
	arrayBuffersMb: number;
};

type DatasetInfo = {
	fileCount: number;
	totalFileBytes: number;
	averageFileBytes: number;
};

type ScenarioValue = {
	postCount: number;
	outputBytes: number;
};

type ScenarioResult = {
	label: string;
	durationMs: number;
	start: MemorySnapshot;
	peak: MemorySnapshot;
	end: MemorySnapshot;
	peakRssDeltaMb: number;
	peakHeapDeltaMb: number;
	endRssDeltaMb: number;
	endHeapDeltaMb: number;
	value: ScenarioValue;
};

const POSTS_ROOT = resolve(process.cwd(), "test/bench/tmp/posts");
const STREAM_INDEX_PATH = join(POSTS_ROOT, "posts.jsonl");
const EAGER_INDEX_PATH = join(POSTS_ROOT, "posts.eager.jsonl");
const SAMPLE_INTERVAL_MS = 20;

const toMb = (bytes: number) => bytes / 1024 / 1024;
const round = (value: number) => Number(value.toFixed(2));

function sampleMemory(): MemorySnapshot {
	const usage = process.memoryUsage();
	return {
		rssMb: round(toMb(usage.rss)),
		heapUsedMb: round(toMb(usage.heapUsed)),
		externalMb: round(toMb(usage.external)),
		arrayBuffersMb: round(toMb(usage.arrayBuffers)),
	};
}

function getPeakSnapshot(
	currentPeak: MemorySnapshot,
	next: MemorySnapshot,
): MemorySnapshot {
	return {
		rssMb: Math.max(currentPeak.rssMb, next.rssMb),
		heapUsedMb: Math.max(currentPeak.heapUsedMb, next.heapUsedMb),
		externalMb: Math.max(currentPeak.externalMb, next.externalMb),
		arrayBuffersMb: Math.max(currentPeak.arrayBuffersMb, next.arrayBuffersMb),
	};
}

async function collectMarkdownFiles(dirPath: string): Promise<string[]> {
	const entries = await readdir(dirPath, { withFileTypes: true });
	const files: string[] = [];

	for (const entry of entries) {
		const fullPath = join(dirPath, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await collectMarkdownFiles(fullPath)));
			continue;
		}

		if (
			entry.isFile() &&
			(fullPath.endsWith(".md") || fullPath.endsWith(".mdx"))
		) {
			files.push(fullPath);
		}
	}

	return files;
}

async function inspectDataset(files: string[]): Promise<DatasetInfo> {
	let totalFileBytes = 0;
	for (const filePath of files) {
		totalFileBytes += (await stat(filePath)).size;
	}

	return {
		fileCount: files.length,
		totalFileBytes,
		averageFileBytes: files.length === 0 ? 0 : totalFileBytes / files.length,
	};
}

async function removeFileIfExists(filePath: string) {
	try {
		await unlink(filePath);
	} catch (error) {
		const fsError = error as NodeJS.ErrnoException;
		if (fsError.code !== "ENOENT") {
			throw error;
		}
	}
}

async function measureScenario(
	label: string,
	run: () => Promise<ScenarioValue>,
): Promise<ScenarioResult> {
	if (typeof global.gc === "function") {
		global.gc();
	}

	const start = sampleMemory();
	let peak = start;
	const startedAt = performance.now();

	const sampler = setInterval(() => {
		peak = getPeakSnapshot(peak, sampleMemory());
	}, SAMPLE_INTERVAL_MS);
	sampler.unref?.();

	try {
		const value = await run();
		peak = getPeakSnapshot(peak, sampleMemory());

		if (typeof global.gc === "function") {
			global.gc();
		}

		const end = sampleMemory();

		return {
			label,
			durationMs: round(performance.now() - startedAt),
			start,
			peak,
			end,
			peakRssDeltaMb: round(peak.rssMb - start.rssMb),
			peakHeapDeltaMb: round(peak.heapUsedMb - start.heapUsedMb),
			endRssDeltaMb: round(end.rssMb - start.rssMb),
			endHeapDeltaMb: round(end.heapUsedMb - start.heapUsedMb),
			value,
		};
	} finally {
		clearInterval(sampler);
	}
}

async function buildIndexEager(postsRoot: string): Promise<ScenarioValue> {
	const files = await collectMarkdownFiles(postsRoot);
	const parsedPosts = await Promise.all(
		files.map(async (filePath) => {
			const fileContent = await readFile(filePath, "utf-8");
			const parsed = matter(fileContent);
			const validation = FrontMatterSchema.safeParse(parsed.data);

			if (!validation.success) {
				throw new Error(`Invalid front matter in ${filePath}`);
			}

			const post: PostFrontMatter = {
				frontmatter: validation.data,
				filePath,
			};
			return post;
		}),
	);

	const sortedPosts = parsedPosts.sort((a, b) =>
		a.frontmatter.date > b.frontmatter.date ? -1 : 1,
	);
	const serialized = sortedPosts.map((post) => JSON.stringify(post)).join("\n");
	await writeFile(EAGER_INDEX_PATH, serialized);

	return {
		postCount: sortedPosts.length,
		outputBytes: Buffer.byteLength(serialized),
	};
}

async function buildIndexStream(postsRoot: string): Promise<ScenarioValue> {
	const previousPostsPath = process.env.BLOG_POSTS_PATH;
	const previousNodeEnv = process.env.NODE_ENV;
	process.env.BLOG_POSTS_PATH = postsRoot;
	process.env.NODE_ENV = "benchmark";

	try {
		const blogService = new BlogService();
		blogService.logger.log = () => undefined;
		blogService.logger.warn = () => undefined;
		blogService.logger.error = () => undefined;
		blogService.logger.debug = () => undefined;

		await blogService.buildIndexFromFiles();

		const serialized = await readFile(STREAM_INDEX_PATH, "utf-8");
		const postCount = serialized
			.split("\n")
			.filter((line) => line.trim().length > 0).length;

		return {
			postCount,
			outputBytes: Buffer.byteLength(serialized),
		};
	} finally {
		if (previousPostsPath === undefined) {
			delete process.env.BLOG_POSTS_PATH;
		} else {
			process.env.BLOG_POSTS_PATH = previousPostsPath;
		}

		if (previousNodeEnv === undefined) {
			delete process.env.NODE_ENV;
		} else {
			process.env.NODE_ENV = previousNodeEnv;
		}
	}
}

function printSummary(
	dataset: DatasetInfo,
	streamResult: ScenarioResult,
	eagerResult: ScenarioResult,
) {
	const rssReductionPct =
		eagerResult.peakRssDeltaMb <= 0
			? 0
			: round(
					((eagerResult.peakRssDeltaMb - streamResult.peakRssDeltaMb) /
						eagerResult.peakRssDeltaMb) *
						100,
				);
	const heapReductionPct =
		eagerResult.peakHeapDeltaMb <= 0
			? 0
			: round(
					((eagerResult.peakHeapDeltaMb - streamResult.peakHeapDeltaMb) /
						eagerResult.peakHeapDeltaMb) *
						100,
				);

	console.log("");
	console.log("Dataset");
	console.log(`- files: ${dataset.fileCount.toLocaleString()}`);
	console.log(`- total size: ${round(toMb(dataset.totalFileBytes))} MB`);
	console.log(`- avg file size: ${round(toMb(dataset.averageFileBytes))} MB`);
	console.log(`- stream max concurrency: ${Math.min(cpus().length || 1, 4)}`);
	console.log("");
	console.log(
		"| Scenario | Duration (ms) | Peak RSS Δ (MB) | Peak Heap Δ (MB) | End RSS Δ (MB) | Output (MB) |",
	);
	console.log("| --- | ---: | ---: | ---: | ---: | ---: |");

	for (const result of [streamResult, eagerResult]) {
		console.log(
			`| ${result.label} | ${result.durationMs.toFixed(2)} | ${result.peakRssDeltaMb.toFixed(2)} | ${result.peakHeapDeltaMb.toFixed(2)} | ${result.endRssDeltaMb.toFixed(2)} | ${round(toMb(result.value.outputBytes)).toFixed(2)} |`,
		);
	}

	console.log("");
	console.log(
		`Peak RSS reduction (stream vs eager): ${rssReductionPct.toFixed(2)}%`,
	);
	console.log(
		`Peak heap reduction (stream vs eager): ${heapReductionPct.toFixed(2)}%`,
	);
}

async function main() {
	if (typeof global.gc !== "function") {
		throw new Error("Run this benchmark with --expose-gc.");
	}

	await access(POSTS_ROOT, constants.R_OK);
	const files = await collectMarkdownFiles(POSTS_ROOT);
	if (files.length === 0) {
		throw new Error(
			"No benchmark fixtures found. Run `pnpm --filter backend run bench:setup` first.",
		);
	}

	const dataset = await inspectDataset(files);

	await removeFileIfExists(STREAM_INDEX_PATH);
	await removeFileIfExists(EAGER_INDEX_PATH);

	const streamResult = await measureScenario("stream/frontmatter-only", () =>
		buildIndexStream(POSTS_ROOT),
	);

	await removeFileIfExists(EAGER_INDEX_PATH);

	const eagerResult = await measureScenario("promise-all/full-read", () =>
		buildIndexEager(POSTS_ROOT),
	);

	if (streamResult.value.postCount !== dataset.fileCount) {
		throw new Error(
			`Stream benchmark processed ${streamResult.value.postCount} posts, expected ${dataset.fileCount}.`,
		);
	}

	if (eagerResult.value.postCount !== dataset.fileCount) {
		throw new Error(
			`Eager benchmark processed ${eagerResult.value.postCount} posts, expected ${dataset.fileCount}.`,
		);
	}

	printSummary(dataset, streamResult, eagerResult);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
