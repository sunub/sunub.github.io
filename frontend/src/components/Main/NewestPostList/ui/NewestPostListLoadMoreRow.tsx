"use client";

import type { CSSProperties } from "react";
import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import { useBlogPostContext } from "../../BlogPost/provider/BlogPostProvider";

const loadingRowStyle: CSSProperties = {
	listStyle: "none",
	margin: 0,
	padding: 0,
	pointerEvents: "none",
	position: "absolute",
	left: 0,
	right: 0,
	top: "auto",
	height: 0,
	overflow: "visible",
	width: "100%",
	display: "block",
	zIndex: 1,
	opacity: 1,
};

export function NewestPostListLoadMoreRow() {
	const { isPending, hasMore, posts, totalCount } = useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;

	if (!(isPending && canLoadMore)) {
		return null;
	}

	return (
		<li style={loadingRowStyle} aria-hidden="true">
			<FrontMatterLoading length={1} isListItem />
		</li>
	);
}
