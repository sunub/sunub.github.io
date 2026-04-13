"use client";

import { useMemo } from "react";
import { useArchiveViewState } from "../hooks/useArchiveViewState";
import { usePostArchiveDataController } from "../hooks/usePostArchiveDataController";
import { usePostArchiveFilterState } from "../hooks/usePostArchiveFilterState";
import { usePostArchiveViewportController } from "../hooks/usePostArchiveViewportController";
import { ArchiveSectionRoot } from "../style";
import type {
	ArchiveSummary,
	PostArchiveCardMediaResolver,
	PostArchiveCategoryFilter,
	PostArchivePageData,
} from "../types";
import { PostArchiveFilterPanel } from "./PostArchiveFilterPanel";
import { PostArchiveHeader } from "./PostArchiveHeader";
import { PostArchiveListView } from "./PostArchiveList";

export function PostArchiveSection({
	initialCategory = "all",
	initialData,
	summary,
	title = "Full Post Archive",
	eyebrow = "All Categories",
	description = "카테고리를 이동하지 않고도 전체 포스트를 훑어볼 수 있는 아카이브입니다. 필터를 전환하면 같은 페이지에서 각 주제의 흐름을 이어서 탐색할 수 있어요.",
	mediaOverrides,
}: {
	initialCategory?: PostArchiveCategoryFilter;
	initialData: PostArchivePageData;
	summary: ArchiveSummary;
	title?: string;
	eyebrow?: string;
	description?: string;
	mediaOverrides?: PostArchiveCardMediaResolver;
}) {
	const archiveViewState = useArchiveViewState(initialCategory);
	const resolvedCounts = useMemo(
		() => ({
			...summary.counts,
			all: summary.totalCount, // summary.totalCount를 항상 all로 사용
		}),
		[summary.counts, summary.totalCount],
	);

	const dataController = usePostArchiveDataController({
		initialCategory,
		initialData,
		counts: resolvedCounts,
		selectedCategory: archiveViewState.selectedCategory,
		visibleCount: archiveViewState.visibleCount,
		setVisibleCount: archiveViewState.setVisibleCount,
	});

	const viewportController = usePostArchiveViewportController({
		category: archiveViewState.selectedCategory,
		feed: dataController.viewportFeed,
		hasPendingRestore: archiveViewState.pendingRestore !== null,
		restore: archiveViewState.viewportRestore,
		navigation: archiveViewState.viewportNavigation,
	});

	const filterState = usePostArchiveFilterState({
		selectedCategory: archiveViewState.selectedCategory,
		setSelectedCategory: archiveViewState.setSelectedCategory,
		summary,
		markManagedScroll: viewportController.scroll.markManagedScroll,
	});

	return (
		<ArchiveSectionRoot data-testid="post-archive-section">
			<PostArchiveHeader
				eyebrow={eyebrow}
				title={title}
				description={description}
			/>

			<PostArchiveFilterPanel
				selectedCategory={filterState.selectedCategory}
				isFilterPending={filterState.isFilterPending}
				archiveMeta={filterState.archiveMeta}
				counts={summary.counts}
				onSelectCategory={filterState.handleSelectCategory}
			/>

			<PostArchiveListView
				viewport={viewportController}
				feed={dataController}
				mediaOverrides={mediaOverrides}
			/>
		</ArchiveSectionRoot>
	);
}
