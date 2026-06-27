import { Module } from "@nestjs/common";
import { BlogModule } from "src/instances/blog/blog.module";
import { ArchivesController } from "./archives.controller";
import { CategoriesController } from "./categories.controller";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
	imports: [BlogModule],
	controllers: [PostsController, CategoriesController, ArchivesController],
	providers: [PostsService],
})
export class PostsModule {}
