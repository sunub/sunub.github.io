"use client";

import type {
	ArchiveSummary,
	ArchiveCategoryFilter as PostArchiveCategoryFilter,
	PublishedPost as PostArchivePageData,
} from "@sunub/types";
import { useAtom } from "jotai";
import { memo, useLayoutEffect, useRef } from "react";
import { usePostArchiveInfiniteScroll } from "../hooks/usePostArchiveInfiniteScroll";
import { usePostArchiveVirtualList } from "../hooks/usePostArchiveVirtualList";
import { archiveScrollAtomFamily } from "../store/archiveCache";
import type { PostArchiveCardMediaResolver } from "../types";
import { PostArchiveListView } from "./PostArchiveList";

type PostArchiveListSectionProps = {
	initialData: PostArchivePageData;
	summary: ArchiveSummary;
	selectedCategory: PostArchiveCategoryFilter;
	mediaOverrides?: PostArchiveCardMediaResolver;
};

export const PostArchiveListSection = memo(function PostArchiveListSection({
	initialData,
	summary,
	selectedCategory,
	mediaOverrides,
}: PostArchiveListSectionProps) {
	const {
		posts,
		isFetchingMore,
		loadMoreError,
		loadMore,
		retryLoadMore,
		hasMore,
	} = usePostArchiveInfiniteScroll({
		initialData,
		selectedCategory,
		summary,
	});

	const {
		listRef,
		renderedRows,
		topSpacerPx,
		bottomSpacerPx,
		columnCount,
		registerItemElement,
		windowingEnabled,
	} = usePostArchiveVirtualList({
		posts,
		isFetchingMore,
		loadMoreError,
		loadMore,
		hasMore,
	});

	const [cachedScrollPos, setCachedScrollPos] = useAtom(
		archiveScrollAtomFamily(selectedCategory),
	);
	const isRestored = useRef(false);

	// Restore scroll position
	useLayoutEffect(() => {
		if (cachedScrollPos > 0 && !isRestored.current) {
			window.scrollTo(0, cachedScrollPos);
			isRestored.current = true;
		}
	}, [cachedScrollPos]);

	// Save scroll position
	useLayoutEffect(() => {
		let rafId: number;
		const handleScroll = () => {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				setCachedScrollPos(window.scrollY);
			});
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancelAnimationFrame(rafId);
		};
	}, [setCachedScrollPos]);

	return (
		<PostArchiveListView
			listRef={listRef}
			renderedRows={renderedRows}
			topSpacerPx={topSpacerPx}
			bottomSpacerPx={bottomSpacerPx}
			columnCount={columnCount}
			registerItemElement={registerItemElement}
			windowingEnabled={windowingEnabled}
			isFetchingMore={isFetchingMore}
			loadMoreError={loadMoreError}
			retryLoadMore={retryLoadMore}
			mediaOverrides={mediaOverrides}
		/>
	);
});
