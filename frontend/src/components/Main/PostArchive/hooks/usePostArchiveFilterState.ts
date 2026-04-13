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
	useEffect,
	useRef,
	useTransition,
} from "react";

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
	const pendingCardRevealRef = useRef(false);
	const scrollRestoreFrameRef = useRef<number | null>(null);
	const selectedCategoryOption = ARCHIVE_CATEGORY_OPTIONS.find(
		(option) => option.value === selectedCategory,
	);
	const archiveMeta =
		selectedCategory === "all"
			? `총 ${summary.totalCount}개의 포스트를 한 페이지에서 탐색하고 있습니다.`
			: `${selectedCategoryOption?.description ?? selectedCategory} 카테고리의 포스트 ${summary.counts[selectedCategory]}개를 보고 있습니다.`;

	const cancelScheduledScrollRestore = useCallback(() => {
		if (scrollRestoreFrameRef.current !== null) {
			window.cancelAnimationFrame(scrollRestoreFrameRef.current);
			scrollRestoreFrameRef.current = null;
		}
	}, []);

	const scheduleFirstCardReveal = useCallback(() => {
		cancelScheduledScrollRestore();

		let remainingFrames = 6;

		const revealCard = () => {
			const firstCardElement = document.querySelector<HTMLElement>(
				'[data-testid="post-archive-card-0"]',
			);

			if (firstCardElement) {
				const cardRect = firstCardElement.getBoundingClientRect();
				const viewportHeight = window.innerHeight;
				const isOutsideViewport =
					cardRect.top >= viewportHeight || cardRect.bottom <= 0;

				if (isOutsideViewport) {
					markManagedScroll();
					firstCardElement.scrollIntoView({
						behavior: "auto",
						block: "nearest",
						inline: "nearest",
					});
					scrollRestoreFrameRef.current = null;
					return;
				}
			}

			remainingFrames -= 1;
			if (remainingFrames <= 0) {
				scrollRestoreFrameRef.current = null;
				return;
			}

			scrollRestoreFrameRef.current = window.requestAnimationFrame(revealCard);
		};

		scrollRestoreFrameRef.current = window.requestAnimationFrame(revealCard);
	}, [cancelScheduledScrollRestore, markManagedScroll]);

	useEffect(() => {
		if (isFilterPending || !pendingCardRevealRef.current) {
			return;
		}

		pendingCardRevealRef.current = false;
		scheduleFirstCardReveal();
	}, [isFilterPending, scheduleFirstCardReveal]);

	useEffect(() => {
		return () => {
			cancelScheduledScrollRestore();
		};
	}, [cancelScheduledScrollRestore]);

	const handleSelectCategory = useCallback(
		(nextCategory: PostArchiveCategoryFilter) => {
			if (nextCategory === selectedCategory) {
				return;
			}

			markManagedScroll();
			pendingCardRevealRef.current = true;

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
