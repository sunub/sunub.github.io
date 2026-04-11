"use client";

import { useAtomValue, useSetAtom } from "jotai";
import {
	type SetStateAction,
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from "react";
import {
	createArchiveCategoryViewStateAtom,
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
import type {
	PostArchiveViewportNavigationPort,
	PostArchiveViewportRestorePort,
} from "./postArchiveViewportPorts";

export function useArchiveViewState(
	initialCategory: PostArchiveCategoryFilter,
) {
	const [selectedCategory, setSelectedCategory] =
		useState<PostArchiveCategoryFilter>(initialCategory);
	const currentCategoryViewStateAtom = useMemo(
		() => createArchiveCategoryViewStateAtom(selectedCategory),
		[selectedCategory],
	);
	const categoryViewState = useAtomValue(currentCategoryViewStateAtom);
	const setCategoryViewState = useSetAtom(currentCategoryViewStateAtom);
	const [pendingRestore, setPendingRestore] =
		useState<PersistedPostArchiveViewState | null>(null);
	const [isReady, setIsReady] = useState(false);
	const visibleCount = categoryViewState.visibleCount;

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
			setCategoryViewState((currentCategoryState) => {
				const resolvedVisibleCount =
					typeof nextVisibleCount === "function"
						? nextVisibleCount(currentCategoryState.visibleCount)
						: nextVisibleCount;
				const normalizedVisibleCount =
					normalizeArchiveVisibleCount(resolvedVisibleCount);

				if (currentCategoryState.visibleCount === normalizedVisibleCount) {
					return currentCategoryState;
				}

				return {
					...currentCategoryState,
					visibleCount: normalizedVisibleCount,
				};
			});
		},
		[setCategoryViewState],
	);

	const captureAnchor = useCallback(
		(postKey: string, anchorIndex: number) => {
			setCategoryViewState((currentCategoryState) => {
				if (
					currentCategoryState.anchorPostKey === postKey &&
					currentCategoryState.anchorIndex === anchorIndex
				) {
					return currentCategoryState;
				}

				return {
					...currentCategoryState,
					anchorPostKey: postKey,
					anchorIndex,
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
		setCategoryViewState((currentCategoryState) => {
			if (
				currentCategoryState.anchorPostKey === null &&
				currentCategoryState.anchorIndex === null
			) {
				return currentCategoryState;
			}

			return {
				...currentCategoryState,
				anchorPostKey: null,
				anchorIndex: null,
			};
		});
		persistArchiveViewState({
			category: selectedCategory,
			visibleCount,
			anchorPostKey: null,
			anchorIndex: null,
		});
	}, [selectedCategory, setCategoryViewState, visibleCount]);

	const viewportRestore = useMemo<PostArchiveViewportRestorePort>(
		() => ({
			visibleCount,
			setVisibleCount,
			pendingRestore,
			completeRestore,
		}),
		[completeRestore, pendingRestore, setVisibleCount, visibleCount],
	);

	const viewportNavigation = useMemo<PostArchiveViewportNavigationPort>(
		() => ({
			captureAnchor,
		}),
		[captureAnchor],
	);

	return {
		selectedCategory,
		setSelectedCategory,
		visibleCount,
		setVisibleCount,
		pendingRestore,
		completeRestore,
		captureAnchor,
		viewportRestore,
		viewportNavigation,
	};
}
