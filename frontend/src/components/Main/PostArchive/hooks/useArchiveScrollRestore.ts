"use client";

import type { FrontMatter } from "@sunub/types";
import { useEffect, useLayoutEffect, useMemo } from "react";
import type { PersistedPostArchiveViewState } from "../utils/archiveViewState";
import {
	findArchiveCardElement,
	getArchiveAlignedCardTop,
	getArchiveRestoreScrollTop,
	resolveArchiveAnchorIndex,
} from "../utils/archiveViewState";

const MAX_SCROLL_RESTORE_ATTEMPTS = 8;

export function useArchiveScrollRestore({
	listRef,
	filteredPosts,
	columnCount,
	estimatedRowHeight,
	pendingRestore,
	isRestoreReady,
	getPostKey,
	onBeforeScroll,
	onComplete,
}: {
	listRef: React.RefObject<HTMLUListElement | null>;
	filteredPosts: FrontMatter[];
	columnCount: number;
	estimatedRowHeight: number;
	pendingRestore: PersistedPostArchiveViewState | null;
	isRestoreReady: boolean;
	getPostKey: (post: FrontMatter) => string;
	onBeforeScroll?: () => void;
	onComplete: () => void;
}) {
	const anchorIndex = useMemo(() => {
		if (!pendingRestore) {
			return -1;
		}

		return resolveArchiveAnchorIndex(filteredPosts, pendingRestore, getPostKey);
	}, [filteredPosts, getPostKey, pendingRestore]);

	useLayoutEffect(() => {
		if (!pendingRestore) {
			return;
		}

		if (!isRestoreReady) {
			return;
		}

		if (anchorIndex < 0) {
			onComplete();
			return;
		}

		const list = listRef.current;
		if (!list) {
			return;
		}

		const targetRowIndex = Math.floor(anchorIndex / Math.max(columnCount, 1));
		onBeforeScroll?.();
		window.scrollTo({
			top: getArchiveRestoreScrollTop({
				list,
				rowIndex: targetRowIndex,
				estimatedRowHeight,
			}),
			behavior: "auto",
		});
	}, [
		anchorIndex,
		columnCount,
		estimatedRowHeight,
		isRestoreReady,
		listRef,
		onBeforeScroll,
		onComplete,
		pendingRestore,
	]);

	useEffect(() => {
		if (!pendingRestore) {
			return;
		}

		if (!isRestoreReady) {
			return;
		}

		if (anchorIndex < 0) {
			return;
		}

		if (!pendingRestore.anchorPostKey) {
			onComplete();
			return;
		}

		const targetPostKey = pendingRestore.anchorPostKey;
		let rafId: number | null = null;
		let attemptCount = 0;

		const restoreWithMeasuredCard = () => {
			attemptCount += 1;

			const list = listRef.current;
			if (list) {
				const card = findArchiveCardElement(list, targetPostKey);
				if (card) {
					onBeforeScroll?.();
					window.scrollTo({
						top: getArchiveAlignedCardTop(card),
						behavior: "auto",
					});
					onComplete();
					return;
				}
			}

			if (attemptCount >= MAX_SCROLL_RESTORE_ATTEMPTS) {
				onComplete();
				return;
			}

			rafId = window.requestAnimationFrame(restoreWithMeasuredCard);
		};

		rafId = window.requestAnimationFrame(restoreWithMeasuredCard);

		return () => {
			if (rafId !== null) {
				window.cancelAnimationFrame(rafId);
			}
		};
	}, [
		anchorIndex,
		isRestoreReady,
		listRef,
		onBeforeScroll,
		onComplete,
		pendingRestore,
	]);
}
