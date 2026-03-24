import { existsSync } from "node:fs";
import { mkdir, opendir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
	ArchiveSummarySchema,
	FrontMatterSchema,
	PostFrontMatterSchema,
	StaticPostIndexSchema,
	StaticSearchIndexSchema,
} from "@sunub/types";
import matter from "gray-matter";
import { extractSearchableContent } from "../src/shared/search/searchCore.js";

const FRONTEND_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REPO_ROOT = resolve(FRONTEND_ROOT, "..");
const PUBLIC_DATA_ROOT = resolve(FRONTEND_ROOT, "public/data");

const EMPTY_COUNTS = {
	all: 0,
	algorithm: 0,
	code: 0,
	cs: 0,
	web: 0,
};

function resolvePostsRootPath() {
	const configuredPath = process.env.BLOG_POSTS_PATH?.trim();
	const candidates = [
		configuredPath,
		resolve(REPO_ROOT, "posts"),
		resolve(FRONTEND_ROOT, "posts"),
	].filter(Boolean);

	return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
}

async function* walkPostFiles(rootDirectory) {
	const directory = await opendir(rootDirectory);

	for await (const dirent of directory) {
		const absolutePath = join(rootDirectory, dirent.name);

		if (dirent.isDirectory()) {
			yield* walkPostFiles(absolutePath);
			continue;
		}

		if (!dirent.isFile()) {
			continue;
		}

		const extension = extname(dirent.name);
		if (extension !== ".md" && extension !== ".mdx") {
			continue;
		}

		yield absolutePath;
	}
}

function toIsoDate(dateValue) {
	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		throw new Error(`유효하지 않은 날짜입니다: ${dateValue}`);
	}

	return date.toISOString();
}

function comparePostsByDateDesc(left, right) {
	const leftTime = new Date(left.frontmatter.date).getTime();
	const rightTime = new Date(right.frontmatter.date).getTime();

	if (leftTime !== rightTime) {
		return rightTime - leftTime;
	}

	return left.frontmatter.title.localeCompare(right.frontmatter.title, "ko");
}

function createArchiveSummary(posts) {
	const counts = { ...EMPTY_COUNTS, all: posts.length };
	const coveredYears = new Set();

	for (const post of posts) {
		counts[post.frontmatter.category] += 1;
		coveredYears.add(new Date(post.frontmatter.date).getFullYear());
	}

	return ArchiveSummarySchema.parse({
		totalCount: posts.length,
		coveredYears: coveredYears.size,
		counts,
	});
}

async function loadAllPosts(postsRootPath) {
	const posts = [];

	for await (const filePath of walkPostFiles(postsRootPath)) {
		const raw = await readFile(filePath, "utf8");
		const parsedMatter = matter(raw);
		const parsedFrontmatter = FrontMatterSchema.safeParse(parsedMatter.data);

		if (!parsedFrontmatter.success) {
			throw new Error(
				`${filePath} frontmatter 파싱에 실패했습니다: ${parsedFrontmatter.error.message}`,
			);
		}

		const post = PostFrontMatterSchema.parse({
			frontmatter: {
				...parsedFrontmatter.data,
				date: toIsoDate(parsedFrontmatter.data.date),
			},
			filePath: resolve(filePath),
		});

		posts.push({
			...post,
			content: parsedMatter.content,
		});
	}

	posts.sort(comparePostsByDateDesc);
	return posts;
}

async function main() {
	const postsRootPath = resolvePostsRootPath();
	if (!postsRootPath) {
		throw new Error("posts 경로를 확인할 수 없습니다.");
	}

	const loadedPosts = await loadAllPosts(postsRootPath);
	const generatedAt = new Date().toISOString();
	const indexedPosts = loadedPosts.map(
		({ content: _content, ...post }) => post,
	);
	const publicPosts = loadedPosts.map(({ content: _content, ...post }) => ({
		frontmatter: post.frontmatter,
	}));
	const postIndex = StaticPostIndexSchema.parse({
		generatedAt,
		posts: publicPosts,
		archiveSummary: createArchiveSummary(loadedPosts),
	});
	const searchIndex = StaticSearchIndexSchema.parse({
		generatedAt,
		entries: loadedPosts.map(({ content, ...post }) => {
			const searchableContent = extractSearchableContent(content);
			return {
				postKey: `${post.frontmatter.category}/${post.frontmatter.slug}`,
				post: {
					frontmatter: post.frontmatter,
				},
				headings: searchableContent.headings,
				bodyText: searchableContent.bodyText,
			};
		}),
	});

	await mkdir(postsRootPath, { recursive: true });
	await mkdir(PUBLIC_DATA_ROOT, { recursive: true });

	await writeFile(
		join(postsRootPath, "posts.jsonl"),
		`${indexedPosts.map((post) => JSON.stringify(post)).join("\n")}\n`,
		"utf8",
	);
	await writeFile(
		join(PUBLIC_DATA_ROOT, "post-index.json"),
		JSON.stringify(postIndex),
		"utf8",
	);
	await writeFile(
		join(PUBLIC_DATA_ROOT, "search-index.json"),
		JSON.stringify(searchIndex),
		"utf8",
	);

	console.log(
		`Generated static blog data for ${postIndex.posts.length} posts at ${generatedAt}`,
	);
}

main().catch((error) => {
	console.error("Failed to generate static blog data:", error);
	process.exitCode = 1;
});
