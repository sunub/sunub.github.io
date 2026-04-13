import type {
	ArchiveCategoryCounts,
	ArchiveCategoryFilter,
	FrontMatter,
	PostCategory,
} from "@sunub/types";
import {
	ARCHIVE_CATEGORY_OPTIONS,
	countArchiveCategories,
	createArchiveCategoryCounts,
	getArchiveCategoryLabel as getSharedArchiveCategoryLabel,
	parseArchiveCategoryFilter as parseSharedArchiveCategoryFilter,
} from "@sunub/types";
import type {
	PostArchiveCardMedia,
	PostArchiveCardMediaResolver,
	PostArchiveRowData,
} from "../types";

export const POST_ARCHIVE_INITIAL_VISIBLE_COUNT = 9;
export const POST_ARCHIVE_LOAD_MORE_COUNT = 6;
export const POST_ARCHIVE_ESTIMATED_ROW_HEIGHT = 520;
export const POST_ARCHIVE_OVERSCAN = 3;
export const POST_ARCHIVE_MIN_RENDER_COUNT = 4;
export const POST_ARCHIVE_WINDOWING_ROW_THRESHOLD =
	POST_ARCHIVE_MIN_RENDER_COUNT + POST_ARCHIVE_OVERSCAN * 2;
export const POST_ARCHIVE_MEDIUM_BREAKPOINT = 760;
export const POST_ARCHIVE_LARGE_BREAKPOINT = 1120;
const POST_ARCHIVE_PRELOAD_THRESHOLD_MULTIPLIER = 0.35;
const POST_ARCHIVE_PRELOAD_RESERVE_MULTIPLIER = 1.2;
const POST_ARCHIVE_MIN_PRELOAD_THRESHOLD_PX = 220;
const POST_ARCHIVE_MIN_PRELOAD_RESERVE_PX = 280;
const POST_ARCHIVE_MAX_PRELOAD_RESERVE_PX = 640;

export const POST_ARCHIVE_CATEGORY_OPTIONS = ARCHIVE_CATEGORY_OPTIONS;

export function getPostArchiveCardKey(post: FrontMatter) {
	return `${post.category}/${post.slug}`;
}

export function parsePostArchiveCategoryFilter(
	value: string | null | undefined,
): ArchiveCategoryFilter {
	return parseSharedArchiveCategoryFilter(value);
}

export function resolvePostArchiveMedia(
	post: FrontMatter,
	index: number,
	overrides?: PostArchiveCardMediaResolver,
) {
	if (!overrides) {
		return undefined;
	}

	if (typeof overrides === "function") {
		return overrides(post, index);
	}

	return overrides[getPostArchiveCardKey(post)];
}

export function getPostArchiveColumnCount(width: number) {
	if (width >= POST_ARCHIVE_LARGE_BREAKPOINT) {
		return 3;
	}

	if (width >= POST_ARCHIVE_MEDIUM_BREAKPOINT) {
		return 2;
	}

	return 1;
}

function clampNumber(value: number, min: number, max: number) {
	return Math.max(min, Math.min(max, value));
}

export function getPostArchiveLoadMoreViewportThresholdPx() {
	if (typeof window === "undefined") {
		return POST_ARCHIVE_MIN_PRELOAD_THRESHOLD_PX;
	}

	return clampNumber(
		Math.ceil(window.innerHeight * POST_ARCHIVE_PRELOAD_THRESHOLD_MULTIPLIER),
		POST_ARCHIVE_MIN_PRELOAD_THRESHOLD_PX,
		POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
	);
}

export function getPostArchiveLoadMoreTriggerDistancePx(thresholdPx: number) {
	return clampNumber(
		Math.ceil(thresholdPx * POST_ARCHIVE_PRELOAD_RESERVE_MULTIPLIER),
		POST_ARCHIVE_MIN_PRELOAD_RESERVE_PX,
		POST_ARCHIVE_MAX_PRELOAD_RESERVE_PX,
	);
}

export function getPostArchiveRemainingDistancePx(
	list: HTMLUListElement | null,
) {
	if (!list || typeof window === "undefined") {
		return Number.POSITIVE_INFINITY;
	}

	return Math.max(
		0,
		Math.ceil(list.getBoundingClientRect().bottom - window.innerHeight),
	);
}

export function chunkPostsIntoRows(
	posts: FrontMatter[],
	columnCount: number,
): PostArchiveRowData[] {
	const safeColumnCount = Math.max(columnCount, 1);
	const rows: PostArchiveRowData[] = [];

	for (let index = 0; index < posts.length; index += safeColumnCount) {
		rows.push({
			posts: posts.slice(index, index + safeColumnCount),
			startIndex: index,
		});
	}

	return rows;
}

export function filterPostsByCategory(
	posts: FrontMatter[],
	category: ArchiveCategoryFilter,
) {
	if (category === "all") {
		return posts;
	}

	return posts.filter((post) => post.category === category);
}

export function getEmptyPostArchiveCounts(
	totalCount = 0,
): ArchiveCategoryCounts {
	return createArchiveCategoryCounts(totalCount);
}

export function getPostArchiveCounts(posts: FrontMatter[]) {
	return countArchiveCategories(posts);
}

export function formatPostArchiveDate(date: FrontMatter["date"]) {
	return new Intl.DateTimeFormat("ko-KR", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

export function getPostArchiveCategoryLabel(category: PostCategory) {
	return getSharedArchiveCategoryLabel(category);
}

export function getPostArchiveMediaAlt(
	post: FrontMatter,
	media: PostArchiveCardMedia,
) {
	return media.alt ?? `${post.title} 카드 이미지`;
}
