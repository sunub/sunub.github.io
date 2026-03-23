import "server-only";

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import type {
	FrontMatter,
	PostCategory,
	PostFrontMatter,
	PublishedPost,
	SpecificPostInfo,
} from "@sunub/types";
import { FrontMatterSchema, PostFrontMatterSchema } from "@sunub/types";
import matter from "gray-matter";
import { cache } from "react";

const resolvePostsRootPath = (): string => {
	const configuredPath = process.env.BLOG_POSTS_PATH?.trim();
	const candidates = [
		configuredPath,
		resolve(process.cwd(), "../posts"),
		resolve(process.cwd(), "posts"),
		resolve(process.cwd(), "../../posts"),
	].filter((candidate): candidate is string => Boolean(candidate));

	return candidates.find((candidate) => existsSync(candidate)) ?? candidates[0];
};

const POSTS_ROOT_PATH = resolvePostsRootPath();
const POSTS_INDEX_PATH = join(POSTS_ROOT_PATH, "posts.jsonl");
const EMPTY_PUBLISHED_POST: PublishedPost = {
	totalCount: 0,
	frontmatters: [],
};

const normalizeLatestCount = (count: number = 10) => {
	const safeCount = Number.isFinite(count) ? Math.floor(count) : 10;
	return Math.min(Math.max(safeCount, 1), 50);
};

const normalizeRange = (start: number, end: number) => {
	const safeStart = Math.max(0, Math.floor(start));
	const safeEnd = Math.max(safeStart, Math.floor(end));
	return { safeStart, safeEnd };
};

const parseIndexLine = (line: string, lineNumber: number): PostFrontMatter => {
	const parsedJson = JSON.parse(line) as unknown;
	const parsedPost = PostFrontMatterSchema.safeParse(parsedJson);

	if (!parsedPost.success) {
		throw new Error(
			`posts.jsonl ${lineNumber}번째 줄 파싱에 실패했습니다: ${parsedPost.error.message}`,
		);
	}

	return parsedPost.data;
};

const readPostsIndex = cache(async (): Promise<PostFrontMatter[]> => {
	const raw = await readFile(POSTS_INDEX_PATH, "utf8");
	const lines = raw.split("\n").filter((line) => line.trim().length > 0);

	return lines.map((line, index) => parseIndexLine(line, index + 1));
});

const readPostContentFromFile = cache(
	async (
		category: PostCategory,
		slug: string,
		filePathFromIndex?: string,
	): Promise<SpecificPostInfo | null> => {
		const candidates = [
			filePathFromIndex,
			join(POSTS_ROOT_PATH, category, `${slug}.mdx`),
			join(POSTS_ROOT_PATH, category, `${slug}.md`),
		].filter((candidate): candidate is string => Boolean(candidate));

		for (const candidate of candidates) {
			try {
				const raw = await readFile(candidate, "utf8");
				const parsedMatter = matter(raw);
				const parsedFrontmatter = FrontMatterSchema.safeParse(
					parsedMatter.data,
				);

				if (!parsedFrontmatter.success) {
					console.error(
						`Failed to parse frontmatter for ${category}/${slug}:`,
						parsedFrontmatter.error.issues,
					);
					continue;
				}

				return {
					frontmatter: parsedFrontmatter.data,
					content: parsedMatter.content,
				};
			} catch {
				// Try the next candidate path when the file does not exist or cannot be read.
			}
		}

		return null;
	},
);

export async function getAllPostsFromIndex(): Promise<PostFrontMatter[]> {
	try {
		return await readPostsIndex();
	} catch (error) {
		console.error("Failed to read posts index:", error);
		return [];
	}
}

export async function getLatestPublishedPosts(
	count: number = 10,
): Promise<PublishedPost> {
	try {
		const posts = await readPostsIndex();
		const safeCount = normalizeLatestCount(count);

		return {
			totalCount: posts.length,
			frontmatters: posts.slice(0, safeCount).map((post) => post.frontmatter),
		};
	} catch (error) {
		console.error("Failed to read latest posts from index:", error);
		return EMPTY_PUBLISHED_POST;
	}
}

export async function getPublishedPostsInRange(
	start: number,
	end: number,
): Promise<PublishedPost> {
	try {
		const posts = await readPostsIndex();
		const { safeStart, safeEnd } = normalizeRange(start, end);

		return {
			totalCount: posts.length,
			frontmatters: posts
				.slice(safeStart, safeEnd)
				.map((post) => post.frontmatter),
		};
	} catch (error) {
		console.error("Failed to read posts range from index:", error);
		return EMPTY_PUBLISHED_POST;
	}
}

export async function getPostsByCategoryFromIndex(
	category: PostCategory,
): Promise<PostFrontMatter[]> {
	try {
		const posts = await readPostsIndex();
		return posts.filter((post) => post.frontmatter.category === category);
	} catch (error) {
		console.error(`Failed to read ${category} posts from index:`, error);
		return [];
	}
}

export async function getArchiveFrontmatters(): Promise<FrontMatter[]> {
	const posts = await getAllPostsFromIndex();
	return posts.map((post) => post.frontmatter);
}

export async function getArchiveCardDescription(): Promise<string> {
	const posts = await getAllPostsFromIndex();

	if (posts.length === 0) {
		return "아카이브의 모든 글을 한곳에서 이어서 탐험해보세요.";
	}

	const coveredYears = new Set(
		posts.map(({ frontmatter }) => new Date(frontmatter.date).getFullYear()),
	).size;

	return `지난 ${coveredYears}년간 작성된 ${posts.length}개의 아티클을 탐험해보세요.`;
}

export async function getPostContentFromLocalSource(
	category: PostCategory,
	slug: string,
): Promise<SpecificPostInfo | null> {
	const posts = await getAllPostsFromIndex();
	const matchedPost = posts.find(
		(post) =>
			post.frontmatter.category === category && post.frontmatter.slug === slug,
	);

	const resolvedContent = await readPostContentFromFile(
		category,
		slug,
		matchedPost?.filePath,
	);
	if (!resolvedContent) {
		return null;
	}

	return matchedPost
		? {
				frontmatter: matchedPost.frontmatter,
				content: resolvedContent.content,
			}
		: resolvedContent;
}
