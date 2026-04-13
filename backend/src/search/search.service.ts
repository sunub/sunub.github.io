import { Injectable } from "@nestjs/common";
import type { PostCategory, PostFrontMatter, SearchResult } from "@sunub/types";
import { BlogService } from "src/instances/blog/blog.service";
import {
	extractSearchableContent,
	type SearchableContent,
} from "./utils/extractSearchableContent";
import { findMatches } from "./utils/findMatches";

const MAX_MATCHES_PER_FIELD = 5;
const EXACT_TITLE_MATCH_PRIORITY = 0;
const TITLE_MATCH_PRIORITY = 1;
const TAG_OR_CATEGORY_MATCH_PRIORITY = 2;
const SUMMARY_MATCH_PRIORITY = 3;
const HEADING_MATCH_PRIORITY = 4;
const BODY_MATCH_PRIORITY = 5;

const CATEGORY_SEARCH_TERMS: Record<PostCategory, string[]> = {
	web: ["web", "웹"],
	algorithm: ["algorithm", "알고리즘"],
	code: ["code", "코드"],
	ai: ["ai", "artificial intelligence", "인공지능"],
	cs: [
		"cs",
		"computer science",
		"computer-science",
		"컴퓨터 과학",
		"컴퓨터사이언스",
	],
};

@Injectable()
export class SearchService {
	private readonly searchableContentCache = new Map<
		string,
		SearchableContent
	>();

	constructor(private readonly blogService: BlogService) {}

	async search(query: string): Promise<SearchResult[]> {
		const normalizedQuery = query.trim();
		if (!normalizedQuery) {
			return [];
		}

		const posts = await this.blogService.getAllPosts();
		this.pruneUnusedCacheEntries(posts);

		const results: SearchResult[] = [];
		for (const post of posts) {
			const result = await this.searchPost(normalizedQuery, post);
			if (result) {
				results.push(result);
			}
		}

		return results.sort((left, right) =>
			this.compareSearchResults(normalizedQuery, left, right),
		);
	}

	private async searchPost(
		query: string,
		post: PostFrontMatter,
	): Promise<SearchResult | null> {
		const { title, summary, tags, category } = post.frontmatter;
		const titleMatches = findMatches(query, title, {
			limit: MAX_MATCHES_PER_FIELD,
		});
		const summaryMatches = findMatches(query, summary, {
			limit: MAX_MATCHES_PER_FIELD,
		});
		const tagMatches = this.findMatchesInTexts(query, tags);
		const categoryMatches = this.findMatchesInTexts(
			query,
			CATEGORY_SEARCH_TERMS[category],
		);

		const hasFrontmatterMatch =
			titleMatches.length > 0 ||
			summaryMatches.length > 0 ||
			tagMatches.length > 0 ||
			categoryMatches.length > 0;

		let headingMatches: string[] = [];
		let bodyMatches: string[] = [];

		if (!hasFrontmatterMatch) {
			const searchableContent = await this.getSearchableContent(post);
			headingMatches = this.findMatchesInTexts(
				query,
				searchableContent.headings,
			);

			if (!headingMatches.length && this.shouldSearchBody(query)) {
				bodyMatches = findMatches(query, searchableContent.bodyText, {
					limit: MAX_MATCHES_PER_FIELD,
				});
			}
		}

		const hasAnyMatch =
			hasFrontmatterMatch ||
			headingMatches.length > 0 ||
			bodyMatches.length > 0;

		if (!hasAnyMatch) {
			return null;
		}

		return {
			postKey: `${post.frontmatter.category}/${post.frontmatter.slug}`,
			post,
			titleMatches,
			summaryMatches,
			tagMatches,
			categoryMatches,
			headingMatches,
			bodyMatches,
		};
	}

	private async getSearchableContent(
		post: PostFrontMatter,
	): Promise<SearchableContent> {
		const cacheKey = post.filePath;
		const cached = this.searchableContentCache.get(cacheKey);
		if (cached) {
			return cached;
		}

		const postContent = await this.blogService.getPostContent(
			post.frontmatter.category,
			post.frontmatter.slug,
			post.filePath,
		);

		const searchableContent = postContent?.content
			? extractSearchableContent(postContent.content)
			: { headings: [], bodyText: "" };
		this.searchableContentCache.set(cacheKey, searchableContent);
		return searchableContent;
	}

	private findMatchesInTexts(query: string, texts: string[]): string[] {
		const uniqueMatches: string[] = [];
		const seen = new Set<string>();

		for (const text of texts) {
			const remainingLimit = MAX_MATCHES_PER_FIELD - uniqueMatches.length;
			if (remainingLimit <= 0) {
				break;
			}

			const matches = findMatches(query, text, { limit: remainingLimit });
			for (const match of matches) {
				if (seen.has(match)) {
					continue;
				}

				seen.add(match);
				uniqueMatches.push(match);

				if (uniqueMatches.length >= MAX_MATCHES_PER_FIELD) {
					return uniqueMatches;
				}
			}
		}

		return uniqueMatches;
	}

	private compareSearchResults(
		query: string,
		left: SearchResult,
		right: SearchResult,
	): number {
		const matchPriorityDiff =
			this.getMatchPriority(query, left) - this.getMatchPriority(query, right);
		if (matchPriorityDiff !== 0) {
			return matchPriorityDiff;
		}

		return this.getPublishedAt(right) - this.getPublishedAt(left);
	}

	private getMatchPriority(query: string, result: SearchResult): number {
		if (this.isExactTitleMatch(query, result)) {
			return EXACT_TITLE_MATCH_PRIORITY;
		}

		if (result.titleMatches.length > 0) {
			return TITLE_MATCH_PRIORITY;
		}

		if (result.tagMatches.length > 0 || result.categoryMatches.length > 0) {
			return TAG_OR_CATEGORY_MATCH_PRIORITY;
		}

		if (result.summaryMatches.length > 0) {
			return SUMMARY_MATCH_PRIORITY;
		}

		if (result.headingMatches.length > 0) {
			return HEADING_MATCH_PRIORITY;
		}

		return BODY_MATCH_PRIORITY;
	}

	private isExactTitleMatch(query: string, result: SearchResult): boolean {
		if (result.titleMatches.length === 0) {
			return false;
		}

		const normalizedQuery = this.normalizeForExactMatch(query);
		const normalizedTitle = this.normalizeForExactMatch(
			result.post.frontmatter.title,
		);

		if (normalizedQuery.length !== normalizedTitle.length) {
			return false;
		}

		return (
			findMatches(normalizedQuery, normalizedTitle, { limit: 1 }).length > 0
		);
	}

	private normalizeForExactMatch(text: string): string {
		return text.trim().replace(/\s+/g, " ");
	}

	private getPublishedAt(result: SearchResult): number {
		const publishedAt = new Date(result.post.frontmatter.date).getTime();
		return Number.isNaN(publishedAt) ? 0 : publishedAt;
	}

	private shouldSearchBody(query: string): boolean {
		return query.length >= 2;
	}

	private pruneUnusedCacheEntries(posts: PostFrontMatter[]) {
		const validKeys = new Set(posts.map((post) => post.filePath));
		for (const cacheKey of this.searchableContentCache.keys()) {
			if (!validKeys.has(cacheKey)) {
				this.searchableContentCache.delete(cacheKey);
			}
		}
	}
}
