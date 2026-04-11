"use client";

import type { FrontMatter } from "@sunub/types";
import {
	type RefObject,
	useEffect,
	useMemo,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import { useWindowedRange } from "../../NewestPostList/hooks/useWindowedRange";
import type { VirtualScrollConfig } from "../../NewestPostList/types/windowedRange";
import { createVirtualScrollConfig } from "../../NewestPostList/utils/virtualListUtils";
import type { PostArchiveCategoryFilter } from "../types";
import {
	chunkPostsIntoRows,
	getPostArchiveColumnCount,
	getPostArchiveLoadMoreTriggerDistancePx,
	getPostArchiveLoadMoreViewportThresholdPx,
	getPostArchiveRemainingDistancePx,
	POST_ARCHIVE_ESTIMATED_ROW_HEIGHT,
	POST_ARCHIVE_MIN_RENDER_COUNT,
	POST_ARCHIVE_OVERSCAN,
	POST_ARCHIVE_WINDOWING_ROW_THRESHOLD,
} from "../utils";

function subscribeToViewportWidth(callback: () => void) {
	window.addEventListener("resize", callback);
	return () => {
		window.removeEventListener("resize", callback);
	};
}

function getArchiveColumnSnapshot() {
	return getPostArchiveColumnCount(window.innerWidth);
}

function getArchiveServerSnapshot() {
	return 1;
}

export interface PostArchiveViewportRowModel {
	key: string;
	absoluteRowIndex: number;
	startIndex: number;
	posts: FrontMatter[];
	registerElement: (element: HTMLLIElement | null) => void;
}

export interface PostArchiveViewportLayoutState {
	listRef: RefObject<HTMLUListElement | null>;
	columnCount: number;
	rowCount: number;
	rows: PostArchiveViewportRowModel[];
	visibleRangeEnd: number;
	remainingPx: number;
	preloadReservePx: number;
	isInitialLayoutReady: boolean;
	windowing: {
		enabled: boolean;
		topSpacerPx: number;
		bottomSpacerPx: number;
	};
}

export function usePostArchiveViewportLayout({
	selectedCategory,
	visiblePosts,
}: {
	selectedCategory: PostArchiveCategoryFilter;
	visiblePosts: FrontMatter[];
}): PostArchiveViewportLayoutState {
	const listRef = useRef<HTMLUListElement>(null);
	const columnCount = useSyncExternalStore(
		subscribeToViewportWidth,
		getArchiveColumnSnapshot,
		getArchiveServerSnapshot,
	);
	const rows = useMemo(
		() => chunkPostsIntoRows(visiblePosts, columnCount),
		[columnCount, visiblePosts],
	);
	const preloadThresholdPx = getPostArchiveLoadMoreViewportThresholdPx();
	const preloadReservePx =
		getPostArchiveLoadMoreTriggerDistancePx(preloadThresholdPx);
	const rangeConfig: VirtualScrollConfig = useMemo(
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
		remainingPx,
	} = useWindowedRange(listRef, rows.length, rangeConfig);
	const renderedRows = useMemo(() => {
		if (!rangeConfig.enabled) {
			return rows;
		}

		return rows.slice(visibleRange.start, visibleRange.end);
	}, [rangeConfig.enabled, rows, visibleRange.end, visibleRange.start]);
	const rowModels = useMemo(
		() =>
			renderedRows.map((row, rowIndex) => {
				const absoluteRowIndex = rangeConfig.enabled
					? visibleRange.start + rowIndex
					: rowIndex;

				return {
					key: `${columnCount}-${row.startIndex}`,
					absoluteRowIndex,
					startIndex: row.startIndex,
					posts: row.posts,
					registerElement: (element: HTMLLIElement | null) => {
						registerItemElement(absoluteRowIndex, element);
					},
				};
			}),
		[
			columnCount,
			rangeConfig.enabled,
			registerItemElement,
			renderedRows,
			visibleRange.start,
		],
	);
	const archiveRemainingPx = rangeConfig.enabled
		? remainingPx
		: getPostArchiveRemainingDistancePx(listRef.current);
	const [isInitialLayoutReady, setIsInitialLayoutReady] = useState(false);

	useEffect(() => {
		const layoutVersion = `${columnCount}:${selectedCategory}:${visiblePosts.length}`;
		setIsInitialLayoutReady(false);

		const frameId = window.requestAnimationFrame(() => {
			if (layoutVersion.length > 0) {
				setIsInitialLayoutReady(true);
			}
		});

		return () => {
			window.cancelAnimationFrame(frameId);
		};
	}, [columnCount, selectedCategory, visiblePosts.length]);

	return {
		listRef,
		columnCount,
		rowCount: rows.length,
		rows: rowModels,
		visibleRangeEnd: visibleRange.end,
		remainingPx: archiveRemainingPx,
		preloadReservePx,
		isInitialLayoutReady,
		windowing: {
			enabled: rangeConfig.enabled,
			topSpacerPx,
			bottomSpacerPx,
		},
	};
}
