"use client";

import type { FrontMatter } from "@sunub/types";
import {
	useEffect,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import { useRangeLoadMoreEffect } from "../../NewestPostList/hooks/useRangeLoadMoreEffect";
import { useWindowedRange } from "../../NewestPostList/hooks/useWindowedRange";
import { createVirtualScrollConfig } from "../../NewestPostList/utils/virtualListUtils";
import {
	chunkPostsIntoRows,
	getPostArchiveColumnCount,
	getPostArchiveRemainingDistancePx,
	POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
	POST_ARCHIVE_MAX_PRELOAD_RESERVE_PX,
	POST_ARCHIVE_MIN_PRELOAD_RESERVE_PX,
	POST_ARCHIVE_MIN_PRELOAD_THRESHOLD_PX,
	POST_ARCHIVE_MIN_RENDER_COUNT,
	POST_ARCHIVE_OVERSCAN,
	POST_ARCHIVE_PRELOAD_RESERVE_MULTIPLIER,
	POST_ARCHIVE_PRELOAD_THRESHOLD_MULTIPLIER,
	POST_ARCHIVE_WINDOWING_ROW_THRESHOLD,
} from "../utils";

function subscribeToViewport(callback: () => void) {
	if (typeof window === "undefined") return () => {};
	window.addEventListener("resize", callback);
	return () => {
		window.removeEventListener("resize", callback);
	};
}

const SERVER_VIEWPORT = {
	width: 1200,
	height: 800,
};

let lastViewport = { width: 0, height: 0 };

function getViewportSnapshot() {
	if (typeof window === "undefined") return SERVER_VIEWPORT;

	if (
		lastViewport.width !== window.innerWidth ||
		lastViewport.height !== window.innerHeight
	) {
		lastViewport = {
			width: window.innerWidth,
			height: window.innerHeight,
		};
	}

	return lastViewport;
}

function getViewportServerSnapshot() {
	return SERVER_VIEWPORT;
}

export function usePostArchiveVirtualList({
	posts,
	isFetchingMore,
	loadMoreError,
	loadMore,
	hasMore,
}: {
	posts: FrontMatter[];
	isFetchingMore: boolean;
	loadMoreError: string | null;
	loadMore: () => void;
	hasMore: boolean;
}) {
	const listRef = useRef<HTMLUListElement>(null);
	const viewport = useSyncExternalStore(
		subscribeToViewport,
		getViewportSnapshot,
		getViewportServerSnapshot,
	);

	const columnCount = useMemo(
		() => getPostArchiveColumnCount(viewport.width),
		[viewport.width],
	);

	const rows = useMemo(
		() => chunkPostsIntoRows(posts, columnCount),
		[columnCount, posts],
	);

	const preloadThresholdPx = useMemo(() => {
		return Math.max(
			POST_ARCHIVE_MIN_PRELOAD_THRESHOLD_PX,
			Math.min(
				POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
				Math.ceil(viewport.height * POST_ARCHIVE_PRELOAD_THRESHOLD_MULTIPLIER),
			),
		);
	}, [viewport.height]);

	const preloadReservePx = useMemo(() => {
		return Math.max(
			POST_ARCHIVE_MIN_PRELOAD_RESERVE_PX,
			Math.min(
				POST_ARCHIVE_MAX_PRELOAD_RESERVE_PX,
				Math.ceil(preloadThresholdPx * POST_ARCHIVE_PRELOAD_RESERVE_MULTIPLIER),
			),
		);
	}, [preloadThresholdPx]);

	const rangeConfig = useMemo(
		() =>
			createVirtualScrollConfig({
				itemHeight: POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
				overscan: POST_ARCHIVE_OVERSCAN,
				minRenderCount: POST_ARCHIVE_MIN_RENDER_COUNT,
				viewportHeightPx: preloadThresholdPx,
				enabled: rows.length > POST_ARCHIVE_WINDOWING_ROW_THRESHOLD,
			}),
		[preloadThresholdPx, rows.length],
	);

	const {
		visibleRange,
		topSpacerPx,
		bottomSpacerPx,
		registerItemElement,
		remainingPx: windowedRemainingPx,
	} = useWindowedRange(listRef, rows.length, rangeConfig);
	const [remainingPx, setRemainingPx] = useState(Number.POSITIVE_INFINITY);

	useEffect(() => {
		if (posts.length === 0) {
			setRemainingPx(Number.POSITIVE_INFINITY);
			return;
		}

		if (rangeConfig.enabled) {
			setRemainingPx(windowedRemainingPx);
			return;
		}

		let rafId: number | null = null;
		const updateRemainingDistance = () => {
			setRemainingPx(getPostArchiveRemainingDistancePx(listRef.current));
		};
		const scheduleRemainingDistanceUpdate = () => {
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}

			rafId = requestAnimationFrame(() => {
				rafId = null;
				updateRemainingDistance();
			});
		};

		updateRemainingDistance();
		window.addEventListener("scroll", scheduleRemainingDistanceUpdate, {
			passive: true,
		});
		window.addEventListener("resize", scheduleRemainingDistanceUpdate);

		return () => {
			window.removeEventListener("scroll", scheduleRemainingDistanceUpdate);
			window.removeEventListener("resize", scheduleRemainingDistanceUpdate);
			if (rafId !== null) {
				cancelAnimationFrame(rafId);
			}
		};
	}, [posts.length, rangeConfig.enabled, windowedRemainingPx]);

	// Apply Infinite Scroll Effect
	useRangeLoadMoreEffect({
		canLoadMore: hasMore && !isFetchingMore && loadMoreError === null,
		postsLength: rows.length,
		visibleRangeEnd: visibleRange.end,
		remainingPx,
		preloadReservePx,
		loadMore,
		enableRemainingItemsCheck: rangeConfig.enabled,
	});

	const renderedRows = useMemo(() => {
		if (!rangeConfig.enabled) {
			return rows.map((row, index) => ({
				...row,
				absoluteRowIndex: index,
				key: `${columnCount}-${row.startIndex}`,
			}));
		}

		return rows
			.slice(visibleRange.start, visibleRange.end)
			.map((row, index) => {
				const absoluteRowIndex = visibleRange.start + index;
				return {
					...row,
					absoluteRowIndex,
					key: `${columnCount}-${row.startIndex}`,
				};
			});
	}, [
		columnCount,
		rangeConfig.enabled,
		rows,
		visibleRange.end,
		visibleRange.start,
	]);

	return {
		listRef,
		renderedRows,
		topSpacerPx,
		bottomSpacerPx,
		columnCount,
		registerItemElement,
		windowingEnabled: rangeConfig.enabled,
	};
}
