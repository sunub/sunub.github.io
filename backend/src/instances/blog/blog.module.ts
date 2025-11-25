import { Module } from "@nestjs/common";
import { BlogService } from "./blog.service";

@Module({
	exports: [BlogService],
	providers: [BlogService],
})
export class BlogModule {}
