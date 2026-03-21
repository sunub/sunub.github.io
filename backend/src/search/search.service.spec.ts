import { Test, TestingModule } from "@nestjs/testing";
import type { MatterTransformData, PostFrontMatter } from "@sunub/types";
import { BlogService } from "../instances/blog/blog.service";
import { SearchService } from "./search.service";

const samplePosts: PostFrontMatter[] = [
	{
		frontmatter: {
			title: "Hello Node",
			date: "2024-01-01",
			tags: ["runtime"],
			summary: "Learning backend fundamentals",
			slug: "hello-node",
			category: "web",
			completed: true,
		},
		filePath: "/tmp/posts/web/hello-node.mdx",
	},
	{
		frontmatter: {
			title: "Algorithm Basics",
			date: "2024-01-02",
			tags: ["deque"],
			summary: "An introduction to arrays and trees",
			slug: "algorithm-basics",
			category: "algorithm",
			completed: true,
		},
		filePath: "/tmp/posts/algorithm/algorithm-basics.md",
	},
	{
		frontmatter: {
			title: "Node",
			date: "2023-12-01",
			tags: ["javascript"],
			summary: "A short note about the node runtime",
			slug: "node",
			category: "code",
			completed: true,
		},
		filePath: "/tmp/posts/code/node.mdx",
	},
	{
		frontmatter: {
			title: "Server Deployment Notes",
			date: "2024-02-01",
			tags: ["infra"],
			summary: "Practical tips for rolling out a service safely",
			slug: "server-deployment-notes",
			category: "code",
			completed: true,
		},
		filePath: "/tmp/posts/code/server-deployment-notes.mdx",
	},
	{
		frontmatter: {
			title: "Runtime Memory Guide",
			date: "2024-03-01",
			tags: ["performance"],
			summary: "A compact guide to memory usage tuning",
			slug: "runtime-memory-guide",
			category: "code",
			completed: true,
		},
		filePath: "/tmp/posts/code/runtime-memory-guide.mdx",
	},
];

const sampleContents: Record<string, MatterTransformData> = {
	"web/hello-node": {
		frontmatter: samplePosts[0].frontmatter,
		content: "## Node Runtime\n\nJavaScript server environment",
		contentLength: 45,
		hasContent: true,
	},
	"algorithm/algorithm-basics": {
		frontmatter: samplePosts[1].frontmatter,
		content:
			"## 배열 탐색\n\n트리와 그래프를 천천히 정리하면서 문제 해결 방식을 익혀봅니다.",
		contentLength: 49,
		hasContent: true,
	},
	"code/node": {
		frontmatter: samplePosts[2].frontmatter,
		content: "## Node Overview\n\nNode can be used for server-side services.",
		contentLength: 57,
		hasContent: true,
	},
	"code/server-deployment-notes": {
		frontmatter: samplePosts[3].frontmatter,
		content:
			"## 배포 점검\n\nNode runtime monitoring helps catch server regressions early.",
		contentLength: 72,
		hasContent: true,
	},
	"code/runtime-memory-guide": {
		frontmatter: samplePosts[4].frontmatter,
		content:
			"## 메모리 점검\n\nNode memory pressure often shows up before latency spikes.",
		contentLength: 71,
		hasContent: true,
	},
};

