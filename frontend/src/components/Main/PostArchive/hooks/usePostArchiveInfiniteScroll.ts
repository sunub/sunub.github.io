"use client";

import type {
	ArchiveSummary,
	ArchiveCategoryFilter as PostArchiveCategoryFilter,
	PublishedPost as PostArchivePageData,
} from "@sunub/types";
import { useAtom } from "jotai";
import { useCallback, useState, useTransition } from "react";
import { getArchivePostsInRange } from "../api/archive";
import { archivePostsAtomFamily } from "../store/archiveCache";
import { POST_ARCHIVE_LOAD_MORE_COUNT } from "../utils";

export function usePostArchiveInfiniteScroll({
	initialData,
	selectedCategory,
	summary,
}: {
	initialData: PostArchivePageData;
	selectedCategory: PostArchiveCategoryFilter;
	summary: ArchiveSummary;
}) {
	const [cachedPosts, setCachedPosts] = useAtom(
		archivePostsAtomFamily(selectedCategory),
	);
	const posts = cachedPosts ?? initialData.frontmatters;

	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
	const [, startTransition] = useTransition();

	const totalCount = summary.counts[selectedCategory] ?? 0;
	const hasMore = posts.length < totalCount;

	const loadMore = useCallback(async () => {
		if (isFetchingMore || !hasMore) {
			return;
		}

		setIsFetchingMore(true);
		setLoadMoreError(null);

		try {
			const start = posts.length;
			const end = start + POST_ARCHIVE_LOAD_MORE_COUNT;

			const nextData = await getArchivePostsInRange(
				selectedCategory,
				start,
				end,
			);

			startTransition(() => {
				setCachedPosts((currentCached) => {
					const currentPosts = currentCached ?? initialData.frontmatters;
					// Avoid duplicates just in case
					const existingKeys = new Set(
						currentPosts.map((p) => `${p.category}/${p.slug}`),
					);
					const newPosts = nextData.frontmatters.filter(
						(p) => !existingKeys.has(`${p.category}/${p.slug}`),
					);
					return [...currentPosts, ...newPosts];
				});
			});
		} catch (error) {
			console.error("Failed to fetch more archive posts:", error);
			setLoadMoreError("포스트를 불러오는 중 오류가 발생했습니다.");
		} finally {
			setIsFetchingMore(false);
		}
	}, [
		isFetchingMore,
		hasMore,
		posts.length,
		selectedCategory,
		setCachedPosts,
		initialData.frontmatters,
	]);

	const retryLoadMore = useCallback(() => {
		loadMore();
	}, [loadMore]);

	return {
		posts,
		isFetchingMore,
		loadMoreError,
		loadMore,
		retryLoadMore,
		hasMore,
	};
}
