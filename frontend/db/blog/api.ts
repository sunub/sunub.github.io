"use server";

import fs from "node:fs/promises";
import { join, resolve } from "node:path";
import { cwd } from "node:process";
import matter from "gray-matter";
import { cache } from "react";
import postsJson from "@/generated/posts.generated.json";
import { Post } from "./Posts";
import type { PostCategory, PostFrontMatter } from "./Schema";
import { FrontMatterSchema, JsonPostFrontMatterSchema } from "./Schema";

const getPostsDir = cache(() => {
	const projectRoot = resolve(cwd(), "..");
	const postsPath = join(projectRoot, "posts");

	if (!postsPath) throw new Error("posts 디렉터리를 찾을 수 없습니다.");
	return postsPath;
});

const getAllJsonFrontMatter = cache(async () => {
	const parsedJsonFrontMatter = JsonPostFrontMatterSchema.safeParse(postsJson);

	if (!parsedJsonFrontMatter.success) {
		console.error(
			"posts.generated.json 스키마 검증 실패:",
			parsedJsonFrontMatter.error,
		);
		throw new Error("posts.generated.json 파일의 형식이 잘못되었습니다.");
	}

	return parsedJsonFrontMatter.data;
});

async function getAllPostsFrontmatter(): Promise<PostFrontMatter[]> {
	const allData = await getAllJsonFrontMatter();
	return allData?.all ?? [];
}

async function getWebPostsFrontmatter(): Promise<PostFrontMatter[]> {
	const allData = await getAllJsonFrontMatter();
	return allData?.web ?? [];
}

async function getAlgorithmPostsFrontmatter(): Promise<PostFrontMatter[]> {
	const allData = await getAllJsonFrontMatter();
	return allData?.algorithm ?? [];
}

async function getCodePostsFrontmatter(): Promise<PostFrontMatter[]> {
	const allData = await getAllJsonFrontMatter();
	return allData?.code ?? [];
}

async function getCSPostsFrontmatter(): Promise<PostFrontMatter[]> {
	const allData = await getAllJsonFrontMatter();
	return allData?.cs ?? [];
}

export const getRecentPostsMetadata = cache(async (batchSize: number = 10) => {
	const post = Post.getInstance();
	return post.postFrontMatterGenerator(batchSize);
});

export const getRecentPostsMetadataInRange = cache(
	async (start: number, end: number) => {
		const allFrontMatters = await getAllPostsFrontmatter();
		return {
			totalCount: allFrontMatters.length,
			frontmatters: allFrontMatters
				.slice(start, end)
				.map((post) => post.frontmatter),
		};
	},
);

export const getAllPosts = cache(async () => {
	const allFrontMatters = await getAllPostsFrontmatter();
	return allFrontMatters;
});

export const getPostsMetadataByCategory = cache(
	async (category: PostCategory) => {
		switch (category) {
			case "web":
				return getWebPostsFrontmatter();
			case "algorithm":
				return getAlgorithmPostsFrontmatter();
			case "code":
				return getCodePostsFrontmatter();
			case "cs":
				return getCSPostsFrontmatter();
			default:
				throw new Error(`알 수 없는 카테고리: ${category as string}`);
		}
	},
);

function readMDXContent(filePath: string): Promise<string> {
	return fs.readFile(filePath, "utf8");
}

export const getPostContentByCategoryAndSlug = cache(
	async (category: PostCategory, slug: string) => {
		try {
			const postPath = getPostsDir();
			const filePath = join(postPath, category, `${slug}.mdx`);
			const minimumTimeout = 1000;

			// const fileContent = await readMDXContent(filePath);
			const [fileContent, _] = await Promise.all([
				readMDXContent(filePath),
				new Promise((resolve) => setTimeout(resolve, minimumTimeout)),
			]);

			const { content, data } = matter(fileContent);

			const parsedFrontMatter = FrontMatterSchema.safeParse(data);
			if (!parsedFrontMatter.success) {
				console.error(parsedFrontMatter.error);
				throw new Error(`FrontMatter 유효성 검증 실패: ${filePath}`);
			}

			return {
				content,
				frontmatter: parsedFrontMatter.data,
			};
		} catch (error: unknown) {
			console.error(
				`데이터 읽기 실패: category=${category}, slug=${slug}`,
				error,
			);
			throw error;
		}
	},
);
