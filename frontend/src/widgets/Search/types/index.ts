import type { FrontMatter } from "@/db/blog/Schema";

export interface SearchResult {
	postKey: string;
	post: {
		frontmatter: FrontMatter;
	};
}
