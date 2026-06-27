import { Controller, Get, Query } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/validation.pipe";
import { SearchService } from "src/search/search.service";
import {
	type GetPostsQueryDto,
	GetPostsQuerySchema,
} from "./dto/get-posts.dto";
import { PostsService } from "./posts.service";

@Controller("api/posts")
export class PostsController {
	constructor(
		private readonly postsService: PostsService,
		private readonly searchService: SearchService,
	) {}

	@Get()
	async getPosts(
		@Query(new ZodValidationPipe(GetPostsQuerySchema))
		query: GetPostsQueryDto,
	) {
		if (query.q !== undefined) {
			const searchResults = await this.searchService.search(query.q);
			return { results: searchResults };
		}

		if (query.sort === "latest") {
			if (query.offset !== undefined) {
				const start = query.offset;
				const end = query.offset + (query.limit ?? 10);
				return this.postsService.findLatestInRange(start, end);
			} else {
				return this.postsService.findLatest(query.limit ?? 10);
			}
		}
		return this.postsService.findAll();
	}
}
