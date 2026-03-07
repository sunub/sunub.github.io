import type { CSSProperties } from "react";
import type {
	VirtualRenderRange,
	VirtualScrollConfig,
} from "../types/windowedRange";

const PRELOAD_THRESHOLD_MULTIPLIER = 0.75;
const PRELOAD_RESERVE_MULTIPLIER = 1.6;
const DEFAULT_LIST_OVERSCAN = 8;
const DEFAULT_LIST_ITEM_HEIGHT = 170;
const DEFAULT_LIST_MIN_RENDER_COUNT = 10;
const REMAINING_ITEMS_PRELOAD_THRESHOLD = 2;

export const BLOG_POST_LIST_IDS = {
	id: "blog-post__recently-post-list",
	testId: "blog-main__recently-post-list",
} as const;

export const DEFAULT_VIRTUAL_SCROLL_CONFIG = {
	estimatedHeight: DEFAULT_LIST_ITEM_HEIGHT,
	overscan: DEFAULT_LIST_OVERSCAN,
	minRenderCount: DEFAULT_LIST_MIN_RENDER_COUNT,
} as const;

export type CreateVirtualScrollConfigOptions = {
	itemHeight: number;
	overscan: number;
	minRenderCount: number;
	viewportHeightPx: number;
	enabled: boolean;
};

export const createVirtualScrollConfig = ({
	itemHeight,
	overscan,
	minRenderCount,
	viewportHeightPx,
	enabled,
}: CreateVirtualScrollConfigOptions): VirtualScrollConfig => {
	return {
		estimatedHeight: itemHeight,
		overscan,
		minRenderCount,
		preloadThresholdPx: viewportHeightPx,
		enabled,
	};
};

export const getPostsInRenderRange = <T>(
	posts: T[],
	visibleRange: VirtualRenderRange,
	shouldRenderAllPosts: boolean,
) => {
	if (shouldRenderAllPosts) {
		return posts;
	}

	return posts.slice(visibleRange.start, visibleRange.end);
};

export const createVirtualSpacerStyle = (heightPx: number): CSSProperties => ({
	height: `${heightPx}px`,
	pointerEvents: "none",
	listStyle: "none",
	margin: 0,
	padding: 0,
});

export const shouldLoadMoreFromRemainingItems = (
	postsLength: number,
	visibleRangeEnd: number,
) => {
	return postsLength - visibleRangeEnd <= REMAINING_ITEMS_PRELOAD_THRESHOLD;
};

export const clampNumber = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

export const getViewportRangeWithinList = (list: HTMLUListElement) => {
	const listTop = list.getBoundingClientRect().top;
	const viewportStart = Math.floor(Math.max(-listTop, 0));
	const viewportEnd = Math.floor(Math.max(window.innerHeight - listTop, 0));

	return { viewportStart, viewportEnd };
};

export const findItemIndexForOffset = (
	cumulativeHeights: number[],
	offsetPx: number,
) => {
	if (cumulativeHeights.length <= 1) {
		return 0;
	}

	const lastIndex = Math.max(cumulativeHeights.length - 2, 0);
	const totalHeight = cumulativeHeights[cumulativeHeights.length - 1] ?? 0;
	const normalizedOffset = clampNumber(offsetPx, 0, totalHeight);

	let low = 0;
	let high = cumulativeHeights.length - 1;

	while (low < high) {
		const mid = Math.floor((low + high + 1) / 2);
		if (cumulativeHeights[mid] <= normalizedOffset) {
			low = mid;
		} else {
			high = mid - 1;
		}
	}

	return Math.min(low, lastIndex);
};

export const measureElementOuterHeight = (element: HTMLElement) => {
	const rectHeight = element.getBoundingClientRect().height;
	const styles = getComputedStyle(element);

	const marginTop = Number.parseFloat(styles.marginTop);
	const marginBottom = Number.parseFloat(styles.marginBottom);

	const nextHeight = Math.max(
		1,
		Math.ceil(
			rectHeight +
				(Number.isNaN(marginTop) ? 0 : marginTop) +
				(Number.isNaN(marginBottom) ? 0 : marginBottom),
		),
	);

	return nextHeight;
};

export const buildCumulativeItemHeights = (
	itemCount: number,
	getHeight: (index: number) => number,
): number[] => {
	const cumulativeHeights = new Array(itemCount + 1).fill(0);
	for (let i = 0; i < itemCount; i += 1) {
		cumulativeHeights[i + 1] = cumulativeHeights[i] + getHeight(i);
	}
	return cumulativeHeights;
};

export const getLoadMoreViewportThresholdPx = () => {
	if (typeof window === "undefined") {
		return 720;
	}

	const thresholdPx = Math.ceil(
		window.innerHeight * PRELOAD_THRESHOLD_MULTIPLIER,
	);
	return clampNumber(thresholdPx, 480, 900);
};

export const getLoadMoreTriggerDistancePx = (thresholdPx: number) => {
	return clampNumber(
		Math.ceil(thresholdPx * PRELOAD_RESERVE_MULTIPLIER),
		720,
		1400,
	);
};
