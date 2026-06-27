import { Controller, Get, Query } from "@nestjs/common";
import { ZodValidationPipe } from "src/common/validation.pipe";
import {
	type GetArchivePostsQueryDto,
	GetArchivePostsQuerySchema,
} from "./dto/get-posts.dto";
import { PostsService } from "./posts.service";

@Controller("api/archives")
export class ArchivesController {
	constructor(private readonly postsService: PostsService) {}

	@Get("summary")
	getArchiveSummary() {
		return this.postsService.getArchiveSummary();
	}

	@Get("posts")
	getArchivePostsInRange(
		@Query(new ZodValidationPipe(GetArchivePostsQuerySchema))
		query: GetArchivePostsQueryDto,
	) {
		const start = query.offset;
		const end = query.offset + query.limit;
		return this.postsService.findArchivePostsInRange(
			query.category,
			start,
			end,
		);
	}
}
