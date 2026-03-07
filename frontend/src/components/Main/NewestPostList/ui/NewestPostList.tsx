"use client";

import { motion, type Variants } from "motion/react";
import { memo, useCallback, useMemo, useRef } from "react";
import { useBlogPostContext } from "../../BlogPost/provider/BlogPostProvider";
import { BlogPostList } from "../../BlogPost/style";
import { BlogPostItem } from "../../BlogPost/ui/BlogPostItem";
import { useListTerminalMode } from "../hooks/useListTerminalMode";
import { useResetScrollOnReload } from "../hooks/useResetScrollOnReload";
import { useWindowedRange } from "../hooks/useWindowedRange";
import { useWindowedRangeLoadMore } from "../hooks/useWindowedRangeLoadMore";
import type { NewestPostListRootProps } from "../types/type";
import {
	BLOG_POST_LIST_IDS,
	createVirtualScrollConfig,
	createVirtualSpacerStyle,
	DEFAULT_VIRTUAL_SCROLL_CONFIG,
	getLoadMoreTriggerDistancePx,
	getLoadMoreViewportThresholdPx,
	getPostsInRenderRange,
} from "../utils/virtualListUtils";
import { useRevealPhase } from "../hooks/useRevealPhase";

const MotionBlogPostList = motion.create(BlogPostList);
const LIST_ID = BLOG_POST_LIST_IDS.id;
const LIST_TEST_ID = BLOG_POST_LIST_IDS.testId;

export const NewestPostList = memo(function NewestPostList({
	children,
	itemHeight = DEFAULT_VIRTUAL_SCROLL_CONFIG.estimatedHeight,
	overscan = DEFAULT_VIRTUAL_SCROLL_CONFIG.overscan,
	minRenderCount = DEFAULT_VIRTUAL_SCROLL_CONFIG.minRenderCount,
}: NewestPostListRootProps) {
	useResetScrollOnReload();

	const { posts, hasMore, totalCount, loadMore, isPending } =
		useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;
	const listRef = useRef<HTMLUListElement>(null);

	const isInitialRevealPhase = useRevealPhase();
	const preloadThresholdPx = getLoadMoreViewportThresholdPx();
	const itemCount = posts.length;

	const shouldEnterTerminalMode = !isPending && !canLoadMore;
	const isTerminalMode = useListTerminalMode({
		shouldEnterTerminalMode,
	});

	const shouldRenderAllPosts = isTerminalMode;
	const shouldUseWindowing = !shouldRenderAllPosts;

	const rangeConfig = useMemo(
		() =>
			createVirtualScrollConfig({
				itemHeight,
				overscan,
				minRenderCount,
				viewportHeightPx: preloadThresholdPx,
				enabled: shouldUseWindowing,
			}),
		[
			itemHeight,
			overscan,
			minRenderCount,
			preloadThresholdPx,
			shouldUseWindowing,
		],
	);

	const {
		visibleRange,
		topSpacerPx,
		bottomSpacerPx,
		registerItemElement,
		remainingPx,
	} = useWindowedRange(listRef, itemCount, rangeConfig);

	const registerPostItemElement = useCallback(
		(index: number, element: HTMLLIElement | null) => {
			registerItemElement(index, element);
		},
		[registerItemElement],
	);

	const renderedPosts = useMemo(
		() => getPostsInRenderRange(posts, visibleRange, shouldRenderAllPosts),
		[posts, shouldRenderAllPosts, visibleRange],
	);

	useWindowedRangeLoadMore({
		canLoadMore,
		isPending,
		postsLength: itemCount,
		visibleRangeEnd: visibleRange.end,
		remainingPx,
		preloadReservePx: getLoadMoreTriggerDistancePx(preloadThresholdPx),
		loadMore,
	});

	const containerVariants = useMemo<Variants>(
		() => ({
			hidden: {},
			visible: {
				transition: {
					staggerChildren: isInitialRevealPhase ? 0.03 : 0,
				},
			},
		}),
		[isInitialRevealPhase],
	);

	return (
		<MotionBlogPostList
			ref={listRef}
			id={LIST_ID}
			data-testid={LIST_TEST_ID}
			variants={containerVariants}
			initial={isInitialRevealPhase ? "hidden" : false}
			animate="visible"
		>
			{!shouldRenderAllPosts && topSpacerPx > 0 && (
				<li
					style={createVirtualSpacerStyle(topSpacerPx)}
					aria-hidden="true"
					role="presentation"
				/>
			)}

			{renderedPosts.map((post, index) => {
				const absoluteIndex = shouldRenderAllPosts
					? index
					: visibleRange.start + index;
				const animationMode = isInitialRevealPhase ? "initial" : "soft";
				return (
					<BlogPostItem
						key={`${post.category}-${post.slug}-${absoluteIndex}`}
						post={post}
						index={absoluteIndex}
						registerItemElement={registerPostItemElement}
						animationMode={animationMode}
					/>
				);
			})}

			{!shouldRenderAllPosts && bottomSpacerPx > 0 && (
				<li
					style={createVirtualSpacerStyle(bottomSpacerPx)}
					aria-hidden="true"
					role="presentation"
				/>
			)}

			{children}
		</MotionBlogPostList>
	);
});
