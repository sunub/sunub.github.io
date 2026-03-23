"use client";
import type { FrontMatter } from "@sunub/types";
import { memo, useCallback, useMemo } from "react";
import { getPostDetailHref } from "@/shared/utils/postRoute";
import { BlogPostItemComposer } from "./BlogPostItemComposer";
import type { BlogPostItemAnimationMode } from "./BlogPostItemRoot";

interface BlogPostItemProps {
	post: FrontMatter;
	index: number;
	registerItemElement?: (index: number, el: HTMLLIElement | null) => void;
	animationMode: BlogPostItemAnimationMode;
}

export const BlogPostItem = memo(function BlogPostItem({
	post,
	index,
	animationMode,
	registerItemElement,
}: BlogPostItemProps) {
	const titleId = `blog-post__recently-post-title-${index}`;
	const titleLinkId = `blog-post__recently-post-link-${index}`;

	const href = getPostDetailHref(post);

	const dateISO = useMemo(() => new Date(post.date).toISOString(), [post.date]);
	const itemRef = useCallback(
		(element: HTMLLIElement | null) => {
			registerItemElement?.(index, element);
		},
		[index, registerItemElement],
	);

	return (
		<BlogPostItemComposer.root
			animationMode={animationMode}
			itemRef={itemRef}
			aria-labelledby={titleId}
			data-testid={`blog-post__recently-${index}-post-item`}
		>
			<BlogPostItemComposer.main
				href={href}
				aria-label={titleLinkId}
				scroll={true}
			>
				<BlogPostItemComposer.title>{post.title}</BlogPostItemComposer.title>
				<BlogPostItemComposer.content>
					{post.summary}
				</BlogPostItemComposer.content>
			</BlogPostItemComposer.main>
			<BlogPostItemComposer.footer dateISO={dateISO} />
		</BlogPostItemComposer.root>
	);
});
