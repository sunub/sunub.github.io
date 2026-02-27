"use client";

import { FrontMatterLoading } from "@/components/Skeletons/ui/ContentLoading";
import { useBlogPostContext } from "../BlogPostProvider";

export function BlogPostListViewLoader() {
	const { isPending, hasMore, posts, totalCount } = useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;

	return (
		<>
			{isPending && canLoadMore && <FrontMatterLoading length={1} isListItem />}
		</>
	);
}
