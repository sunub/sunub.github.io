"use client";

import type {
	ArchiveSummary,
	ArchiveCategoryFilter as PostArchiveCategoryFilter,
	PublishedPost as PostArchivePageData,
} from "@sunub/types";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import type {
	PostArchiveViewportNavigationPort,
	PostArchiveViewportRestorePort,
} from "../hooks/postArchiveViewportPorts";
import { usePostArchiveDataController } from "../hooks/usePostArchiveDataController";
import { usePostArchiveViewportController } from "../hooks/usePostArchiveViewportController";
import type { PostArchiveCardMediaResolver } from "../types";
import { PostArchiveListView } from "./PostArchiveList";

export interface PostArchiveListSectionHandle {
	markManagedScroll: () => void;
}

export const PostArchiveListSection = forwardRef<
	PostArchiveListSectionHandle,
	{
		initialCategory: PostArchiveCategoryFilter;
		initialData: PostArchivePageData;
		summary: ArchiveSummary;
		selectedCategory: PostArchiveCategoryFilter;
		restore: PostArchiveViewportRestorePort;
		navigation: PostArchiveViewportNavigationPort;
		hasPendingRestore: boolean;
		mediaOverrides?: PostArchiveCardMediaResolver;
	}
>(function PostArchiveListSection(
	{
		initialCategory,
		initialData,
		summary,
		selectedCategory,
		restore,
		navigation,
		hasPendingRestore,
		mediaOverrides,
	},
	ref,
) {
	const resolvedCounts = useMemo(
		() => ({
			...summary.counts,
			all: summary.totalCount,
		}),
		[summary.counts, summary.totalCount],
	);

	const dataController = usePostArchiveDataController({
		initialCategory,
		initialData,
		counts: resolvedCounts,
		selectedCategory,
		visibleCount: restore.visibleCount,
		setVisibleCount: restore.setVisibleCount,
	});

	const viewportController = usePostArchiveViewportController({
		category: selectedCategory,
		feed: dataController.viewportFeed,
		hasPendingRestore,
		restore,
		navigation,
	});

	useImperativeHandle(
		ref,
		() => ({
			markManagedScroll: viewportController.scroll.markManagedScroll,
		}),
		[viewportController.scroll.markManagedScroll],
	);

	return (
		<PostArchiveListView
			viewport={viewportController}
			feed={dataController}
			mediaOverrides={mediaOverrides}
		/>
	);
});
