import { z } from "zod";

export const POST_CATEGORY_VALUES = [
	"web",
	"algorithm",
	"cs",
	"code",
	"ai",
] as const;

export const ARCHIVE_CATEGORY_FILTER_VALUES = [
	"all",
	...POST_CATEGORY_VALUES,
] as const;

export const PostCategorySchema = z.enum(POST_CATEGORY_VALUES);
export const ArchiveCategoryFilterSchema = z.enum(
	ARCHIVE_CATEGORY_FILTER_VALUES,
);

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

export const PublicPostFrontMatterSchema = z.object({
	frontmatter: FrontMatterSchema,
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
	ai: z.array(PostFrontMatterSchema),
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
	ai: z.number(),
});

export interface ArchiveCategoryOption {
	value: ArchiveCategoryFilter;
	label: string;
	description: string;
}

export const ARCHIVE_CATEGORY_OPTIONS = [
	{
		value: "all",
		label: "All Posts",
		description: "모든 카테고리",
	},
	{
		value: "web",
		label: "Web",
		description: "브라우저와 렌더링",
	},
	{
		value: "code",
		label: "Code",
		description: "개발 경험과 구현",
	},
	{
		value: "cs",
		label: "CS",
		description: "컴퓨터 과학 기초",
	},
	{
		value: "algorithm",
		label: "Algorithm",
		description: "문제 해결과 사고법",
	},
	{
		value: "ai",
		label: "AI",
		description: "인공지능과 머신러닝",
	},
] as const satisfies readonly ArchiveCategoryOption[];

export const POST_CATEGORY_SEARCH_TERMS = {
	web: ["web", "웹"],
	algorithm: ["algorithm", "알고리즘"],
	code: ["code", "코드"],
	cs: [
		"cs",
		"computer science",
		"computer-science",
		"컴퓨터 과학",
		"컴퓨터사이언스",
	],
	ai: [
		"ai",
		"artificial intelligence",
		"artificial-intelligence",
		"llm",
		"인공지능",
		"머신러닝",
	],
} as const satisfies Record<
	(typeof POST_CATEGORY_VALUES)[number],
	readonly string[]
>;

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

export const StaticPostIndexSchema = z.object({
	generatedAt: z.string(),
	posts: z.array(PublicPostFrontMatterSchema),
	archiveSummary: ArchiveSummarySchema,
});

export const StaticSearchIndexEntrySchema = z.object({
	postKey: z.string(),
	post: PublicPostFrontMatterSchema,
	headings: z.array(z.string()),
	bodyText: z.string(),
});

export const StaticSearchIndexSchema = z.object({
	generatedAt: z.string(),
	entries: z.array(StaticSearchIndexEntrySchema),
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

export interface PublicPostFrontMatter {
	frontmatter: FrontMatter;
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
	ai: PostFrontMatter[];
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

export interface StaticPostIndex {
	generatedAt: string;
	posts: PublicPostFrontMatter[];
	archiveSummary: ArchiveSummary;
}

export interface StaticSearchIndexEntry {
	postKey: string;
	post: PublicPostFrontMatter;
	headings: string[];
	bodyText: string;
}

export interface StaticSearchIndex {
	generatedAt: string;
	entries: StaticSearchIndexEntry[];
}

const ARCHIVE_CATEGORY_FILTER_SET = new Set<ArchiveCategoryFilter>(
	ARCHIVE_CATEGORY_FILTER_VALUES,
);
const ARCHIVE_CATEGORY_OPTION_MAP = new Map<
	ArchiveCategoryFilter,
	ArchiveCategoryOption
>(ARCHIVE_CATEGORY_OPTIONS.map((option) => [option.value, option]));

export function isArchiveCategoryFilter(
	value: string | null | undefined,
): value is ArchiveCategoryFilter {
	return (
		typeof value === "string" &&
		ARCHIVE_CATEGORY_FILTER_SET.has(value as ArchiveCategoryFilter)
	);
}

export function parseArchiveCategoryFilter(
	value: string | null | undefined,
	fallback: ArchiveCategoryFilter = "all",
): ArchiveCategoryFilter {
	return isArchiveCategoryFilter(value) ? value : fallback;
}

export function createArchiveCategoryCounts(
	totalCount = 0,
): ArchiveCategoryCounts {
	return {
		all: totalCount,
		web: 0,
		algorithm: 0,
		code: 0,
		cs: 0,
		ai: 0,
	};
}

export function countArchiveCategories(
	posts: ReadonlyArray<Pick<FrontMatter, "category">>,
): ArchiveCategoryCounts {
	const counts = createArchiveCategoryCounts(posts.length);

	for (const post of posts) {
		counts[post.category] += 1;
	}

	return counts;
}

export function getArchiveCategoryOption(
	category: ArchiveCategoryFilter,
): ArchiveCategoryOption | undefined {
	return ARCHIVE_CATEGORY_OPTION_MAP.get(category);
}

export function getArchiveCategoryLabel(category: PostCategory): string {
	return getArchiveCategoryOption(category)?.label ?? category;
}

export function getArchiveCategoryDescription(
	category: ArchiveCategoryFilter,
): string {
	return getArchiveCategoryOption(category)?.description ?? category;
}

export function getPostCategorySearchTerms(
	category: PostCategory,
): readonly string[] {
	return POST_CATEGORY_SEARCH_TERMS[category];
}

export type Tag = string;
export type Category = PostCategory;
export type Categories = PostCategory;
