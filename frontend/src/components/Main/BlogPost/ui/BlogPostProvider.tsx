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
	useTransition,
} from "react";
import { blogPostAtom } from "../store/blogPost.atom";
import type { PublishedPost } from "../types";
import { getAdditionalPost } from "../utils/utils";

interface BlogPostContextValue {
	posts: FrontMatter[];
	totalCount: number;
	isPending: boolean;
	loadMore: () => void;
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

export function BlogPostProvider({
	children,
	initialData,
}: {
	children: React.ReactNode;
	initialData: PublishedPost;
}) {
	const [atomState, setAtomState] = useAtom(blogPostAtom);
	const [isPending, startTransition] = useTransition();
	const [hasMoreState, setHasMoreState] = useState(
		initialData.frontmatters.length < initialData.totalCount,
	);
	const isLoadingRef = useRef(false);

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
		if (
			!atomState ||
			initialData.frontmatters.length > atomState.frontmatters.length
		) {
			setAtomState(initialData);
			setHasMoreState(initialData.frontmatters.length < initialData.totalCount);
		}
	}, [atomState, initialData, setAtomState]);

	const loadMore = useCallback(() => {
		if (isLoadingRef.current || !hasMoreState) {
			return;
		}

		if (currentData.frontmatters.length >= currentData.totalCount) {
			setHasMoreState(false);
			return;
		}

		isLoadingRef.current = true;

		startTransition(async () => {
			try {
				const currentLength = currentData.frontmatters.length;
				const nextEnd = currentLength + POSTS_PER_PAGE;
				const newPostsData = await getAdditionalPost(currentLength, nextEnd);
				const nextTotalCount = newPostsData.totalCount;

				const existingKeys = new Set(
					currentData.frontmatters.map(
						(post) => `${post.category}-${post.slug}`,
					),
				);
				const filteredNewPosts = newPostsData.frontmatters.filter(
					(post: FrontMatter) => {
						const key = `${post.category}-${post.slug}`;
						if (existingKeys.has(key)) return false;
						existingKeys.add(key);
						return true;
					},
				);

				const nextLength = currentLength + filteredNewPosts.length;
				const nextHasMore =
					filteredNewPosts.length > 0 && nextLength < nextTotalCount;

				if (filteredNewPosts.length > 0) {
					setAtomState((prev) => ({
						totalCount: nextTotalCount,
						frontmatters: [
							...(prev?.frontmatters ?? currentData.frontmatters),
							...filteredNewPosts,
						],
					}));
				} else if (currentData.totalCount !== nextTotalCount) {
					setAtomState((prev) => ({
						totalCount: nextTotalCount,
						frontmatters: prev?.frontmatters ?? currentData.frontmatters,
					}));
				}

				setHasMoreState(nextHasMore);
			} catch (error) {
				console.error("Failed to load more posts:", error);
			} finally {
				isLoadingRef.current = false;
			}
		});
	}, [currentData, hasMoreState, setAtomState]);

	const value = useMemo<BlogPostContextValue>(
		() => ({
			posts: currentData.frontmatters,
			totalCount: currentData.totalCount,
			isPending,
			loadMore,
			hasMore:
				hasMoreState &&
				currentData.frontmatters.length < currentData.totalCount,
		}),
		[currentData, hasMoreState, isPending, loadMore],
	);

	return (
		<BlogPostContext.Provider value={value}>
			{children}
		</BlogPostContext.Provider>
	);
}
