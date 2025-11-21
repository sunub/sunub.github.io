import { z } from "zod";

const PostCategorySchema = z.union([
	z.literal("web"),
	z.literal("algorithm"),
	z.literal("cs"),
	z.literal("code"),
]);

const FrontMatterSchema = z.object({
	title: z.string(),
	date: z.date(),
	tags: z.array(z.string()),
	summary: z.string(),
	slug: z.string(),
	category: PostCategorySchema,
	completed: z.boolean(),
});

const CacheDataSchema = z.object({
	content: z.string(),
	data: FrontMatterSchema,
	isEmpty: z.boolean(),
	excerpt: z.string(),
	cacheKey: z.string(),
	category: PostCategorySchema,
	date: z.date(),
});

type PostCategory = z.infer<typeof PostCategorySchema>;
type FrontMatter = z.infer<typeof FrontMatterSchema>;
type CacheData = z.infer<typeof CacheDataSchema>;

export { CacheDataSchema, FrontMatterSchema, PostCategorySchema };
export type { CacheData, FrontMatter, PostCategory };