describe("SearchService", () => {
	let service: SearchService;
	let blogService: jest.Mocked<BlogService>;

	beforeEach(async () => {
		blogService = {
			getAllPosts: jest.fn().mockResolvedValue(samplePosts),
			getPostContent: jest
				.fn()
				.mockImplementation((category: string, slug: string) =>
					Promise.resolve(sampleContents[`${category}/${slug}`] ?? null),
				),
		} as unknown as jest.Mocked<BlogService>;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: BlogService,
					useValue: blogService,
				},
				SearchService,
			],
		}).compile();

		service = module.get<SearchService>(SearchService);
	});

	it("should return empty array when query is empty", async () => {
		const result = await service.search("");

		expect(result).toEqual([]);
		expect(blogService.getAllPosts).not.toHaveBeenCalled();
	});

	it("should find matches in title and return expected response shape", async () => {
		const result = await service.search("hello node");

		expect(result).toEqual([
			{
				postKey: "web/hello-node",
				post: {
					...samplePosts[0],
				},
				titleMatches: ["Hello Node"],
				summaryMatches: [],
				tagMatches: [],
				categoryMatches: [],
				headingMatches: [],
				bodyMatches: [],
			},
		]);
		expect(blogService.getPostContent).not.toHaveBeenCalledWith(
			"web",
			"hello-node",
			"/tmp/posts/web/hello-node.mdx",
		);
	});

	it("should include summary-only matches", async () => {
		const result = await service.search("backend");

		expect(result).toEqual([
			{
				postKey: "web/hello-node",
				post: {
					...samplePosts[0],
				},
				titleMatches: [],
				summaryMatches: ["backend"],
				tagMatches: [],
				categoryMatches: [],
				headingMatches: [],
				bodyMatches: [],
			},
		]);
		expect(blogService.getPostContent).not.toHaveBeenCalledWith(
			"web",
			"hello-node",
			"/tmp/posts/web/hello-node.mdx",
		);
	});

	it("should include tag matches", async () => {
		const result = await service.search("deque");

		expect(result).toEqual([
			{
				postKey: "algorithm/algorithm-basics",
				post: {
					...samplePosts[1],
				},
				titleMatches: [],
				summaryMatches: [],
				tagMatches: ["deque"],
				categoryMatches: [],
				headingMatches: [],
				bodyMatches: [],
			},
		]);
		expect(blogService.getPostContent).not.toHaveBeenCalledWith(
			"algorithm",
			"algorithm-basics",
			"/tmp/posts/algorithm/algorithm-basics.md",
		);
	});

	it("should include Korean category keyword matches", async () => {
		const result = await service.search("알고리즘");

		expect(result).toEqual([
			{
				postKey: "algorithm/algorithm-basics",
				post: {
					...samplePosts[1],
				},
				titleMatches: [],
				summaryMatches: [],
				tagMatches: [],
				categoryMatches: ["알고리즘"],
				headingMatches: [],
				bodyMatches: [],
			},
		]);
		expect(blogService.getPostContent).not.toHaveBeenCalledWith(
			"algorithm",
			"algorithm-basics",
			"/tmp/posts/algorithm/algorithm-basics.md",
		);
	});

	it("should search headings when frontmatter does not match", async () => {
		const result = await service.search("배열");

		expect(result).toEqual([
			{
				postKey: "algorithm/algorithm-basics",
				post: {
					...samplePosts[1],
				},
				titleMatches: [],
				summaryMatches: [],
				tagMatches: [],
				categoryMatches: [],
				headingMatches: ["배열"],
				bodyMatches: [],
			},
		]);
		expect(blogService.getPostContent).toHaveBeenCalled();
	});

	it("should search body text when frontmatter and headings do not match", async () => {
		const result = await service.search("그래프");

		expect(result).toEqual([
			{
				postKey: "algorithm/algorithm-basics",
				post: {
					...samplePosts[1],
				},
				titleMatches: [],
				summaryMatches: [],
				tagMatches: [],
				categoryMatches: [],
				headingMatches: [],
				bodyMatches: ["그래프"],
			},
		]);
	});

	it("should sort results by match priority first and recency second", async () => {
		const result = await service.search("node");

		expect(result.map((item) => item.postKey)).toEqual([
			"code/node",
			"web/hello-node",
			"code/runtime-memory-guide",
			"code/server-deployment-notes",
		]);
		expect(result[0]?.titleMatches).toEqual(["Node"]);
		expect(result[1]?.titleMatches).toEqual(["Node"]);
		expect(result[2]?.bodyMatches).toEqual(["Node"]);
		expect(result[3]?.bodyMatches).toEqual(["Node"]);
	});

	it("should prefer exact title matches over newer partial title matches", async () => {
		const result = await service.search("node");

		expect(result[0]?.postKey).toBe("code/node");
		expect(result[0]?.titleMatches).toEqual(["Node"]);
		expect(result[1]?.postKey).toBe("web/hello-node");
	});
});
