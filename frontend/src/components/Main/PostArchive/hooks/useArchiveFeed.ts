"use client";

import { useAtom } from "jotai";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getArchivePostsInRange } from "../api/archive";
import {
	archiveFeedCacheAtom,
	mergeArchivePageData,
} from "../store/archive.atom";
import type {
	ArchiveCategoryCounts,
	PostArchiveCategoryFilter,
	PostArchivePageData,
} from "../types";

const LOAD_MORE_ERROR_MESSAGE =
	"추가 아카이브 포스트를 불러오지 못했습니다. 잠시 뒤 다시 시도해 주세요.";
const EMPTY_FRONTMATTERS = [] as PostArchivePageData["frontmatters"];

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
	const [cacheByCategory, setCacheByCategory] = useAtom(archiveFeedCacheAtom);
	const [fetchingByCategory, setFetchingByCategory] = useState<
		Partial<Record<PostArchiveCategoryFilter, boolean>>
	>({});
	const [loadMoreErrorByCategory, setLoadMoreErrorByCategory] = useState<
		Partial<Record<PostArchiveCategoryFilter, string | null>>
	>({});
	const inFlightRequestKeysRef = useRef(
		new Map<PostArchiveCategoryFilter, string>(),
	);
	const fulfilledRequestKeysRef = useRef(
		new Map<PostArchiveCategoryFilter, Set<string>>(),
	);
	const isMountedRef = useRef(true);

	useEffect(() => {
		setCacheByCategory((currentCache) => {
			const currentData = currentCache[initialCategory];
			const nextData = mergeArchivePageData(currentData, initialData);

			if (
				currentData &&
				currentData.frontmatters.length === nextData.frontmatters.length &&
				currentData.totalCount === nextData.totalCount
			) {
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
		const cachedData = cacheByCategory[selectedCategory];
		if (selectedCategory !== initialCategory) {
			return cachedData;
		}

		if (!cachedData) {
			return initialData;
		}

		if (
			initialData.frontmatters.length > cachedData.frontmatters.length ||
			initialData.totalCount !== cachedData.totalCount
		) {
			return mergeArchivePageData(cachedData, initialData);
		}

		return cachedData;
	}, [cacheByCategory, initialCategory, initialData, selectedCategory]);
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

	useEffect(() => {
		return () => {
			isMountedRef.current = false;
		};
	}, []);

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
		const requestKey = `${loadedCount}:${safeVisibleCount}`;
		const fulfilledRequestKeys =
			fulfilledRequestKeysRef.current.get(requestCategory) ?? new Set<string>();

		if (!fulfilledRequestKeysRef.current.has(requestCategory)) {
			fulfilledRequestKeysRef.current.set(
				requestCategory,
				fulfilledRequestKeys,
			);
		}

		if (
			inFlightRequestKeysRef.current.get(requestCategory) === requestKey ||
			fulfilledRequestKeys.has(requestKey)
		) {
			return;
		}

		inFlightRequestKeysRef.current.set(requestCategory, requestKey);
		setFetchingForCategory(requestCategory, true);

		void getArchivePostsInRange(requestCategory, loadedCount, safeVisibleCount)
			.then((nextData) => {
				if (!isMountedRef.current) {
					return;
				}

				if (
					nextData.frontmatters.length === 0 &&
					loadedCount < nextData.totalCount
				) {
					setLoadMoreErrorForCategory(requestCategory, LOAD_MORE_ERROR_MESSAGE);
					return;
				}

				fulfilledRequestKeys.add(requestKey);
				setLoadMoreErrorForCategory(requestCategory, null);
				setCacheByCategory((currentCache) => ({
					...currentCache,
					[requestCategory]: mergeArchivePageData(
						currentCache[requestCategory],
						nextData,
					),
				}));
			})
			.catch((error) => {
				if (!isMountedRef.current) {
					return;
				}

				console.error("Failed to fetch archive posts:", error);
				setLoadMoreErrorForCategory(requestCategory, LOAD_MORE_ERROR_MESSAGE);
			})
			.finally(() => {
				if (!isMountedRef.current) {
					return;
				}

				if (
					inFlightRequestKeysRef.current.get(requestCategory) === requestKey
				) {
					inFlightRequestKeysRef.current.delete(requestCategory);
				}
				setFetchingForCategory(requestCategory, false);
			});
	}, [
		loadedCount,
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
