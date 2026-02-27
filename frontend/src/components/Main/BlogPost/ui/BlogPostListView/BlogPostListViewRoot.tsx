"use client";

import { motion, type Variants } from "motion/react";
import {
	type CSSProperties,
	memo,
	type ReactNode,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { BlogPostList } from "../../style";
import { BlogPostItem } from "../BlogPostItem";
import { useBlogPostContext } from "../BlogPostProvider";
import {
	useWindowedRange,
	type VirtualScrollConfig,
	type WindowedRangeDebugSample,
} from "./useWindowedRange";

const DEBUG_QUERY_PARAM = "blogWindowRangeDebug";
const DEBUG_LOCAL_STORAGE_KEY = "blogWindowRangeDebug";
const DEBUG_EVENT_LIMIT = 500;

type BlogPostRangeDebugEvent =
	| {
			type: "range_update";
			timestamp: number;
			frameMs: number;
			viewportStart: number;
			viewportEnd: number;
			visibleRangeStart: number;
			visibleRangeEnd: number;
			remainingPx: number;
			preloadThresholdPx: number;
			measuredCount: number;
			pendingCount: number;
			totalHeightPx: number;
	  }
	| {
			type: "load_more_invoked";
			timestamp: number;
			loadMoreReactionMs: number;
			remainingPx: number;
			reason: "remainingPx" | "remainingItems" | "both";
			preloadReservePx: number;
			visibleRangeStart: number;
			visibleRangeEnd: number;
			hasMore: boolean;
			isPending: boolean;
			itemCount: number;
	  };

type WindowWithBlogPostRangeDebug = Window & {
	__blogPostWindowRangeDebug?: BlogPostRangeDebugEvent[];
};

const MotionBlogPostList = motion.create(BlogPostList);

const containerVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};

const LIST_ID = "blog-post__recently-post-list";
const LIST_TEST_ID = "blog-main__recently-post-list";

const DEFAULT_VIRTUAL_CONFIG: Readonly<
	VirtualScrollConfig & { minRenderCount: number }
> = {
	estimatedHeight: 170,
	overscan: 4,
	enabled: true,
	minRenderCount: 10,
	preloadThresholdPx: 1440,
};

type BlogPostListViewRootProps = {
	children?: ReactNode;
	itemHeight?: number;
	overscan?: number;
	minRenderCount?: number;
};

function buildVirtualConfig({
	itemHeight,
	overscan,
	minRenderCount,
	viewportHeightPx,
	enabled,
	onMetrics,
}: {
	itemHeight: number;
	overscan: number;
	minRenderCount: number;
	viewportHeightPx: number;
	enabled: boolean;
	onMetrics?: (sample: WindowedRangeDebugSample) => void;
}): VirtualScrollConfig {
	return {
		estimatedHeight: itemHeight,
		overscan,
		minRenderCount,
		preloadThresholdPx: viewportHeightPx,
		enabled,
		onMetrics,
	};
}

function createSpacerStyle(heightPx: number): CSSProperties {
	return {
		height: `${heightPx}px`,
		pointerEvents: "none",
		listStyle: "none",
		margin: 0,
		padding: 0,
	};
}

const createChildStyle = (): CSSProperties => ({
	listStyle: "none",
	margin: 0,
	padding: 0,
});

const clamp = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

