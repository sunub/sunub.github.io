import type { FrontMatter } from "@/db/blog/Schema";

export type PublishedPost = {
	totalCount: number;
	frontmattters: FrontMatter[];
};
