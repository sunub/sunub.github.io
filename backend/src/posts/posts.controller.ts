import {
	Controller,
	Get,
	NotFoundException,
	Param,
	Query,
	ValidationPipe,
} from "@nestjs/common";
import { ZodValidationPipe } from "src/common/validation.pipe";
import type { PostCategory } from "../instances/blog/Schema";
import { PostCategorySchema } from "../instances/blog/Schema";
import { GetLatestPostsQueryDto } from "./dto/get-posts.dto";
import { PostsService } from "./posts.service";

@Controller("posts")
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Get("latest")
	getLatestPosts(
		@Query(new ValidationPipe({ transform: true }))
		query: GetLatestPostsQueryDto,
	) {
		return this.postsService.findLatest(query.count);
	}

	@Get(":category")
	getPostsByCategory(
		@Param("category", new ZodValidationPipe(PostCategorySchema))
		category: PostCategory,
	) {
		return this.postsService.findByCategory(category);
	}

	@Get(":category/:slug")
	async getPostBySlug(
		@Param("category", new ZodValidationPipe(PostCategorySchema))
		category: PostCategory,
		@Param("slug") slug: string,
	) {
		try {
			return await this.postsService.findOne(category, slug);
		} catch (error) {
			if (error instanceof NotFoundException) {
				throw new NotFoundException(error.message);
			}
			throw error;
		}
	}
}