const resolveWindowedRangeDebugEnabled = () => {
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

const createDebugLogger = (isEnabled: boolean) => {
	if (!isEnabled) {
		return undefined;
	}

	return (event: BlogPostRangeDebugEvent) => {
		const debugWindow = window as WindowWithBlogPostRangeDebug;
		const events = debugWindow.__blogPostWindowRangeDebug ?? [];
		const nextEvents = events.slice(-Math.max(DEBUG_EVENT_LIMIT - 1, 0));
		nextEvents.push(event);
		debugWindow.__blogPostWindowRangeDebug = nextEvents;
	};
};

function getPreloadThresholdPx() {
	if (typeof window === "undefined") {
		return 1200;
	}
	return Math.ceil(window.innerHeight * 1.35);
}

export const BlogPostListViewRoot = memo(function BlogPostListViewRoot({
	children,
	itemHeight = DEFAULT_VIRTUAL_CONFIG.estimatedHeight,
	overscan = DEFAULT_VIRTUAL_CONFIG.overscan,
	minRenderCount = DEFAULT_VIRTUAL_CONFIG.minRenderCount,
}: BlogPostListViewRootProps) {
	const { posts, hasMore, totalCount, loadMore, isPending } =
		useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;
	const listRef = useRef<HTMLUListElement>(null);
	const debugLogger = useMemo(
		() => createDebugLogger(resolveWindowedRangeDebugEnabled()),
		[],
	);
	const preloadSignalAtRef = useRef<number | null>(null);
	const preloadThresholdPx = getPreloadThresholdPx();
	const preloadReservePx = clamp(preloadThresholdPx, 560, 2200);
	const [isTerminalMode, setIsTerminalMode] = useState(false);
	const registerRangeMetrics = useCallback(
		(sample: WindowedRangeDebugSample) => {
			if (!debugLogger) {
				return;
			}

			const event: BlogPostRangeDebugEvent = {
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

			debugLogger(event);

			if (process.env.NODE_ENV !== "production") {
				console.debug("[BlogPostWindowRange]", event);
			}
		},
		[debugLogger],
	);

	const {
		visibleRange,
		topSpacerPx,
		bottomSpacerPx,
		remainingPx,
		registerItemElement,
	} = useWindowedRange(
		listRef,
		posts.length,
		buildVirtualConfig({
			itemHeight,
			overscan,
			minRenderCount,
			viewportHeightPx: preloadThresholdPx,
			enabled: canLoadMore,
			onMetrics: registerRangeMetrics,
		}),
	);

	useEffect(() => {
		if (canLoadMore || isPending) {
			if (isTerminalMode) {
				setIsTerminalMode(false);
			}
			return;
		}

		if (typeof window === "undefined") {
			return;
		}

		const frameId = requestAnimationFrame(() => {
			setIsTerminalMode(true);
		});

		return () => {
			cancelAnimationFrame(frameId);
		};
	}, [canLoadMore, isPending, isTerminalMode]);

	const shouldRenderAllPosts = isTerminalMode;
	const renderedPosts = useMemo(() => {
		if (shouldRenderAllPosts) {
			return posts;
		}

		return posts.slice(visibleRange.start, visibleRange.end);
	}, [posts, shouldRenderAllPosts, visibleRange]);

	useEffect(() => {
		if (!canLoadMore) {
			preloadSignalAtRef.current = null;
			return;
		}

		const shouldPreloadByPx = remainingPx <= preloadReservePx;
		const shouldPreloadByItems = posts.length - visibleRange.end <= 4;
		const now =
			typeof performance === "undefined" ? Date.now() : performance.now();

		if (!isPending && (shouldPreloadByPx || shouldPreloadByItems)) {
			if (preloadSignalAtRef.current === null) {
				preloadSignalAtRef.current = now;
			}
		} else {
			preloadSignalAtRef.current = null;
		}

		if (
			canLoadMore &&
			!isPending &&
			(shouldPreloadByPx || shouldPreloadByItems)
		) {
			const reason =
				shouldPreloadByPx && shouldPreloadByItems
					? "both"
					: shouldPreloadByPx
						? "remainingPx"
						: "remainingItems";
			const loadMoreReactionMs =
				preloadSignalAtRef.current === null
					? 0
					: now - preloadSignalAtRef.current;

			if (debugLogger) {
				const event: BlogPostRangeDebugEvent = {
					type: "load_more_invoked",
					timestamp: now,
					loadMoreReactionMs,
					remainingPx,
					reason,
					preloadReservePx,
					visibleRangeStart: visibleRange.start,
					visibleRangeEnd: visibleRange.end,
					hasMore: canLoadMore,
					isPending,
					itemCount: posts.length,
				};

				debugLogger(event);
			}

			preloadSignalAtRef.current = null;
			loadMore();
		}
	}, [
		canLoadMore,
		isPending,
		posts.length,
		visibleRange.end,
		remainingPx,
		preloadReservePx,
		loadMore,
		debugLogger,
		visibleRange.start,
	]);

	return (
		<MotionBlogPostList
			ref={listRef}
			id={LIST_ID}
			data-testid={LIST_TEST_ID}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{!shouldRenderAllPosts && topSpacerPx > 0 && (
				<li
					style={createSpacerStyle(topSpacerPx)}
					aria-hidden="true"
					role="presentation"
				/>
			)}
			{renderedPosts.map((post, index) => {
				const absoluteIndex = shouldRenderAllPosts
					? index
					: visibleRange.start + index;
				return (
					<BlogPostItem
						key={`${post.category}-${post.slug}-${absoluteIndex}`}
						post={post}
						index={absoluteIndex}
					/>
				);
			})}
			{!shouldRenderAllPosts && bottomSpacerPx > 0 && (
				<li
					style={createSpacerStyle(bottomSpacerPx)}
					aria-hidden="true"
					role="presentation"
				/>
			)}
			{children && (
				<li style={createChildStyle()} aria-hidden="true">
					{children}
				</li>
			)}
		</MotionBlogPostList>
	);
});
