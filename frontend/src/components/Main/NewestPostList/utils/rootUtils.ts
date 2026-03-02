import type { CSSProperties } from "react";
import type { BlogPostRangeDebugEvent } from "../types/type";
import type {
	VirtualRenderRange,
	VirtualScrollConfig,
	WindowedRangeDebugSample,
} from "../types/windowedRange";

export type ListBounds = {
	top: number;
};

export type LoadMoreReason = "remainingPx" | "remainingItems" | "both";

const DEBUG_QUERY_PARAM = "blogWindowRangeDebug";
const DEBUG_LOCAL_STORAGE_KEY = "blogWindowRangeDebug";
const DEBUG_EVENT_LIMIT = 500;
const PRELOAD_THRESHOLD_MULTIPLIER = 1.35;
const DEFAULT_LIST_OVERSCAN = 4;
const DEFAULT_LIST_ITEM_HEIGHT = 170;
const DEFAULT_LIST_MIN_RENDER_COUNT = 10;
const REMAINING_ITEMS_PRELOAD_THRESHOLD = 4;

export const BLOG_POST_LIST_IDS = {
	id: "blog-post__recently-post-list",
	testId: "blog-main__recently-post-list",
} as const;

export const DEFAULT_VIRTUAL_RANGE_CONFIG = {
	estimatedHeight: DEFAULT_LIST_ITEM_HEIGHT,
	overscan: DEFAULT_LIST_OVERSCAN,
	minRenderCount: DEFAULT_LIST_MIN_RENDER_COUNT,
} as const;

export type BlogPostListVirtualConfigInput = {
	itemHeight: number;
	overscan: number;
	minRenderCount: number;
	viewportHeightPx: number;
	enabled: boolean;
	onMetrics?: (sample: WindowedRangeDebugSample) => void;
};

export const buildVirtualRangeConfig = ({
	itemHeight,
	overscan,
	minRenderCount,
	viewportHeightPx,
	enabled,
	onMetrics,
}: BlogPostListVirtualConfigInput): VirtualScrollConfig => {
	return {
		estimatedHeight: itemHeight,
		overscan,
		minRenderCount,
		preloadThresholdPx: viewportHeightPx,
		enabled,
		onMetrics,
	};
};

export const getRenderedPosts = <T>(
	posts: T[],
	visibleRange: VirtualRenderRange,
	shouldRenderAllPosts: boolean,
) => {
	if (shouldRenderAllPosts) {
		return posts;
	}

	return posts.slice(visibleRange.start, visibleRange.end);
};

export const createListSpacerStyle = (heightPx: number): CSSProperties => ({
	height: `${heightPx}px`,
	pointerEvents: "none",
	listStyle: "none",
	margin: 0,
	padding: 0,
});

export const createListChildStyle = (): CSSProperties => ({
	listStyle: "none",
	margin: 0,
	padding: 0,
});

export const getRangeUpdateDebugEvent = (
	sample: WindowedRangeDebugSample,
): BlogPostRangeDebugEvent => {
	return {
		type: "range_update",
		timestamp: sample.timestamp,
		frameMs: sample.rangeUpdateMs,
		viewportStart: sample.viewportStart,
		viewportEnd: sample.viewportEnd,
		visibleRangeStart: sample.visibleRange.start,
		visibleRangeEnd: sample.visibleRange.end,
		remainingPx: sample.remainingPx,
		preloadThresholdPx: sample.preloadThresholdPx,
		measuredCount: sample.measuredCount,
		pendingCount: sample.pendingCount,
		totalHeightPx: sample.totalHeightPx,
	};
};

export const clamp = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

export const getListBounds = (list: HTMLUListElement): ListBounds => {
	const rect = list.getBoundingClientRect();
	return {
		top: rect.top,
	};
};

export const getViewportPixels = (list: HTMLUListElement) => {
	const listBounds = getListBounds(list);
	const viewportStart = Math.floor(Math.max(-listBounds.top, 0));
	const viewportEnd = Math.floor(
		Math.max(window.innerHeight - listBounds.top, 0),
	);

	return { viewportStart, viewportEnd };
};

