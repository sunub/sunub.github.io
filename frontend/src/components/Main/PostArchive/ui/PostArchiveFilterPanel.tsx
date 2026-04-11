"use client";

import {
	ArchiveContentRail,
	ArchiveFilterBar,
	ArchiveFilterButton,
	ArchiveFilterCount,
	ArchiveFilterLabel,
	ArchiveMeta,
} from "../style";
import type { ArchiveSummary, PostArchiveCategoryFilter } from "../types";
import { POST_ARCHIVE_CATEGORY_OPTIONS } from "../utils";

export function PostArchiveFilterPanel({
	selectedCategory,
	isFilterPending,
	archiveMeta,
	counts,
	onSelectCategory,
}: {
	selectedCategory: PostArchiveCategoryFilter;
	isFilterPending: boolean;
	archiveMeta: string;
	counts: ArchiveSummary["counts"];
	onSelectCategory: (nextCategory: PostArchiveCategoryFilter) => void;
}) {
	return (
		<>
			<ArchiveContentRail>
				<ArchiveFilterBar aria-busy={isFilterPending}>
					{POST_ARCHIVE_CATEGORY_OPTIONS.map((option) => {
						const isActive = selectedCategory === option.value;

						return (
							<ArchiveFilterButton
								key={option.value}
								type="button"
								$active={isActive}
								$pending={isFilterPending && !isActive}
								onClick={() => onSelectCategory(option.value)}
								aria-pressed={isActive}
								data-testid={`post-archive-filter-${option.value}`}
							>
								<ArchiveFilterLabel>{option.label}</ArchiveFilterLabel>
								<ArchiveFilterCount>{counts[option.value]}</ArchiveFilterCount>
							</ArchiveFilterButton>
						);
					})}
				</ArchiveFilterBar>
			</ArchiveContentRail>

			<ArchiveContentRail>
				<ArchiveMeta>{archiveMeta}</ArchiveMeta>
			</ArchiveContentRail>
		</>
	);
}
