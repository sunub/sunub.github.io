"use client";

import type {
	ArchiveSummary,
	ArchiveCategoryFilter as PostArchiveCategoryFilter,
	PublishedPost as PostArchivePageData,
} from "@sunub/types";
import { useMemo } from "react";
import type {
	PostArchiveViewportNavigationPort,
	PostArchiveViewportRestorePort,
} from "../hooks/postArchiveViewportPorts";
import { usePostArchiveDataController } from "../hooks/usePostArchiveDataController";
import { usePostArchiveViewportController } from "../hooks/usePostArchiveViewportController";
import type { PostArchiveCardMediaResolver } from "../types";
import { PostArchiveListView } from "./PostArchiveList";

type PostArchiveListSectionProps = {
	initialCategory: PostArchiveCategoryFilter;
	initialData: PostArchivePageData;
	summary: ArchiveSummary;
	selectedCategory: PostArchiveCategoryFilter;
	restore: PostArchiveViewportRestorePort;
	navigation: PostArchiveViewportNavigationPort;
	hasPendingRestore: boolean;
	mediaOverrides?: PostArchiveCardMediaResolver;
};

export function PostArchiveListSection({
	initialCategory,
	initialData,
	summary,
	selectedCategory,
	restore,
	navigation,
	hasPendingRestore,
	mediaOverrides,
}: PostArchiveListSectionProps) {
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

	return (
		<PostArchiveListView
			viewport={viewportController}
			feed={dataController}
			mediaOverrides={mediaOverrides}
		/>
	);
}
