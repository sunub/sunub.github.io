"use client";

import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getArchivePostsInRange } from "../api/archive";
import {
	archiveFeedCacheAtom,
	preferLongerArchivePageData,
	syncArchiveSeedData,
} from "../store/archive.atom";
import type {
	ArchiveCategoryCounts,
	PostArchiveCategoryFilter,
	PostArchivePageData,
} from "../types";

const LOAD_MORE_ERROR_MESSAGE =
	"추가 아카이브 포스트를 불러오지 못했습니다. 잠시 뒤 다시 시도해 주세요.";
const EMPTY_FRONTMATTERS = [] as PostArchivePageData["frontmatters"];
const inFlightArchiveRequests = new Map<string, Promise<PostArchivePageData>>();

function createArchiveCategoryCacheAtom(category: PostArchiveCategoryFilter) {
	return atom((get) => get(archiveFeedCacheAtom)[category]);
}

function createArchiveRequestKey(
	category: PostArchiveCategoryFilter,
	start: number,
	end: number,
) {
	return `${category}:${start}:${end}`;
}

function getDedupedArchivePostsInRange(
	category: PostArchiveCategoryFilter,
	start: number,
	end: number,
) {
	const requestKey = createArchiveRequestKey(category, start, end);
	const inFlightRequest = inFlightArchiveRequests.get(requestKey);

	if (inFlightRequest) {
		return inFlightRequest;
	}

	const request = getArchivePostsInRange(category, start, end).finally(() => {
		inFlightArchiveRequests.delete(requestKey);
	});

	inFlightArchiveRequests.set(requestKey, request);
	return request;
}

export function useArchiveFeed({
	initialCategory,
	initialData,
	counts,
	selectedCategory,
	visibleCount,
}: {
	initialCategory: PostArchiveCategoryFilter;
	initialData: PostArchivePageData;
	counts: ArchiveCategoryCounts;
	selectedCategory: PostArchiveCategoryFilter;
	visibleCount: number;
}) {
	const setCacheByCategory = useSetAtom(archiveFeedCacheAtom);
	const initialCategoryCacheAtom = useMemo(
		() => createArchiveCategoryCacheAtom(initialCategory),
		[initialCategory],
	);
	const selectedCategoryCacheAtom = useMemo(
		() => createArchiveCategoryCacheAtom(selectedCategory),
		[selectedCategory],
	);
	const initialCategoryData = useAtomValue(initialCategoryCacheAtom);
	const selectedCategoryData = useAtomValue(selectedCategoryCacheAtom);
	const [fetchingByCategory, setFetchingByCategory] = useState<
		Partial<Record<PostArchiveCategoryFilter, boolean>>
	>({});
	const [loadMoreErrorByCategory, setLoadMoreErrorByCategory] = useState<
		Partial<Record<PostArchiveCategoryFilter, string | null>>
	>({});

	useEffect(() => {
		setCacheByCategory((currentCache) => {
			const currentData = currentCache[initialCategory];
			const nextData = syncArchiveSeedData(currentData, initialData);

			if (nextData === currentData) {
				return currentCache;
			}

			return {
				...currentCache,
				[initialCategory]: nextData,
			};
		});
	}, [initialCategory, initialData, setCacheByCategory]);

	const totalCount = counts[selectedCategory] ?? 0;
	const currentSelectedCategoryData = useMemo(() => {
		if (selectedCategory === initialCategory) {
			return initialCategoryData ?? initialData;
		}

		return selectedCategoryData;
	}, [
		initialCategory,
		initialCategoryData,
		initialData,
		selectedCategory,
		selectedCategoryData,
	]);

	const loadedPosts =
		currentSelectedCategoryData?.frontmatters ?? EMPTY_FRONTMATTERS;
	const loadedCount = loadedPosts.length;
	const safeVisibleCount = Math.min(visibleCount, totalCount);
	const isFetchingMore = fetchingByCategory[selectedCategory] ?? false;
	const loadMoreError = loadMoreErrorByCategory[selectedCategory] ?? null;
	const isVisibleRangeReady =
		loadedCount >= safeVisibleCount || loadedCount >= totalCount;
	const shouldFetchMore =
		!isFetchingMore &&
		loadMoreError === null &&
		loadedCount < safeVisibleCount &&
		loadedCount < totalCount;

	const setFetchingForCategory = useCallback(
		(category: PostArchiveCategoryFilter, nextValue: boolean) => {
			setFetchingByCategory((currentState) => {
				if ((currentState[category] ?? false) === nextValue) {
					return currentState;
				}

				return {
					...currentState,
					[category]: nextValue,
				};
			});
		},
		[],
	);

	const setLoadMoreErrorForCategory = useCallback(
		(category: PostArchiveCategoryFilter, nextValue: string | null) => {
			setLoadMoreErrorByCategory((currentState) => {
				if ((currentState[category] ?? null) === nextValue) {
					return currentState;
				}

				return {
					...currentState,
					[category]: nextValue,
				};
			});
		},
		[],
	);

	useEffect(() => {
		if (!shouldFetchMore) {
			return;
		}

		const requestCategory = selectedCategory;
		const requestStart = 0;
		const requestEnd = safeVisibleCount;
		let didCancel = false;

		setFetchingForCategory(requestCategory, true);
		setLoadMoreErrorForCategory(requestCategory, null);

		void getDedupedArchivePostsInRange(
			requestCategory,
			requestStart,
			requestEnd,
		)
			.then((nextData) => {
				if (didCancel) {
					return;
				}

				if (nextData.frontmatters.length < requestEnd) {
					setLoadMoreErrorForCategory(requestCategory, LOAD_MORE_ERROR_MESSAGE);
					return;
				}

				setCacheByCategory((currentCache) => {
					const currentData = currentCache[requestCategory];
					const nextCacheData = preferLongerArchivePageData(
						currentData,
						nextData,
					);

					if (nextCacheData === currentData) {
						return currentCache;
					}

					return {
						...currentCache,
						[requestCategory]: nextCacheData,
					};
				});
			})
			.catch((error) => {
				if (didCancel) {
					return;
				}

				console.error("Failed to fetch archive posts:", error);
				setLoadMoreErrorForCategory(requestCategory, LOAD_MORE_ERROR_MESSAGE);
			})
			.finally(() => {
				setFetchingForCategory(requestCategory, false);
			});

		return () => {
			didCancel = true;
			setFetchingForCategory(requestCategory, false);
		};
	}, [
		safeVisibleCount,
		selectedCategory,
		setCacheByCategory,
		setFetchingForCategory,
		setLoadMoreErrorForCategory,
		shouldFetchMore,
	]);

	const retryLoadMore = useCallback(() => {
		setLoadMoreErrorForCategory(selectedCategory, null);
	}, [selectedCategory, setLoadMoreErrorForCategory]);

	return useMemo(
		() => ({
			posts: loadedPosts,
			totalCount,
			isFetchingMore,
			loadMoreError,
			isVisibleRangeReady,
			retryLoadMore,
		}),
		[
			isFetchingMore,
			isVisibleRangeReady,
			loadMoreError,
			loadedPosts,
			retryLoadMore,
			totalCount,
		],
	);
}
