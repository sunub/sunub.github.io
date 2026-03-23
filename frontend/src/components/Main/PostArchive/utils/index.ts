import type { FrontMatter, PostCategory } from "@sunub/types";
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
export const POST_ARCHIVE_MEDIUM_BREAKPOINT = 760;
export const POST_ARCHIVE_LARGE_BREAKPOINT = 1120;

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

export function getPostArchiveCardKey(post: FrontMatter) {
	return `${post.category}/${post.slug}`;
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

export function getPostArchiveCounts(posts: FrontMatter[]) {
	const counts: Record<PostArchiveCategoryFilter, number> = {
		all: posts.length,
		web: 0,
		code: 0,
		cs: 0,
		algorithm: 0,
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
