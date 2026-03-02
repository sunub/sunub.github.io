import { Test, TestingModule } from "@nestjs/testing";
import type { PostFrontMatter } from "@sunub/types";
import { BlogService } from "../instances/blog/blog.service";
import { SearchService } from "./search.service";

const samplePosts: PostFrontMatter[] = [
	{
		frontmatter: {
			title: "Hello Node",
			date: "2024-01-01",
			tags: ["backend"],
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
			tags: ["algo"],
			summary: "An introduction to arrays and trees",
			slug: "algorithm-basics",
			category: "algorithm",
			completed: true,
		},
		filePath: "/tmp/posts/algorithm/algorithm-basics.md",
	},
];

describe("SearchService", () => {
	let service: SearchService;
	let blogService: jest.Mocked<BlogService>;

	beforeEach(async () => {
		blogService = {
			getAllPosts: jest.fn().mockResolvedValue(samplePosts),
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
		const result = await service.search("node");

		expect(result).toEqual([
			{
				postKey: "web/hello-node",
				post: {
					...samplePosts[0],
				},
				titleMatches: ["Node"],
				summaryMatches: [],
			},
		]);
	});

	it("should ignore summary-only matches because service filters by title", async () => {
		const result = await service.search("backend");

		expect(result).toEqual([]);
	});
});
