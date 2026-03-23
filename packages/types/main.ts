import { z } from "zod";

export const PostCategorySchema = z.union([
	z.literal("web"),
	z.literal("algorithm"),
	z.literal("cs"),
	z.literal("code"),
]);

export const ArchiveCategoryFilterSchema = z.union([
	z.literal("all"),
	PostCategorySchema,
]);

export const DateStringSchema = z.union([z.string(), z.date()]);

export const FrontMatterSchema = z.object({
	title: z.string(),
	date: DateStringSchema,
	tags: z.array(z.string()),
	summary: z.string(),
	slug: z.string(),
	category: PostCategorySchema,
	completed: z.boolean(),
});

export const CacheDataSchema = z.object({
	content: z.string(),
	data: FrontMatterSchema,
	isEmpty: z.boolean(),
	excerpt: z.string(),
	cacheKey: z.string(),
	category: PostCategorySchema,
	date: DateStringSchema,
});

export const PostFrontMatterSchema = z.object({
	frontmatter: FrontMatterSchema,
	filePath: z.string(),
});

export const SpecificPostInfoSchema = z.object({
	frontmatter: FrontMatterSchema,
	content: z.string(),
});

export const JsonPostFrontMatterSchema = z.object({
	all: z.array(PostFrontMatterSchema),
	web: z.array(PostFrontMatterSchema),
	algorithm: z.array(PostFrontMatterSchema),
	code: z.array(PostFrontMatterSchema),
	cs: z.array(PostFrontMatterSchema),
});

export const PublishedPostSchema = z.object({
	totalCount: z.number(),
	frontmatters: z.array(FrontMatterSchema),
});

export const ArchiveCategoryCountsSchema = z.object({
	all: z.number(),
	web: z.number(),
	algorithm: z.number(),
	code: z.number(),
	cs: z.number(),
});

export const ArchiveSummarySchema = z.object({
	totalCount: z.number(),
	coveredYears: z.number(),
	counts: ArchiveCategoryCountsSchema,
});

export const SearchResultSchema = z.object({
	postKey: z.string(),
	post: z
		.object({
			frontmatter: FrontMatterSchema,
			filePath: z.string().optional(),
		})
		.passthrough(),
	titleMatches: z.array(z.string()),
	summaryMatches: z.array(z.string()),
	tagMatches: z.array(z.string()),
	categoryMatches: z.array(z.string()),
	headingMatches: z.array(z.string()),
	bodyMatches: z.array(z.string()),
});

export const SearchResponseSchema = z.object({
	results: z.array(SearchResultSchema),
});

export type PostCategory = z.infer<typeof PostCategorySchema>;
export type ArchiveCategoryFilter = z.infer<typeof ArchiveCategoryFilterSchema>;
export type FrontMatter = z.infer<typeof FrontMatterSchema>;
export type CacheData = z.infer<typeof CacheDataSchema>;
export type ArchiveCategoryCounts = z.infer<typeof ArchiveCategoryCountsSchema>;
export type ArchiveSummary = z.infer<typeof ArchiveSummarySchema>;

export interface PostFrontMatter {
	frontmatter: FrontMatter;
	filePath: string;
}

export interface MatterTransformData {
	content: string;
	frontmatter: FrontMatter;
	contentLength: number;
	hasContent: boolean;
}

export interface SpecificPostInfo {
	frontmatter: FrontMatter;
	content: string;
}

export interface JsonPostFrontMatter {
	all: PostFrontMatter[];
	web: PostFrontMatter[];
	algorithm: PostFrontMatter[];
	code: PostFrontMatter[];
	cs: PostFrontMatter[];
}

export interface PublishedPost {
	totalCount: number;
	frontmatters: FrontMatter[];
}

export type SearchResultPost = {
	frontmatter: FrontMatter;
	filePath?: string;
};

export interface SearchResult {
	postKey: string;
	post: SearchResultPost;
	titleMatches: string[];
	summaryMatches: string[];
	tagMatches: string[];
	categoryMatches: string[];
	headingMatches: string[];
	bodyMatches: string[];
}

export interface SearchResponse {
	results: SearchResult[];
}

export type Tag = string;
export type Category = PostCategory;
export type Categories = PostCategory;
