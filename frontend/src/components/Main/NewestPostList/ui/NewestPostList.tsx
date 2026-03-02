"use client";

import { motion, type Variants } from "motion/react";
import { memo, useMemo, useRef } from "react";

import { BlogPostList } from "../../BlogPost/style";
import { BlogPostItem } from "../../BlogPost/ui/BlogPostItem";
import { useBlogPostContext } from "../../BlogPost/provider/BlogPostProvider";
import { useWindowedRange } from "../hooks/useWindowedRange";
import type { NewestPostListRootProps } from "../types/type";
import { useListTerminalMode } from "../hooks/useListTerminalMode";
import { useWindowedRangeLoadMore } from "../hooks/useWindowedRangeLoadMore";
import {
	BLOG_POST_LIST_IDS,
	DEFAULT_VIRTUAL_RANGE_CONFIG,
	buildVirtualRangeConfig,
	createListChildStyle,
	createListSpacerStyle,
	getPreloadReservePx,
	getPreloadThresholdPx,
	getRenderedPosts,
} from "../utils/rootUtils";

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

export const NewestPostList = memo(function NewestPostList({
	children,
	itemHeight = DEFAULT_VIRTUAL_RANGE_CONFIG.estimatedHeight,
	overscan = DEFAULT_VIRTUAL_RANGE_CONFIG.overscan,
	minRenderCount = DEFAULT_VIRTUAL_RANGE_CONFIG.minRenderCount,
}: NewestPostListRootProps) {
	const { posts, hasMore, totalCount, loadMore, isPending } =
		useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;
	const listRef = useRef<HTMLUListElement>(null);

	const preloadThresholdPx = getPreloadThresholdPx();
	const preloadReservePx = getPreloadReservePx(preloadThresholdPx);
	const isTerminalMode = useListTerminalMode({
		canLoadMore,
		isPending,
	});

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
						registerItemElement={registerItemElement}
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
