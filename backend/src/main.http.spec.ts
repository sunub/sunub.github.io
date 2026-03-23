import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { PostFrontMatter } from "@sunub/types";
import * as request from "supertest";
import { AppModule } from "./app.module";
import { BlogService } from "./instances/blog/blog.service";

const posts: PostFrontMatter[] = [
	{
		frontmatter: {
			title: "Hello Backend",
			date: "2024-01-01",
			tags: ["backend"],
			summary: "Backend API and test coverage",
			slug: "hello-backend",
			category: "web",
			completed: true,
		},
		filePath: "/tmp/posts/web/hello-backend.mdx",
	},
	{
		frontmatter: {
			title: "알고리즘 정리",
			date: "2024-01-02",
			tags: ["algorithm"],
			summary: "배열과 트리 정리",
			slug: "algorithm-notes",
			category: "algorithm",
			completed: true,
		},
		filePath: "/tmp/posts/algorithm/algorithm-notes.md",
	},
	{
		frontmatter: {
			title: "Code Deep Dive",
			date: "2024-01-03",
			tags: ["code"],
			summary: "TypeScript and architecture",
			slug: "code-deep-dive",
			category: "code",
			completed: true,
		},
		filePath: "/tmp/posts/code/code-deep-dive.mdx",
	},
];

describe("Backend API", () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
			.overrideProvider(BlogService)
			.useValue({
				getAllPosts: jest.fn().mockResolvedValue(posts),
				getTotalPostCount: jest.fn().mockReturnValue(posts.length),
				getLatestPosts: jest
					.fn()
					.mockImplementation((count: number) =>
						Promise.resolve(posts.slice(0, count)),
					),
				getPostsInRange: jest
					.fn()
					.mockImplementation((start: number, end: number) =>
						Promise.resolve(posts.slice(start, end)),
					),
				getArchiveSummary: jest.fn().mockReturnValue({
					totalCount: posts.length,
					coveredYears: 1,
					counts: {
						all: posts.length,
						web: 1,
						algorithm: 1,
						code: 1,
						cs: 0,
					},
				}),
				getArchivePostsInRange: jest
					.fn()
					.mockImplementation(
						(
							category: "all" | "web" | "algorithm" | "code" | "cs",
							start: number,
							end: number,
						) => {
							const filteredPosts =
								category === "all"
									? posts
									: posts.filter(
											(post) => post.frontmatter.category === category,
										);

							return {
								totalCount: filteredPosts.length,
								frontmatters: filteredPosts
									.slice(start, end)
									.map((post) => post.frontmatter),
							};
						},
					),
				getPostsByCategory: jest
					.fn()
					.mockImplementation((category: string) =>
						Promise.resolve(
							posts.filter((post) => post.frontmatter.category === category),
						),
					),
				getPostBySlug: jest
					.fn()
					.mockImplementation((category: string, slug: string) =>
						Promise.resolve(
							posts.find(
								(item) =>
									item.frontmatter.category === category &&
									item.frontmatter.slug === slug,
							),
						),
					),
				getPostContent: jest
					.fn()
					.mockImplementation((_category: string, slug: string) => {
						if (slug === "hello-backend") {
							return Promise.resolve({
								content: "# hello backend\n\ncontent",
								frontmatter: posts[0].frontmatter,
								contentLength: 100,
								hasContent: true,
							});
						}
						return Promise.resolve(null);
					}),
			})
			.compile();

		app = moduleRef.createNestApplication();
		await app.init();
	});

	afterAll(async () => {
		await app.close();
	});

	it("should serve root route", async () => {
		await request(app.getHttpServer()).get("/").expect(200, "Health Check OK");
	});

	it("should serve healthz route", async () => {
		const response = await request(app.getHttpServer())
			.get("/healthz")
			.expect(200);

		expect(response.body).toMatchObject({
			status: "ok",
		});
		expect(typeof response.body.timestamp).toBe("number");
	});

	it("should return latest posts from posts module", async () => {
		const response = await request(app.getHttpServer())
			.get("/posts/latest?count=2")
			.expect(200);

		expect(response.body.totalCount).toBe(posts.length);
		expect(response.body.frontmatters).toEqual(
			expect.arrayContaining([posts[0].frontmatter, posts[1].frontmatter]),
		);
	});

	it("should return posts in range", async () => {
		const response = await request(app.getHttpServer())
			.get("/posts/latest/range?start=1&end=3")
			.expect(200);

		expect(response.body.totalCount).toBe(posts.length);
		expect(response.body.frontmatters).toEqual(
			expect.arrayContaining([posts[1].frontmatter, posts[2].frontmatter]),
		);
	});

	it("should return archive summary", async () => {
		const response = await request(app.getHttpServer())
			.get("/posts/archive/summary")
			.expect(200);

		expect(response.body).toEqual({
			totalCount: posts.length,
			coveredYears: 1,
			counts: {
				all: posts.length,
				web: 1,
				algorithm: 1,
				code: 1,
				cs: 0,
			},
		});
	});

	it("should return archive posts in range by category", async () => {
		const response = await request(app.getHttpServer())
			.get("/posts/archive/range?category=algorithm&start=0&end=2")
			.expect(200);

		expect(response.body).toEqual({
			totalCount: 1,
			frontmatters: [posts[1].frontmatter],
		});
	});

	it("should return post by category", async () => {
		const response = await request(app.getHttpServer())
			.get("/posts/web")
			.expect(200);

		expect(response.body).toEqual([posts[0]]);
	});

	it("should return specific post content", async () => {
		const response = await request(app.getHttpServer())
			.get("/posts/web/hello-backend")
			.expect(200);

		expect(response.body).toEqual({
			frontmatter: posts[0].frontmatter,
			content: "# hello backend\n\ncontent",
		});
	});

	it("should return 404 for missing slug", async () => {
		await request(app.getHttpServer()).get("/posts/web/not-found").expect(404);
	});

	it("should return bad request for invalid category", async () => {
		await request(app.getHttpServer()).get("/posts/invalid").expect(400);
	});

	it("should return search results", async () => {
		const response = await request(app.getHttpServer())
			.get("/api/search?query=Backend")
			.expect(200);

		expect(response.body).toMatchObject({
			results: [
				{
					postKey: "web/hello-backend",
					post: {
						frontmatter: posts[0].frontmatter,
					},
					titleMatches: ["Backend"],
					summaryMatches: ["Backend"],
				},
			],
		});
	});
});
