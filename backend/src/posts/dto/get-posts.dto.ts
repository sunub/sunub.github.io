import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

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
