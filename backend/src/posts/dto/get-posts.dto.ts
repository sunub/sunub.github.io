import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";

const ARCHIVE_CATEGORY_FILTERS = [
	"all",
	"web",
	"algorithm",
	"cs",
	"code",
] as const;

export class GetPostsQueryDto {
	@IsOptional()
	@IsIn(["latest"])
	sort?: "latest";

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(0)
	offset?: number;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	limit?: number;
}

export class GetArchivePostsQueryDto {
	@IsOptional()
	@IsIn(ARCHIVE_CATEGORY_FILTERS)
	category: (typeof ARCHIVE_CATEGORY_FILTERS)[number] = "all";

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(0)
	offset: number = 0;

	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	limit: number = 10;
}
