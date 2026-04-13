import type {
	ArchiveCategoryFilter,
	ArchiveSummary,
	FrontMatter,
	PublishedPost,
	StaticPostIndex,
} from "@sunub/types";
import { createArchiveCategoryCounts } from "@sunub/types";

const EMPTY_PUBLISHED_POST: PublishedPost = {
	totalCount: 0,
	frontmatters: [],
};

const EMPTY_ARCHIVE_SUMMARY: ArchiveSummary = {
	totalCount: 0,
	coveredYears: 0,
	counts: createArchiveCategoryCounts(),
};

function normalizeRange(start: number, end: number) {
	const safeStart = Math.max(0, Math.floor(start));
	const safeEnd = Math.max(safeStart, Math.floor(end));
	return { safeStart, safeEnd };
}

export function createArchiveDescription(summary: ArchiveSummary): string {
	if (summary.totalCount === 0) {
		return "아카이브의 모든 글을 한곳에서 이어서 탐험해보세요.";
	}

	return `지난 ${summary.coveredYears}년간 작성된 ${summary.totalCount}개의 아티클을 탐험해보세요.`;
}

export function getArchiveSummaryFromStaticIndex(
	index: StaticPostIndex | null | undefined,
): ArchiveSummary {
	return index?.archiveSummary ?? EMPTY_ARCHIVE_SUMMARY;
}

export function getLatestPostsInRangeFromStaticIndex(
	index: StaticPostIndex | null | undefined,
	start: number,
	end: number,
): PublishedPost {
	if (!index) {
		return EMPTY_PUBLISHED_POST;
	}

	const { safeStart, safeEnd } = normalizeRange(start, end);
	return {
		totalCount: index.posts.length,
		frontmatters: index.posts
			.slice(safeStart, safeEnd)
			.map((post) => post.frontmatter),
	};
}

export function getArchivePostsInRangeFromStaticIndex(
	index: StaticPostIndex | null | undefined,
	category: ArchiveCategoryFilter,
	start: number,
	end: number,
): PublishedPost {
	if (!index) {
		return EMPTY_PUBLISHED_POST;
	}

	const { safeStart, safeEnd } = normalizeRange(start, end);
	const filteredPosts =
		category === "all"
			? index.posts
			: index.posts.filter((post) => post.frontmatter.category === category);

	return {
		totalCount:
			category === "all"
				? index.archiveSummary.totalCount
				: index.archiveSummary.counts[category],
		frontmatters: filteredPosts
			.slice(safeStart, safeEnd)
			.map((post) => post.frontmatter),
	};
}

export function getArchiveFrontmattersFromStaticIndex(
	index: StaticPostIndex | null | undefined,
): FrontMatter[] {
	if (!index) {
		return [];
	}

	return index.posts.map((post) => post.frontmatter);
}
