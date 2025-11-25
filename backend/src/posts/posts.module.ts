import { Module } from "@nestjs/common";
import { BlogModule } from "src/instances/blog/blog.module";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
	imports: [BlogModule],
	controllers: [PostsController],
	providers: [PostsService],
})
export class PostsModule {}
