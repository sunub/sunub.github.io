import { Test, TestingModule } from "@nestjs/testing";
import { PostsService } from "./posts.service";
import { BlogService } from "../instances/blog/blog.service";

describe("PostsService", () => {
	let service: PostsService;

	beforeEach(async () => {
		const mockBlogService = {
			getAllPosts: jest.fn().mockResolvedValue([]),
			getTotalPostCount: jest.fn().mockReturnValue(0),
			getLatestPosts: jest.fn().mockResolvedValue([]),
			getPostsInRange: jest.fn().mockResolvedValue([]),
			getPostsByCategory: jest.fn().mockResolvedValue([]),
			getPostBySlug: jest.fn().mockResolvedValue(undefined),
			getPostContent: jest.fn().mockResolvedValue(null),
		} as unknown as BlogService;

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				{
					provide: BlogService,
					useValue: mockBlogService,
				},
				PostsService,
			],
		}).compile();

		service = module.get<PostsService>(PostsService);
	});

	it("should be defined", () => {
		expect(service).toBeDefined();
	});
});
