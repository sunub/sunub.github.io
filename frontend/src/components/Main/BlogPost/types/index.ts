import type { FrontMatter } from "@/db/blog/Schema";

export type PublishedPost = {
	totalCount: number;
	frontmatters: FrontMatter[];
};
