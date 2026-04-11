"use client";

import type { SetStateAction } from "react";
import { useCallback, useMemo } from "react";
import type {
	ArchiveCategoryCounts,
	PostArchiveCategoryFilter,
	PostArchivePageData,
} from "../types";
import { POST_ARCHIVE_LOAD_MORE_COUNT } from "../utils";
import type { PostArchiveViewportFeedPort } from "./postArchiveViewportPorts";
import { useArchiveFeed } from "./useArchiveFeed";

export interface PostArchiveDataControllerState {
	visiblePosts: PostArchivePageData["frontmatters"];
	totalCount: number;
	hasMore: boolean;
	showEmptyState: boolean;
	isFetchingMore: boolean;
	loadMoreError: string | null;
	isVisibleRangeReady: boolean;
	viewportFeed: PostArchiveViewportFeedPort;
	retryLoadMore: () => void;
	loadMore: () => void;
}

export function usePostArchiveDataController({
	initialCategory,
	initialData,
	counts,
	selectedCategory,
	visibleCount,
	setVisibleCount,
}: {
	initialCategory: PostArchiveCategoryFilter;
	initialData: PostArchivePageData;
	counts: ArchiveCategoryCounts;
	selectedCategory: PostArchiveCategoryFilter;
	visibleCount: number;
	setVisibleCount: (nextVisibleCount: SetStateAction<number>) => void;
}): PostArchiveDataControllerState {
	const {
		posts,
		totalCount,
		isFetchingMore,
		loadMoreError,
		isVisibleRangeReady,
		retryLoadMore,
	} = useArchiveFeed({
		initialCategory,
		initialData,
		counts,
		selectedCategory,
		visibleCount,
	});
	const safeVisibleCount = Math.min(visibleCount, totalCount);
	const visiblePosts = useMemo(
		() => posts.slice(0, Math.min(safeVisibleCount, posts.length)),
		[posts, safeVisibleCount],
	);
	const hasMore = posts.length < totalCount;
	const loadMore = useCallback(() => {
		if (isFetchingMore || !hasMore) {
			return;
		}

		setVisibleCount((currentVisibleCount) =>
			Math.min(currentVisibleCount + POST_ARCHIVE_LOAD_MORE_COUNT, totalCount),
		);
	}, [hasMore, isFetchingMore, setVisibleCount, totalCount]);

	return useMemo(
		() => ({
			visiblePosts,
			totalCount,
			hasMore,
			showEmptyState:
				totalCount === 0 && !isFetchingMore && loadMoreError === null,
			isFetchingMore,
			loadMoreError,
			isVisibleRangeReady,
			viewportFeed: {
				visiblePosts,
				totalCount,
				hasMore,
				isFetchingMore,
				loadMoreError,
				isVisibleRangeReady,
				loadMore,
			},
			retryLoadMore,
			loadMore,
		}),
		[
			hasMore,
			isFetchingMore,
			isVisibleRangeReady,
			loadMore,
			loadMoreError,
			retryLoadMore,
			totalCount,
			visiblePosts,
		],
	);
}
