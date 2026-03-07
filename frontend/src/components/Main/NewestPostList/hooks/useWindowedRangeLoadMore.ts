import { useCallback, useEffect, useRef } from "react";
import { shouldLoadMoreFromRemainingItems } from "../utils/virtualListUtils";

type WindowedRangeLoadMoreOptions = {
	canLoadMore: boolean;
	isPending: boolean;
	postsLength: number;
	visibleRangeEnd: number;
	remainingPx: number;
	preloadReservePx: number;
	loadMore: () => void;
};

const TRIGGER_COOLDOWN_MS = 250;

export const useWindowedRangeLoadMore = ({
	canLoadMore,
	isPending,
	postsLength,
	visibleRangeEnd,
	remainingPx,
	preloadReservePx,
	loadMore,
}: WindowedRangeLoadMoreOptions): void => {
	const preloadSignalAtRef = useRef<number | null>(null);
	const lastTriggerAtRef = useRef<number>(0);

	const shouldPreloadNow = useCallback(
		(
			currentPostsLength: number,
			currentRemainingPx: number,
			currentVisibleRangeEnd: number,
		) => {
			const shouldPreloadByPx = currentRemainingPx <= preloadReservePx;
			const shouldPreloadByItems = shouldLoadMoreFromRemainingItems(
				currentPostsLength,
				currentVisibleRangeEnd,
			);
			return shouldPreloadByPx || shouldPreloadByItems;
		},
		[preloadReservePx],
	);

	useEffect(() => {
		const shouldPreload = shouldPreloadNow(
			postsLength,
			remainingPx,
			visibleRangeEnd,
		);
		const now =
			typeof performance === "undefined" ? Date.now() : performance.now();

		if (!canLoadMore) {
			preloadSignalAtRef.current = null;
			lastTriggerAtRef.current = 0;
			return;
		}

		if (!shouldPreload) {
			preloadSignalAtRef.current = null;
			return;
		}

		if (isPending) {
			return;
		}

		if (preloadSignalAtRef.current === null) {
			preloadSignalAtRef.current = now;
		}

		const cooldownElapsed =
			lastTriggerAtRef.current === 0
				? Number.MAX_SAFE_INTEGER
				: now - lastTriggerAtRef.current;
		if (cooldownElapsed < TRIGGER_COOLDOWN_MS) {
			return;
		}
		preloadSignalAtRef.current = null;
		lastTriggerAtRef.current = now;
		loadMore();
	}, [
		canLoadMore,
		loadMore,
		visibleRangeEnd,
		isPending,
		remainingPx,
		postsLength,
		shouldPreloadNow,
	]);
};
