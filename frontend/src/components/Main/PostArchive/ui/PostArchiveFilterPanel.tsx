"use client";

import {
	ARCHIVE_CATEGORY_OPTIONS,
	type ArchiveSummary,
	type ArchiveCategoryFilter as PostArchiveCategoryFilter,
} from "@sunub/types";
import type { Dispatch, SetStateAction } from "react";
import { memo } from "react";
import { usePostArchiveFilterState } from "../hooks/usePostArchiveFilterState";
import {
	ArchiveContentRail,
	ArchiveFilterBar,
	ArchiveFilterButton,
	ArchiveFilterCount,
	ArchiveFilterLabel,
	ArchiveMeta,
} from "../style";

export const PostArchiveFilterPanel = memo(function PostArchiveFilterPanel({
	selectedCategory,
	setSelectedCategory,
	summary,
}: {
	selectedCategory: PostArchiveCategoryFilter;
	setSelectedCategory: Dispatch<SetStateAction<PostArchiveCategoryFilter>>;
	summary: ArchiveSummary;
}) {
	const filterState = usePostArchiveFilterState({
		selectedCategory,
		setSelectedCategory,
		summary,
	});

	return (
		<>
			<ArchiveContentRail>
				<ArchiveFilterBar aria-busy={filterState.isFilterPending}>
					{ARCHIVE_CATEGORY_OPTIONS.map((option) => {
						const isActive = filterState.selectedCategory === option.value;

						return (
							<ArchiveFilterButton
								key={option.value}
								type="button"
								$active={isActive}
								$pending={filterState.isFilterPending && !isActive}
								onClick={() => filterState.handleSelectCategory(option.value)}
								aria-pressed={isActive}
								data-testid={`post-archive-filter-${option.value}`}
							>
								<ArchiveFilterLabel>{option.label}</ArchiveFilterLabel>
								<ArchiveFilterCount
									data-testid={`post-archive-filter-count-${option.value}`}
								>
									{summary.counts[option.value]}
								</ArchiveFilterCount>
							</ArchiveFilterButton>
						);
					})}
				</ArchiveFilterBar>
			</ArchiveContentRail>

			<ArchiveContentRail>
				<ArchiveMeta>{filterState.archiveMeta}</ArchiveMeta>
			</ArchiveContentRail>
		</>
	);
});
