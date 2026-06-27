import { Test, TestingModule } from "@nestjs/testing";
import { BlogService } from "../instances/blog/blog.service";
import { SearchService } from "../search/search.service";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

describe("PostsController", () => {
	let controller: PostsController;

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
			controllers: [PostsController],
			providers: [
				{
					provide: BlogService,
					useValue: mockBlogService,
				},
				{
					provide: SearchService,
					useValue: { search: jest.fn().mockResolvedValue([]) },
				},
				PostsService,
			],
		}).compile();

		controller = module.get<PostsController>(PostsController);
	});

	it("should be defined", () => {
		expect(controller).toBeDefined();
	});
});
