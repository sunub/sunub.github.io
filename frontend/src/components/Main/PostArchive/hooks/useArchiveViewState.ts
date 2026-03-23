"use client";

import { useAtom } from "jotai";
import {
	type SetStateAction,
	useCallback,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import {
	archiveCategoryViewStateAtom,
	getArchiveCategoryViewState,
	normalizeArchiveVisibleCount,
} from "../store/archive.atom";
import type { PostArchiveCategoryFilter } from "../types";
import {
	hasArchiveRestoreAnchor,
	type PersistedPostArchiveViewState,
	persistArchiveViewState,
	readArchiveCategoryFromLocation,
	readPersistedArchiveViewState,
} from "../utils/archiveViewState";

export function useArchiveViewState(
	initialCategory: PostArchiveCategoryFilter,
) {
	const [categoryViewState, setCategoryViewState] = useAtom(
		archiveCategoryViewStateAtom,
	);
	const [selectedCategory, setSelectedCategory] =
		useState<PostArchiveCategoryFilter>(initialCategory);
	const [pendingRestore, setPendingRestore] =
		useState<PersistedPostArchiveViewState | null>(null);
	const [isReady, setIsReady] = useState(false);
	const visibleCount = getArchiveCategoryViewState(
		categoryViewState,
		selectedCategory,
	).visibleCount;

	useLayoutEffect(() => {
		const categoryFromUrl = readArchiveCategoryFromLocation();
		const snapshot = readPersistedArchiveViewState(categoryFromUrl);

		setSelectedCategory(snapshot?.category ?? categoryFromUrl);

		if (snapshot && hasArchiveRestoreAnchor(snapshot)) {
			setPendingRestore(snapshot);
		}

		setIsReady(true);
	}, []);

	useEffect(() => {
		if (!isReady) {
			return;
		}

		persistArchiveViewState({
			category: selectedCategory,
			visibleCount,
			anchorPostKey: null,
			anchorIndex: null,
		});
	}, [isReady, selectedCategory, visibleCount]);

	const setVisibleCount = useCallback(
		(nextVisibleCount: SetStateAction<number>) => {
			setCategoryViewState((currentState) => {
				const currentCategoryState = getArchiveCategoryViewState(
					currentState,
					selectedCategory,
				);
				const resolvedVisibleCount =
					typeof nextVisibleCount === "function"
						? nextVisibleCount(currentCategoryState.visibleCount)
						: nextVisibleCount;
				const normalizedVisibleCount =
					normalizeArchiveVisibleCount(resolvedVisibleCount);

				if (currentCategoryState.visibleCount === normalizedVisibleCount) {
					return currentState;
				}

				return {
					...currentState,
					[selectedCategory]: {
						...currentCategoryState,
						visibleCount: normalizedVisibleCount,
					},
				};
			});
		},
		[selectedCategory, setCategoryViewState],
	);

	const captureAnchor = useCallback(
		(postKey: string, anchorIndex: number) => {
			setCategoryViewState((currentState) => {
				const currentCategoryState = getArchiveCategoryViewState(
					currentState,
					selectedCategory,
				);

				return {
					...currentState,
					[selectedCategory]: {
						...currentCategoryState,
						anchorPostKey: postKey,
						anchorIndex,
					},
				};
			});
			persistArchiveViewState({
				category: selectedCategory,
				visibleCount,
				anchorPostKey: postKey,
				anchorIndex,
			});
		},
		[selectedCategory, setCategoryViewState, visibleCount],
	);

	const completeRestore = useCallback(() => {
		setPendingRestore(null);
		setCategoryViewState((currentState) => {
			const currentCategoryState = getArchiveCategoryViewState(
				currentState,
				selectedCategory,
			);

			return {
				...currentState,
				[selectedCategory]: {
					...currentCategoryState,
					anchorPostKey: null,
					anchorIndex: null,
				},
			};
		});
		persistArchiveViewState({
			category: selectedCategory,
			visibleCount,
			anchorPostKey: null,
			anchorIndex: null,
		});
	}, [selectedCategory, setCategoryViewState, visibleCount]);

	return {
		selectedCategory,
		setSelectedCategory,
		visibleCount,
		setVisibleCount,
		pendingRestore,
		completeRestore,
		captureAnchor,
	};
}