export const findItemIndexAtOffset = (
	prefixHeights: number[],
	offsetPx: number,
) => {
	if (prefixHeights.length <= 1) {
		return 0;
	}

	const lastIndex = Math.max(prefixHeights.length - 2, 0);
	const totalHeight = prefixHeights[prefixHeights.length - 1] ?? 0;
	const normalizedOffset = clamp(offsetPx, 0, totalHeight);

	let low = 0;
	let high = prefixHeights.length - 1;

	while (low < high) {
		const mid = Math.floor((low + high + 1) / 2);
		if (prefixHeights[mid] <= normalizedOffset) {
			low = mid;
		} else {
			high = mid - 1;
		}
	}

	return Math.min(low, lastIndex);
};

export const getElementOuterHeight = (element: HTMLElement) => {
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

export const buildPrefixHeights = (
	itemCount: number,
	getHeight: (index: number) => number,
) => {
	const prefixHeights = new Array(itemCount + 1).fill(0);
	for (let i = 0; i < itemCount; i += 1) {
		prefixHeights[i + 1] = prefixHeights[i] + getHeight(i);
	}
	return prefixHeights;
};

export const resolveWindowedRangeDebugEnabled = () => {
	if (typeof window === "undefined") {
		return false;
	}

	const query = new URLSearchParams(window.location.search);
	if (query.get(DEBUG_QUERY_PARAM) === "1") {
		return true;
	}

	try {
		return window.localStorage.getItem(DEBUG_LOCAL_STORAGE_KEY) === "1";
	} catch {
		return false;
	}
};

export const createDebugLogger = (isEnabled: boolean) => {
	if (!isEnabled) {
		return undefined;
	}

	return (event: BlogPostRangeDebugEvent) => {
		if (typeof window === "undefined") {
			return;
		}

		const debugWindow = window as Window & {
			__blogPostWindowRangeDebug?: BlogPostRangeDebugEvent[];
		};
		const events = debugWindow.__blogPostWindowRangeDebug ?? [];
		const nextEvents = events.slice(-Math.max(DEBUG_EVENT_LIMIT - 1, 0));
		nextEvents.push(event);
		debugWindow.__blogPostWindowRangeDebug = nextEvents;
	};
};

export const getPreloadThresholdPx = () => {
	if (typeof window === "undefined") {
		return 1200;
	}

	return Math.ceil(window.innerHeight * PRELOAD_THRESHOLD_MULTIPLIER);
};

export const getPreloadReservePx = (thresholdPx: number) => {
	return clamp(thresholdPx, 560, 2200);
};

export const getLoadMoreReason = (
	shouldPreloadByPx: boolean,
	shouldPreloadByItems: boolean,
): LoadMoreReason | null => {
	if (!shouldPreloadByPx && !shouldPreloadByItems) {
		return null;
	}

	return shouldPreloadByPx && shouldPreloadByItems
		? "both"
		: shouldPreloadByPx
			? "remainingPx"
			: "remainingItems";
};

export const isPreloadByItems = (
	postsLength: number,
	visibleRangeEnd: number,
) => {
	return postsLength - visibleRangeEnd <= REMAINING_ITEMS_PRELOAD_THRESHOLD;
};

export const createLoadMoreInvokedEvent = ({
	now,
	loadMoreReactionMs,
	remainingPx,
	reason,
	preloadReservePx,
	visibleRangeStart,
	visibleRangeEnd,
	canLoadMore,
	isPending,
	itemCount,
}: {
	now: number;
	loadMoreReactionMs: number;
	remainingPx: number;
	reason: LoadMoreReason;
	preloadReservePx: number;
	visibleRangeStart: number;
	visibleRangeEnd: number;
	canLoadMore: boolean;
	isPending: boolean;
	itemCount: number;
}): BlogPostRangeDebugEvent => {
	return {
		type: "load_more_invoked",
		timestamp: now,
		loadMoreReactionMs,
		remainingPx,
		reason,
		preloadReservePx,
		visibleRangeStart,
		visibleRangeEnd,
		hasMore: canLoadMore,
		isPending,
		itemCount,
	};
};
