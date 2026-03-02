"use client";

import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import { useBlogPostContext } from "../../BlogPost/provider/BlogPostProvider";

export function NewestPostListLoadMoreRow() {
	const { isPending, hasMore, posts, totalCount } = useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;

	return (
		<>
			{isPending && canLoadMore && <FrontMatterLoading length={1} isListItem />}
		</>
	);
}
