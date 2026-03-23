import type {
	ArchiveCategoryCounts,
	FrontMatter,
	PostCategory,
} from "@sunub/types";
import type {
	PostArchiveCardMedia,
	PostArchiveCardMediaResolver,
	PostArchiveCategoryFilter,
	PostArchiveCategoryOption,
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

export const POST_ARCHIVE_CATEGORY_OPTIONS: PostArchiveCategoryOption[] = [
	{
		value: "all",
		label: "All Posts",
		description: "모든 카테고리",
	},
	{
		value: "web",
		label: "Web",
		description: "브라우저와 렌더링",
	},
	{
		value: "code",
		label: "Code",
		description: "개발 경험과 구현",
	},
	{
		value: "cs",
		label: "CS",
		description: "컴퓨터 과학 기초",
	},
	{
		value: "algorithm",
		label: "Algorithm",
		description: "문제 해결과 사고법",
	},
];

const VALID_ARCHIVE_CATEGORY_FILTERS = new Set<PostArchiveCategoryFilter>(
	POST_ARCHIVE_CATEGORY_OPTIONS.map(({ value }) => value),
);

export function getPostArchiveCardKey(post: FrontMatter) {
	return `${post.category}/${post.slug}`;
}

export function parsePostArchiveCategoryFilter(
	value: string | null | undefined,
): PostArchiveCategoryFilter {
	if (
		value &&
		VALID_ARCHIVE_CATEGORY_FILTERS.has(value as PostArchiveCategoryFilter)
	) {
		return value as PostArchiveCategoryFilter;
	}

	return "all";
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
	category: PostArchiveCategoryFilter,
) {
	if (category === "all") {
		return posts;
	}

	return posts.filter((post) => post.category === category);
}

export function getEmptyPostArchiveCounts(
	totalCount = 0,
): ArchiveCategoryCounts {
	return {
		all: totalCount,
		algorithm: 0,
		code: 0,
		cs: 0,
		web: 0,
	};
}

export function getPostArchiveCounts(posts: FrontMatter[]) {
	const counts: ArchiveCategoryCounts = {
		all: posts.length,
		algorithm: 0,
		code: 0,
		cs: 0,
		web: 0,
	};

	for (const post of posts) {
		counts[post.category] += 1;
	}

	return counts;
}

export function formatPostArchiveDate(date: FrontMatter["date"]) {
	return new Intl.DateTimeFormat("ko-KR", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

export function getPostArchiveCategoryLabel(category: PostCategory) {
	const matchedOption = POST_ARCHIVE_CATEGORY_OPTIONS.find(
		(option) => option.value === category,
	);

	return matchedOption?.label ?? category;
}

export function getPostArchiveMediaAlt(
	post: FrontMatter,
	media: PostArchiveCardMedia,
) {
	return media.alt ?? `${post.title} 카드 이미지`;
}
