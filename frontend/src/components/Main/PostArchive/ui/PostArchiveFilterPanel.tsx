"use client";

import { SITE_PATHS } from "@sunub/contracts";
import type { ArchiveSummary, Categories } from "@sunub/types";
import { ARCHIVE_CATEGORY_OPTIONS } from "@sunub/types";
import Link from "next/link";
import { memo } from "react";
import { getCategoryIcon } from "@/shared/utils/icons";
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
	summary,
}: {
	selectedCategory: Categories | "all";
	summary: ArchiveSummary;
}) {
	const selectedCategoryOption = ARCHIVE_CATEGORY_OPTIONS.find(
		(option) => option.value === selectedCategory,
	);
	const archiveMeta =
		selectedCategory === "all"
			? `총 ${summary.totalCount}개의 포스트를 한 페이지에서 탐색하고 있습니다.`
			: `${selectedCategoryOption?.description ?? selectedCategory} 카테고리의 포스트 ${summary.counts[selectedCategory]}개를 보고 있습니다.`;

	return (
		<>
			<ArchiveContentRail>
				<ArchiveFilterBar>
					{ARCHIVE_CATEGORY_OPTIONS.map((option) => {
						const isActive = selectedCategory === option.value;
						const href =
							option.value === "all"
								? SITE_PATHS.archive
								: SITE_PATHS.archiveCategory(option.value);
						const Icon = getCategoryIcon(option.value);

						return (
							<ArchiveFilterButton
								key={option.value}
								as={Link}
								href={href}
								$active={isActive}
								aria-pressed={isActive}
								data-testid={`post-archive-filter-${option.value}`}
							>
								<ArchiveFilterLabel>
									{Icon && <Icon size={16} style={{ marginRight: 4 }} />}
									{option.label}
								</ArchiveFilterLabel>
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
				<ArchiveMeta>{archiveMeta}</ArchiveMeta>
			</ArchiveContentRail>
		</>
	);
});
