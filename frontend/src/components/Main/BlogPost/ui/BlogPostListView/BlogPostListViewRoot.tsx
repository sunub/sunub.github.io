"use client";

import { motion, type Variants } from "motion/react";
import { memo, useCallback, useMemo, useRef } from "react";

import { BlogPostList } from "../../style";
import { BlogPostItem } from "../BlogPostItem";
import { useBlogPostContext } from "../BlogPostProvider";
import { useWindowedRange } from "./useWindowedRange";
import type { WindowedRangeDebugSample } from "./types/windowedRange";
import type { BlogPostListViewRootProps } from "./types/type";
import { useListTerminalMode } from "./hooks/useListTerminalMode";
import { useWindowedRangeLoadMore } from "./hooks/useWindowedRangeLoadMore";
import {
	BLOG_POST_LIST_IDS,
	DEFAULT_VIRTUAL_RANGE_CONFIG,
	buildVirtualRangeConfig,
	createDebugLogger,
	createListChildStyle,
	createListSpacerStyle,
	getPreloadReservePx,
	getPreloadThresholdPx,
	getRangeUpdateDebugEvent,
	getRenderedPosts,
	resolveWindowedRangeDebugEnabled,
} from "./utils/rootUtils";

const MotionBlogPostList = motion.create(BlogPostList);

const containerVariants: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.05,
		},
	},
};

const LIST_ID = BLOG_POST_LIST_IDS.id;
const LIST_TEST_ID = BLOG_POST_LIST_IDS.testId;

export const BlogPostListViewRoot = memo(function BlogPostListViewRoot({
	children,
	itemHeight = DEFAULT_VIRTUAL_RANGE_CONFIG.estimatedHeight,
	overscan = DEFAULT_VIRTUAL_RANGE_CONFIG.overscan,
	minRenderCount = DEFAULT_VIRTUAL_RANGE_CONFIG.minRenderCount,
}: BlogPostListViewRootProps) {
	const { posts, hasMore, totalCount, loadMore, isPending } =
		useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;
	const listRef = useRef<HTMLUListElement>(null);

	const debugLogger = useMemo(
		() => createDebugLogger(resolveWindowedRangeDebugEnabled()),
		[],
	);
	const preloadThresholdPx = getPreloadThresholdPx();
	const preloadReservePx = getPreloadReservePx(preloadThresholdPx);
	const isTerminalMode = useListTerminalMode({
		canLoadMore,
		isPending,
	});

	const registerRangeMetrics = useCallback(
		(sample: WindowedRangeDebugSample) => {
			if (!debugLogger) {
				return;
			}

			const event = getRangeUpdateDebugEvent(sample);
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
		buildVirtualRangeConfig({
			itemHeight,
			overscan,
			minRenderCount,
			viewportHeightPx: preloadThresholdPx,
			enabled: canLoadMore,
			onMetrics: registerRangeMetrics,
		}),
	);

	const shouldRenderAllPosts = isTerminalMode;
	const renderedPosts = useMemo(
		() => getRenderedPosts(posts, visibleRange, shouldRenderAllPosts),
		[posts, shouldRenderAllPosts, visibleRange],
	);

	useWindowedRangeLoadMore({
		canLoadMore,
		isPending,
		postsLength: posts.length,
		visibleRangeStart: visibleRange.start,
		visibleRangeEnd: visibleRange.end,
		remainingPx,
		preloadReservePx,
		loadMore,
		debugLogger,
	});

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
					style={createListSpacerStyle(topSpacerPx)}
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
					style={createListSpacerStyle(bottomSpacerPx)}
					aria-hidden="true"
					role="presentation"
				/>
			)}
			{children && (
				<li style={createListChildStyle()} aria-hidden="true">
					{children}
				</li>
			)}
		</MotionBlogPostList>
	);
});
