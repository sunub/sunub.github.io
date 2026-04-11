"use client";

import type { SetStateAction } from "react";
import { useEffect } from "react";
import {
	getNextArchiveRestoreVisibleCount,
	type PersistedPostArchiveViewState,
} from "../utils/archiveViewState";

export function usePostArchiveRestoreVisibleCount({
	pendingRestore,
	isFetchingMore,
	visibleCount,
	totalCount,
	setVisibleCount,
}: {
	pendingRestore: PersistedPostArchiveViewState | null;
	isFetchingMore: boolean;
	visibleCount: number;
	totalCount: number;
	setVisibleCount: (nextVisibleCount: SetStateAction<number>) => void;
}) {
	useEffect(() => {
		if (!pendingRestore || isFetchingMore) {
			return;
		}

		const nextVisibleCount = getNextArchiveRestoreVisibleCount({
			snapshot: pendingRestore,
			currentVisibleCount: visibleCount,
			totalCount,
		});
		if (nextVisibleCount === null) {
			return;
		}

		setVisibleCount(nextVisibleCount);
	}, [
		isFetchingMore,
		pendingRestore,
		setVisibleCount,
		totalCount,
		visibleCount,
	]);
}
