import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import type {
	MatterTransformData,
	PostCategory,
	PostFrontMatter,
} from "@sunub/types";
import { BlogService } from "./blog.service";

const createPost = (
	category: PostCategory,
	slug: string,
	title: string,
): PostFrontMatter => ({
	frontmatter: {
		title,
		date: "2024-01-01",
		tags: ["test"],
		summary: `summary-${slug}`,
		slug,
		category,
		completed: true,
	},
	filePath: `/workspace/posts/${category}/${slug}.mdx`,
});

describe("BlogService", () => {
	let postsRoot = "/tmp/test-posts";
	const samplePosts: PostFrontMatter[] = [
		createPost("web", "a", "Post A"),
		createPost("web", "b", "Post B"),
		createPost("algorithm", "c", "Post C"),
		createPost("code", "d", "Post D"),
	];

	let service: BlogService;

	beforeEach(() => {
		process.env.BLOG_POSTS_PATH = postsRoot;
		service = new BlogService();
		(service as unknown as { postsCache: PostFrontMatter[] }).postsCache = [
			...samplePosts,
		];
		(service as unknown as { totalPostCount: number }).totalPostCount =
			samplePosts.length;
	});

	afterEach(() => {
		delete process.env.BLOG_POSTS_PATH;
		jest.restoreAllMocks();
	});

	afterAll(async () => {
		if (postsRoot.startsWith(join(tmpdir(), "blog-service-"))) {
			await rm(postsRoot, { recursive: true, force: true });
		}
	});

	it("getLatestPosts should return first N posts from cache", async () => {
		const posts = await service.getLatestPosts(samplePosts.length + 1);

		expect(posts).toEqual(samplePosts);
	});

	it("getPostsInRange should slice by [start, end)", async () => {
		const posts = await service.getPostsInRange(1, 3);

		expect(posts).toEqual([samplePosts[1], samplePosts[2]]);
	});

	it("getPostsByCategory should filter by category", async () => {
		const posts = await service.getPostsByCategory("web");

		expect(posts).toEqual([samplePosts[0], samplePosts[1]]);
	});

	it("getPostBySlug should find matching post by slug and category", async () => {
		const post = await service.getPostBySlug("code", "d");

		expect(post).toEqual(samplePosts[3]);
	});

	it("getPostContent should return first successful parsed content candidate", async () => {
		const mdxContent: MatterTransformData = {
			content: "MDX Content",
			frontmatter: samplePosts[0].frontmatter,
			contentLength: 10,
			hasContent: true,
		};
		const mdContent: MatterTransformData = {
			content: "MD Content",
			frontmatter: samplePosts[0].frontmatter,
			contentLength: 8,
			hasContent: true,
		};
		const mockProcessFile = jest
			.fn<Promise<MatterTransformData | null>, [string]>()
			.mockResolvedValueOnce(null)
			.mockResolvedValueOnce(mdxContent)
			.mockResolvedValueOnce(mdContent);
		(
			service as unknown as { fileProcessor: { processFile: jest.Mock } }
		).fileProcessor = {
			processFile: mockProcessFile,
		};

		const content = await service.getPostContent("web", "a");
		const mdxPath = join(postsRoot, "web", "a.mdx");
		const mdPath = join(postsRoot, "web", "a.md");

		expect(mockProcessFile).toHaveBeenNthCalledWith(1, mdxPath);
		expect(mockProcessFile).toHaveBeenNthCalledWith(2, mdPath);
		expect(content).toEqual(mdxContent);
	});

	it("getPostContent should return null if no content can be resolved", async () => {
		const mockProcessFile = jest
			.fn<Promise<null>, [string]>()
			.mockResolvedValue(null);
		(
			service as unknown as { fileProcessor: { processFile: jest.Mock } }
		).fileProcessor = {
			processFile: mockProcessFile,
		};

		const content = await service.getPostContent("web", "not-exist");

		expect(content).toBeNull();
		expect(mockProcessFile).toHaveBeenCalledTimes(2);
	});

	it("rebuildIndexAndReloadCache should include newly added nested posts", async () => {
		postsRoot = await mkdtemp(join(tmpdir(), "blog-service-"));
		process.env.BLOG_POSTS_PATH = postsRoot;
		service = new BlogService();

		await mkdir(join(postsRoot, "web", "nested"), { recursive: true });
		await writeFile(
			join(postsRoot, "web", "first-post.mdx"),
			`---
title: First Post
date: 2024-01-01
tags:
  - test
summary: first summary
slug: first-post
category: web
completed: true
---

# First
`,
		);

		await service.onModuleInit();

		await writeFile(
			join(postsRoot, "web", "nested", "second-post.mdx"),
			`---
title: Second Post
date: 2024-01-02
tags:
  - test
summary: second summary
slug: second-post
category: web
completed: true
---

# Second
`,
		);

		await service.rebuildIndexAndReloadCache("test nested post add");

		const posts = await service.getAllPosts();
		const indexFile = await readFile(join(postsRoot, "posts.jsonl"), "utf-8");

		expect(posts).toHaveLength(2);
		expect(posts.map((post) => post.frontmatter.slug)).toEqual([
			"second-post",
			"first-post",
		]);
		expect(indexFile).toContain('"slug":"second-post"');
	});
});
