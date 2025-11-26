"use client";

import type { FrontMatter } from "db/blog/Schema";
import { useAtom } from "jotai";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
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

const THROTTLE_DELAY = 100;
const POSTS_PER_PAGE = 10;
const LOAD_DELAY = 500;

export function BlogPostProvider({
	children,
	initialData,
}: {
	children: React.ReactNode;
	initialData: PublishedPost;
}) {
	const [atomState, setAtomState] = useAtom(blogPostAtom);

	const currentData = useMemo(() => {
		if (
			atomState?.frontmatters.length &&
			atomState.frontmatters.length > initialData.frontmatters.length
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
		}
	}, [initialData, setAtomState, atomState]);

	const [isPending, startTransition] = useTransition();
	const isLoadingRef = useRef(false);
	const lastCallTimeRef = useRef(0);

	const loadMore = useCallback(() => {
		const now = Date.now();

		if (
			now - lastCallTimeRef.current < THROTTLE_DELAY ||
			isLoadingRef.current
		) {
			return;
		}

		if (currentData.frontmatters.length >= currentData.totalCount) {
			return;
		}

		lastCallTimeRef.current = now;
		isLoadingRef.current = true;

		startTransition(async () => {
			try {
				const currentLength = currentData.frontmatters.length;
				const nextEnd = currentLength + POSTS_PER_PAGE;

				const [newPostsData] = await Promise.all([
					getAdditionalPost(currentLength, nextEnd),
					new Promise((resolve) => setTimeout(resolve, LOAD_DELAY)),
				]);

				const existingKeys = new Set(
					currentData.frontmatters.map((p) => `${p.category}-${p.slug}`),
				);
				const filteredNewPosts = newPostsData.frontmatters.filter((post) => {
					const key = `${post.category}-${post.slug}`;
					if (existingKeys.has(key)) return false;
					existingKeys.add(key);
					return true;
				});

				if (filteredNewPosts.length > 0) {
					setAtomState((prev) => ({
						totalCount: prev?.totalCount ?? currentData.totalCount,
						frontmatters: [
							...(prev?.frontmatters ?? currentData.frontmatters),
							...filteredNewPosts,
						],
					}));
				}
			} catch (error) {
				console.error("Failed to load more posts:", error);
			} finally {
				isLoadingRef.current = false;
			}
		});
	}, [currentData, setAtomState]);

	const value = useMemo<BlogPostContextValue>(
		() => ({
			posts: currentData.frontmatters,
			totalCount: currentData.totalCount,
			isPending,
			loadMore,
			hasMore: currentData.frontmatters.length < currentData.totalCount,
		}),
		[currentData, isPending, loadMore],
	);

	return (
		<BlogPostContext.Provider value={value}>
			{children}
		</BlogPostContext.Provider>
	);
}
