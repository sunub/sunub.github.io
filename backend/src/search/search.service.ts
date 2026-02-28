import { Injectable } from "@nestjs/common";
import { BlogService } from "src/instances/blog/blog.service";
import type { SearchResult } from "@sunub/types";
import { findMatches } from "./utils/findMatches";

@Injectable()
export class SearchService {
	constructor(private readonly blogService: BlogService) {}

	async search(query: string): Promise<SearchResult[]> {
		if (!query) {
			return [];
		}

		const posts = await this.blogService.getAllPosts();
		const results: SearchResult[] = [];
		for (const post of posts) {
			const { title, summary } = post.frontmatter;
			const titleHits = findMatches(query, title);
			const summaryHits = findMatches(query, summary);
			if (titleHits.length) {
				results.push({
					postKey: `${post.frontmatter.category}/${post.frontmatter.slug}`,
					post,
					titleMatches: titleHits,
					summaryMatches: summaryHits,
				});
			}
		}
		return results;
	}
}
