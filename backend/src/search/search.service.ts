import { Injectable } from "@nestjs/common";
import { BlogService } from "src/instances/blog/blog.service";
import { findMatches } from "./utils/findMatches";

@Injectable()
export class SearchService {
	constructor(private readonly blogService: BlogService) {}

	search(query: string) {
		if (!query) {
			return [];
		}

		const posts = this.blogService.getAllPosts();
		const results = [];
		for (const post of posts) {
			const { title, summary } = post.frontmatter;
			const titleHits = findMatches(query, title);
			const summaryHits = findMatches(query, summary);
			if (titleHits.length) {
				results.push({
					post,
					titleMatches: titleHits,
					summaryMatches: summaryHits,
				});
			}
		}
		return results;
	}
}
