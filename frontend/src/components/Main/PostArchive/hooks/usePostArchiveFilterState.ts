"use client";

import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useTransition,
} from "react";
import type { ArchiveSummary, PostArchiveCategoryFilter } from "../types";
import { POST_ARCHIVE_CATEGORY_OPTIONS } from "../utils";

export function usePostArchiveFilterState({
	selectedCategory,
	setSelectedCategory,
	summary,
	markManagedScroll,
}: {
	selectedCategory: PostArchiveCategoryFilter;
	setSelectedCategory: Dispatch<SetStateAction<PostArchiveCategoryFilter>>;
	summary: ArchiveSummary;
	markManagedScroll: () => void;
}) {
	const [isFilterPending, startFilterTransition] = useTransition();
	const selectedCategoryOption = POST_ARCHIVE_CATEGORY_OPTIONS.find(
		(option) => option.value === selectedCategory,
	);
	const archiveMeta =
		selectedCategory === "all"
			? `총 ${summary.totalCount}개의 포스트를 한 페이지에서 탐색하고 있습니다.`
			: `${selectedCategoryOption?.description ?? selectedCategory} 카테고리의 포스트 ${summary.counts[selectedCategory]}개를 보고 있습니다.`;

	const handleSelectCategory = useCallback(
		(nextCategory: PostArchiveCategoryFilter) => {
			if (nextCategory === selectedCategory) {
				return;
			}

			markManagedScroll();
			window.scrollTo({
				top: 0,
				behavior: "auto",
			});

			startFilterTransition(() => {
				setSelectedCategory(nextCategory);
			});
		},
		[markManagedScroll, selectedCategory, setSelectedCategory],
	);

	return {
		selectedCategory,
		isFilterPending,
		archiveMeta,
		handleSelectCategory,
	};
}
