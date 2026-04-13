import type { FrontMatter } from "@sunub/types";

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
