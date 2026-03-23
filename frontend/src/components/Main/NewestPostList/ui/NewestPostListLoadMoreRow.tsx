"use client";

import { InfiniteScrollStatus } from "@/components/ui/InfiniteScrollStatus";
import { useBlogPostContext } from "../../BlogPost/provider/BlogPostProvider";

export function NewestPostListLoadMoreRow() {
	const {
		hasMore,
		loadMoreError,
		pendingLoadCount,
		posts,
		retryLoadMore,
		totalCount,
	} = useBlogPostContext();
	const canLoadMore = hasMore && posts.length < totalCount;

	if (loadMoreError && canLoadMore) {
		return (
			<InfiniteScrollStatus
				mode="error"
				caption="추가 포스트를 불러오지 못했습니다"
				detail={loadMoreError}
				onRetry={retryLoadMore}
			/>
		);
	}

	if (!(pendingLoadCount > 0 && canLoadMore)) {
		return null;
	}

	const loadingMessage =
		pendingLoadCount > 1
			? `추가 포스트를 불러오는 중입니다. ${pendingLoadCount}개의 로드 작업이 순차적으로 처리되고 있어요.`
			: "추가 포스트를 불러오는 중입니다.";

	return (
		<InfiniteScrollStatus
			mode="loading"
			caption="Loading Older Posts"
			detail={loadingMessage}
		/>
	);
}
