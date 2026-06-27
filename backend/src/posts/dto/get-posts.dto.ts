import { ArchiveCategoryFilterSchema } from "@sunub/types";
import { z } from "zod";

export const GetPostsQuerySchema = z.object({
	sort: z.literal("latest").optional(),
	offset: z.coerce.number().int().min(0).optional(),
	limit: z.coerce.number().int().min(1).max(50).optional(),
	q: z.string().optional(),
});

export type GetPostsQueryDto = z.infer<typeof GetPostsQuerySchema>;

export const GetArchivePostsQuerySchema = z.object({
	category: ArchiveCategoryFilterSchema.default("all"),
	offset: z.coerce.number().int().min(0).default(0),
	limit: z.coerce.number().int().min(1).default(10),
});

export type GetArchivePostsQueryDto = z.infer<
	typeof GetArchivePostsQuerySchema
>;
