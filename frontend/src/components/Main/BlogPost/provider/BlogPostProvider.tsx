"use client";

import type { FrontMatter } from "@sunub/types";
import { useAtom } from "jotai";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { blogPostAtom } from "../store/blogPost.atom";
import type { PublishedPost } from "../types";
import { getAdditionalPost } from "../utils/utils";

interface BlogPostContextValue {
	posts: FrontMatter[];
	totalCount: number;
	isFetching: boolean;
	pendingLoadCount: number;
	loadMoreError: string | null;
	loadMore: () => void;
	retryLoadMore: () => void;
	hasMore: boolean;
}

const BlogPostContext = createContext<BlogPostContextValue | null>(null);

export function useBlogPostContext() {
	const context = useContext(BlogPostContext);
	if (!context) {
		throw new Error("useBlogPostContext must be used within BlogPostProvider");
	}
	return context;
}

const POSTS_PER_PAGE = 10;
const MAX_QUEUED_LOAD_REQUESTS = 3;
const LOAD_MORE_ERROR_MESSAGE =
	"추가 포스트를 불러오지 못했습니다. 네트워크 상태를 확인한 뒤 다시 시도해 주세요.";

export function BlogPostProvider({
	children,
	initialData,
}: {
	children: React.ReactNode;
	initialData: PublishedPost;
}) {
	const [atomState, setAtomState] = useAtom(blogPostAtom);
	const [isFetching, setIsFetching] = useState(false);
	const [queuedLoadCount, setQueuedLoadCount] = useState(0);
	const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
	const [hasMoreState, setHasMoreState] = useState(
		initialData.frontmatters.length < initialData.totalCount,
	);
	const queuedLoadCountRef = useRef(0);
	const isDrainingQueueRef = useRef(false);
	const currentDataRef = useRef(initialData);
	const hasMoreRef = useRef(hasMoreState);
	const loadMoreErrorRef = useRef<string | null>(null);
	const generationRef = useRef(0);

	const currentData = useMemo(() => {
		if (
			atomState &&
			(atomState.frontmatters.length > initialData.frontmatters.length ||
				atomState.totalCount !== initialData.totalCount)
		) {
			return atomState;
		}
		return initialData;
	}, [atomState, initialData]);

	useEffect(() => {
		currentDataRef.current = currentData;
		hasMoreRef.current =
			hasMoreState && currentData.frontmatters.length < currentData.totalCount;
	}, [currentData, hasMoreState]);

	useEffect(() => {
		if (
			!atomState ||
			initialData.frontmatters.length > atomState.frontmatters.length
		) {
			generationRef.current += 1;
			currentDataRef.current = initialData;
			hasMoreRef.current =
				initialData.frontmatters.length < initialData.totalCount;
			loadMoreErrorRef.current = null;
			queuedLoadCountRef.current = 0;
			setLoadMoreError(null);
			setQueuedLoadCount(0);
			isDrainingQueueRef.current = false;
			setAtomState(initialData);
			setHasMoreState(hasMoreRef.current);
			setIsFetching(false);
		}
	}, [atomState, initialData, setAtomState]);

	const syncHasMoreState = useCallback((nextData: PublishedPost) => {
		const nextHasMore = nextData.frontmatters.length < nextData.totalCount;
		hasMoreRef.current = nextHasMore;
		setHasMoreState(nextHasMore);
	}, []);

	const syncQueuedLoadCount = useCallback((nextCount: number) => {
		queuedLoadCountRef.current = nextCount;
		setQueuedLoadCount(nextCount);
	}, []);

	const clearLoadMoreError = useCallback(() => {
		loadMoreErrorRef.current = null;
		setLoadMoreError(null);
	}, []);

	const fetchNextPage = useCallback(
		async (generationAtStart: number) => {
			const latestData = currentDataRef.current;

			if (generationAtStart !== generationRef.current || !hasMoreRef.current) {
				return;
			}

			if (latestData.frontmatters.length >= latestData.totalCount) {
				hasMoreRef.current = false;
				setHasMoreState(false);
				return;
			}

			const currentLength = latestData.frontmatters.length;
			const nextEnd = currentLength + POSTS_PER_PAGE;
			const newPostsData = await getAdditionalPost(currentLength, nextEnd);

			if (generationAtStart !== generationRef.current) {
				return;
			}

			const nextTotalCount = newPostsData.totalCount;
			const existingKeys = new Set(
				latestData.frontmatters.map((post) => `${post.category}-${post.slug}`),
			);
			const filteredNewPosts = newPostsData.frontmatters.filter(
				(post: FrontMatter) => {
					const key = `${post.category}-${post.slug}`;
					if (existingKeys.has(key)) {
						return false;
					}

					existingKeys.add(key);
					return true;
				},
			);

			const nextData: PublishedPost =
				filteredNewPosts.length > 0
					? {
							totalCount: nextTotalCount,
							frontmatters: [...latestData.frontmatters, ...filteredNewPosts],
						}
					: {
							totalCount: nextTotalCount,
							frontmatters: latestData.frontmatters,
						};

			currentDataRef.current = nextData;
			clearLoadMoreError();
			setAtomState(nextData);
			syncHasMoreState(nextData);
		},
		[clearLoadMoreError, setAtomState, syncHasMoreState],
	);

	const drainQueuedLoads = useCallback(async () => {
		if (isDrainingQueueRef.current) {
			return;
		}

		if (!hasMoreRef.current) {
			syncQueuedLoadCount(0);
			return;
		}

		isDrainingQueueRef.current = true;
		const drainGeneration = generationRef.current;
		setIsFetching(true);

		try {
			while (queuedLoadCountRef.current > 0) {
				if (drainGeneration !== generationRef.current) {
					return;
				}

				if (!hasMoreRef.current) {
					syncQueuedLoadCount(0);
					return;
				}

				syncQueuedLoadCount(queuedLoadCountRef.current - 1);

				try {
					await fetchNextPage(drainGeneration);
				} catch (error) {
					console.error("Failed to load more posts:", error);
					syncQueuedLoadCount(0);
					loadMoreErrorRef.current = LOAD_MORE_ERROR_MESSAGE;
					setLoadMoreError(LOAD_MORE_ERROR_MESSAGE);
					return;
				}
			}
		} finally {
			if (drainGeneration === generationRef.current) {
				setIsFetching(false);
			}
			isDrainingQueueRef.current = false;
		}
	}, [fetchNextPage, syncQueuedLoadCount]);

	const loadMore = useCallback(() => {
		if (!hasMoreRef.current || loadMoreErrorRef.current) {
			return;
		}

		const nextQueuedCount = Math.min(
			queuedLoadCountRef.current + 1,
			MAX_QUEUED_LOAD_REQUESTS,
		);
		if (nextQueuedCount === queuedLoadCountRef.current) {
			return;
		}

		syncQueuedLoadCount(nextQueuedCount);
		void drainQueuedLoads();
	}, [drainQueuedLoads, syncQueuedLoadCount]);

	const retryLoadMore = useCallback(() => {
		if (!hasMoreRef.current || isFetching) {
			return;
		}

		clearLoadMoreError();
		syncQueuedLoadCount(1);
		void drainQueuedLoads();
	}, [clearLoadMoreError, drainQueuedLoads, isFetching, syncQueuedLoadCount]);

	const value = useMemo<BlogPostContextValue>(
		() => ({
			posts: currentData.frontmatters,
			totalCount: currentData.totalCount,
			isFetching,
			pendingLoadCount: queuedLoadCount + (isFetching ? 1 : 0),
			loadMoreError,
			loadMore,
			retryLoadMore,
			hasMore:
				hasMoreState &&
				currentData.frontmatters.length < currentData.totalCount,
		}),
		[
			currentData,
			hasMoreState,
			isFetching,
			loadMore,
			loadMoreError,
			queuedLoadCount,
			retryLoadMore,
		],
	);

	return (
		<BlogPostContext.Provider value={value}>
			{children}
		</BlogPostContext.Provider>
	);
}
