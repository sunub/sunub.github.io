"use client";

import { motion, type Variants } from "motion/react";
import {
	type CSSProperties,
	memo,
	type ReactNode,
	useMemo,
	useRef,
} from "react";
import { BlogPostList } from "../../style";
import { BlogPostItem } from "../BlogPostItem";
import { useBlogPostContext } from "../BlogPostProvider";
import { useWindowedRange, type VirtualScrollConfig } from "./useWindowedRange";

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
	itemHeight: 170,
	overscan: 2,
	minRenderCount: 10,
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
}: {
	itemHeight: number;
	overscan: number;
	minRenderCount: number;
}): VirtualScrollConfig {
	return {
		itemHeight,
		overscan,
		minRenderCount,
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

export const BlogPostListViewRoot = memo(function BlogPostListViewRoot({
	children,
	itemHeight = DEFAULT_VIRTUAL_CONFIG.itemHeight,
	overscan = DEFAULT_VIRTUAL_CONFIG.overscan,
	minRenderCount = DEFAULT_VIRTUAL_CONFIG.minRenderCount,
}: BlogPostListViewRootProps) {
	const { posts } = useBlogPostContext();
	const listRef = useRef<HTMLUListElement>(null);
	const { visibleRange } = useWindowedRange(
		listRef,
		posts.length,
		buildVirtualConfig({
			itemHeight,
			overscan,
			minRenderCount,
		}),
	);

	const renderedPosts = useMemo(
		() => posts.slice(visibleRange.start, visibleRange.end),
		[posts, visibleRange],
	);

	const topSpacerHeight = visibleRange.start * itemHeight;
	const bottomSpacerHeight = Math.max(
		0,
		(posts.length - visibleRange.end) * itemHeight,
	);

	const topSpacerStyle = createSpacerStyle(topSpacerHeight);
	const bottomSpacerStyle = createSpacerStyle(bottomSpacerHeight);

	return (
		<MotionBlogPostList
			ref={listRef}
			id={LIST_ID}
			data-testid={LIST_TEST_ID}
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			{topSpacerHeight > 0 && (
				<li style={topSpacerStyle} aria-hidden="true" role="presentation" />
			)}
			{renderedPosts.map((post, index) => {
				const absoluteIndex = visibleRange.start + index;
				return (
					<BlogPostItem
						key={`${post.category}-${post.slug}-${absoluteIndex}`}
						post={post}
						index={absoluteIndex}
					/>
				);
			})}
			{bottomSpacerHeight > 0 && (
				<li style={bottomSpacerStyle} aria-hidden="true" role="presentation" />
			)}
			{children}
		</MotionBlogPostList>
	);
});
