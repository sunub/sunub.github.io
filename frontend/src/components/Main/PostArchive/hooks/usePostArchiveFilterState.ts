"use client";

import type {
	ArchiveSummary,
	ArchiveCategoryFilter as PostArchiveCategoryFilter,
} from "@sunub/types";
import { ARCHIVE_CATEGORY_OPTIONS } from "@sunub/types";
import {
	type Dispatch,
	type SetStateAction,
	useCallback,
	useTransition,
} from "react";

const ARCHIVE_LIST_SELECTOR = '[data-testid="post-archive-list"]';
const ARCHIVE_LIST_SCROLL_OFFSET_PX = 24;

function scrollArchiveListIntoView() {
	const archiveList = document.querySelector<HTMLElement>(
		ARCHIVE_LIST_SELECTOR,
	);
	if (!archiveList) {
		window.scrollTo({
			top: 0,
			behavior: "auto",
		});
		return;
	}

	const nextTop = Math.max(
		0,
		window.scrollY +
			archiveList.getBoundingClientRect().top -
			ARCHIVE_LIST_SCROLL_OFFSET_PX,
	);

	window.scrollTo({
		top: nextTop,
		behavior: "auto",
	});
}

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
	const selectedCategoryOption = ARCHIVE_CATEGORY_OPTIONS.find(
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
			scrollArchiveListIntoView();

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
