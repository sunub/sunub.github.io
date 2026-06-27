import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { GetPostsQueryDto } from "./dto/get-posts.dto";
import { PostsService } from "./posts.service";

@Controller("api/posts")
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get()
	getPosts(
		@Query(new ValidationPipe({ transform: true }))
		query: GetPostsQueryDto,
	) {
		if (query.sort === "latest") {
			if (query.offset !== undefined) {
				const start = query.offset;
				const end = query.offset + (query.limit ?? 10);
				return this.postsService.findLatestInRange(start, end);
			} else {
				return this.postsService.findLatest(query.limit ?? 10);
			}
		}
		// Default to all posts if no sort or offset specified.
		return this.postsService.findAll();
	}
}
