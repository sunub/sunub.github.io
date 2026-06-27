import { Module } from "@nestjs/common";
import { BlogModule } from "src/instances/blog/blog.module";
import { SearchModule } from "src/search/search.module";
import { ArchivesController } from "./archives.controller";
import { CategoriesController } from "./categories.controller";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
	imports: [BlogModule, SearchModule],
	controllers: [PostsController, CategoriesController, ArchivesController],
	providers: [PostsService],
})
export class PostsModule {}
