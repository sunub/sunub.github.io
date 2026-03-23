import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, Max, Min } from "class-validator";

const ARCHIVE_CATEGORY_FILTERS = [
	"all",
	"web",
	"algorithm",
	"cs",
	"code",
] as const;

export class GetLatestPostsQueryDto {
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	@Max(50)
	count: number = 10;
}

export class GetLatestPostsInRangeQueryDto {
	@Type(() => Number)
	@IsInt()
	@Min(0)
	start: number;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	end: number;
}

export class GetArchivePostsInRangeQueryDto {
	@IsOptional()
	@IsIn(ARCHIVE_CATEGORY_FILTERS)
	category: (typeof ARCHIVE_CATEGORY_FILTERS)[number] = "all";

	@Type(() => Number)
	@IsInt()
	@Min(0)
	start: number = 0;

	@Type(() => Number)
	@IsInt()
	@Min(1)
	end: number = 1;
}
