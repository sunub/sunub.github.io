"use client";

import type {
	FrontMatter,
	ArchiveCategoryFilter as PostArchiveCategoryFilter,
} from "@sunub/types";
import type { RefObject } from "react";
import { useCallback } from "react";
import { useRangeLoadMoreEffect } from "../../NewestPostList/hooks/useRangeLoadMoreEffect";
import {
	getPostArchiveCardKey,
	POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
} from "../utils";
import {
	shouldBootstrapPostArchiveLoad,
	shouldEnablePostArchiveLoadMore,
} from "../utils/postArchiveViewport";
import type {
	PostArchiveViewportFeedPort,
	PostArchiveViewportNavigationPort,
	PostArchiveViewportRestorePort,
} from "./postArchiveViewportPorts";
import { useArchiveScrollRestore } from "./useArchiveScrollRestore";
import { usePostArchiveRestoreVisibleCount } from "./usePostArchiveRestoreVisibleCount";
import { usePostArchiveScrollGate } from "./usePostArchiveScrollGate";
import {
	type PostArchiveViewportRowModel,
	usePostArchiveViewportLayout,
} from "./usePostArchiveViewportLayout";

export interface PostArchiveViewportControllerState {
	list: {
		ref: RefObject<HTMLUListElement | null>;
		columnCount: number;
		rows: PostArchiveViewportRowModel[];
		windowing: {
			enabled: boolean;
			topSpacerPx: number;
			bottomSpacerPx: number;
		};
	};
	navigation: {
		handleCardNavigate: (post: FrontMatter, index: number) => void;
	};
}

export function usePostArchiveViewportController({
	category,
	feed,
	hasPendingRestore,
	restore,
	navigation,
}: {
	category: PostArchiveCategoryFilter;
	feed: PostArchiveViewportFeedPort;
	hasPendingRestore: boolean;
	restore: PostArchiveViewportRestorePort;
	navigation: PostArchiveViewportNavigationPort;
}): PostArchiveViewportControllerState {
	const scrollGate = usePostArchiveScrollGate({
		category,
		hasPendingRestore,
	});
	const layout = usePostArchiveViewportLayout({
		selectedCategory: category,
		visiblePosts: feed.visiblePosts,
		scrollSignal: scrollGate.scrollSignal,
	});

	usePostArchiveRestoreVisibleCount({
		pendingRestore: restore.pendingRestore,
		isFetchingMore: feed.isFetchingMore,
		visibleCount: restore.visibleCount,
		totalCount: feed.totalCount,
		setVisibleCount: restore.setVisibleCount,
	});

	const canBootstrapLoad = shouldBootstrapPostArchiveLoad({
		hasPendingRestore,
		hasUserScrolled: scrollGate.hasUserScrolled,
		isInitialLayoutReady: layout.isInitialLayoutReady,
		listTopOffsetPx:
			layout.listRef.current?.getBoundingClientRect().top ??
			Number.POSITIVE_INFINITY,
		viewportHeightPx: typeof window === "undefined" ? 0 : window.innerHeight,
		listHeightPx: layout.listRef.current?.getBoundingClientRect().height ?? 0,
		remainingPx: layout.remainingPx,
		preloadReservePx: layout.preloadReservePx,
	});

	useRangeLoadMoreEffect({
		canLoadMore: shouldEnablePostArchiveLoadMore({
			hasUserScrolled: scrollGate.hasUserScrolled,
			canBootstrapLoad,
			hasPendingRestore,
			hasMore: feed.hasMore,
			isFetchingMore: feed.isFetchingMore,
			loadMoreError: feed.loadMoreError,
		}),
		postsLength: layout.rowCount,
		visibleRangeEnd: layout.visibleRangeEnd,
		remainingPx: layout.remainingPx,
		preloadReservePx: layout.preloadReservePx,
		loadMore: feed.loadMore,
		enableRemainingItemsCheck: layout.windowing.enabled,
	});

	useArchiveScrollRestore({
		listRef: layout.listRef,
		filteredPosts: feed.visiblePosts,
		columnCount: layout.columnCount,
		estimatedRowHeight: POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
		pendingRestore: restore.pendingRestore,
		isRestoreReady: feed.isVisibleRangeReady,
		getPostKey: getPostArchiveCardKey,
		onBeforeScroll: scrollGate.markManagedScroll,
		onComplete: restore.completeRestore,
	});

	const handleCardNavigate = useCallback(
		(post: FrontMatter, index: number) => {
			navigation.captureAnchor(getPostArchiveCardKey(post), index);
		},
		[navigation],
	);

	return {
		list: {
			ref: layout.listRef,
			columnCount: layout.columnCount,
			rows: layout.rows,
			windowing: layout.windowing,
		},
		navigation: {
			handleCardNavigate,
		},
	};
}
