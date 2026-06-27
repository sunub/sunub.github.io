import { Module } from "@nestjs/common";
import { BlogModule } from "src/instances/blog/blog.module";
import { SearchService } from "./search.service";

@Module({
	imports: [BlogModule],
	providers: [SearchService],
	exports: [SearchService],
})
export class SearchModule {}
