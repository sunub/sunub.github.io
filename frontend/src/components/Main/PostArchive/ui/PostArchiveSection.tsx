"use client";

import type {
	ArchiveSummary,
	ArchiveCategoryFilter as PostArchiveCategoryFilter,
	PublishedPost as PostArchivePageData,
} from "@sunub/types";
import { useArchiveViewState } from "../hooks/useArchiveViewState";
import { ArchiveSectionRoot } from "../style";
import type { PostArchiveCardMediaResolver } from "../types";
import { PostArchiveFilterPanel } from "./PostArchiveFilterPanel";
import { PostArchiveHeader } from "./PostArchiveHeader";
import { PostArchiveListSection } from "./PostArchiveListSection";

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

	return (
		<ArchiveSectionRoot data-testid="post-archive-section">
			<PostArchiveHeader
				eyebrow={eyebrow}
				title={title}
				description={description}
			/>

			<PostArchiveFilterPanel
				selectedCategory={archiveViewState.selectedCategory}
				setSelectedCategory={archiveViewState.setSelectedCategory}
				summary={summary}
			/>

			<PostArchiveListSection
				initialCategory={initialCategory}
				initialData={initialData}
				summary={summary}
				selectedCategory={archiveViewState.selectedCategory}
				restore={archiveViewState.viewportRestore}
				navigation={archiveViewState.viewportNavigation}
				hasPendingRestore={archiveViewState.pendingRestore !== null}
				mediaOverrides={mediaOverrides}
			/>
		</ArchiveSectionRoot>
	);
}
