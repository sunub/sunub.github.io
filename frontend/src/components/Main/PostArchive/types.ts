import type {
	ArchiveCategoryCounts,
	ArchiveCategoryFilter,
	ArchiveSummary,
	FrontMatter,
	PublishedPost,
} from "@sunub/types";

export type { ArchiveCategoryCounts, ArchiveCategoryFilter, ArchiveSummary };
export type PostArchiveCategoryFilter = ArchiveCategoryFilter;
export type PostArchivePageData = PublishedPost;

export interface PostArchiveCardMedia {
	src: string;
	alt?: string;
	background?: string;
	objectFit?: "cover" | "contain";
}

export type PostArchiveCardMediaOverrideMap = Partial<
	Record<string, PostArchiveCardMedia>
>;

export type PostArchiveCardMediaResolver =
	| PostArchiveCardMediaOverrideMap
	| ((post: FrontMatter, index: number) => PostArchiveCardMedia | undefined);

export interface PostArchiveRowData {
	posts: FrontMatter[];
	startIndex: number;
}

export interface PostArchiveCategoryOption {
	value: PostArchiveCategoryFilter;
	label: string;
	description: string;
}
