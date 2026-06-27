import { Controller, Get, NotFoundException, Param } from "@nestjs/common";
import type { PostCategory } from "@sunub/types";
import { PostCategorySchema } from "@sunub/types";
import { ZodValidationPipe } from "src/common/validation.pipe";
import { PostsService } from "./posts.service";

@Controller("api/categories")
export class CategoriesController {
	constructor(private readonly postsService: PostsService) {}

	@Get(":category/posts")
	getPostsByCategory(
		@Param("category", new ZodValidationPipe(PostCategorySchema))
		category: PostCategory,
	) {
		return this.postsService.findByCategory(category);
	}

	@Get(":category/posts/:slug")
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
