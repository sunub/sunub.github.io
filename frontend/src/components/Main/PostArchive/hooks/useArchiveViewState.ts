"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import type { PostArchiveCategoryFilter } from "../types";
import { POST_ARCHIVE_INITIAL_VISIBLE_COUNT } from "../utils";
import {
	type PersistedPostArchiveViewState,
	persistArchiveViewState,
	readArchiveCategoryFromLocation,
	readPersistedArchiveViewState,
} from "../utils/archiveViewState";

export function useArchiveViewState() {
	const [selectedCategory, setSelectedCategory] =
		useState<PostArchiveCategoryFilter>("all");
	const [visibleCount, setVisibleCount] = useState(
		POST_ARCHIVE_INITIAL_VISIBLE_COUNT,
	);
	const [pendingRestore, setPendingRestore] =
		useState<PersistedPostArchiveViewState | null>(null);
	const [isReady, setIsReady] = useState(false);

	useLayoutEffect(() => {
		const categoryFromUrl = readArchiveCategoryFromLocation();
		const snapshot = readPersistedArchiveViewState(categoryFromUrl);

		setSelectedCategory(snapshot?.category ?? categoryFromUrl);

		if (snapshot) {
			setVisibleCount(snapshot.visibleCount);
			if (snapshot.anchorPostKey || snapshot.anchorIndex !== null) {
				setPendingRestore(snapshot);
			}
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

	const captureAnchor = useCallback(
		(postKey: string, anchorIndex: number) => {
			persistArchiveViewState({
				category: selectedCategory,
				visibleCount,
				anchorPostKey: postKey,
				anchorIndex,
			});
		},
		[selectedCategory, visibleCount],
	);

	const completeRestore = useCallback(() => {
		setPendingRestore(null);
		persistArchiveViewState({
			category: selectedCategory,
			visibleCount,
			anchorPostKey: null,
			anchorIndex: null,
		});
	}, [selectedCategory, visibleCount]);

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
