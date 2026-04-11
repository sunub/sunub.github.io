import { useCallback, useEffect, useRef } from "react";
import { shouldLoadMoreFromRemainingItems } from "../utils/virtualListUtils";

type RangeLoadMoreEffectOptions = {
	canLoadMore: boolean;
	postsLength: number;
	visibleRangeEnd: number;
	remainingPx: number;
	preloadReservePx: number;
	loadMore: () => void;
	enableRemainingItemsCheck?: boolean;
};

const TRIGGER_COOLDOWN_MS = 250;

export const useRangeLoadMoreEffect = ({
	canLoadMore,
	postsLength,
	visibleRangeEnd,
	remainingPx,
	preloadReservePx,
	loadMore,
	enableRemainingItemsCheck = true,
}: RangeLoadMoreEffectOptions): void => {
	const lastRequestedAtRef = useRef<number | null>(null);

	const shouldPreloadNow = useCallback(
		(
			currentPostsLength: number,
			currentRemainingPx: number,
			currentVisibleRangeEnd: number,
		) => {
			const shouldPreloadByPx = currentRemainingPx <= preloadReservePx;
			const shouldPreloadByItems =
				enableRemainingItemsCheck &&
				shouldLoadMoreFromRemainingItems(
					currentPostsLength,
					currentVisibleRangeEnd,
				);
			return shouldPreloadByPx || shouldPreloadByItems;
		},
		[enableRemainingItemsCheck, preloadReservePx],
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
			lastRequestedAtRef.current = null;
			return;
		}

		if (!shouldPreload) {
			return;
		}

		const cooldownElapsed =
			lastRequestedAtRef.current === null
				? Number.MAX_SAFE_INTEGER
				: now - lastRequestedAtRef.current;
		if (cooldownElapsed >= TRIGGER_COOLDOWN_MS) {
			lastRequestedAtRef.current = now;
			loadMore();
			return;
		}

		const retryDelayMs = TRIGGER_COOLDOWN_MS - cooldownElapsed;
		const timeoutId = window.setTimeout(() => {
			lastRequestedAtRef.current =
				typeof performance === "undefined" ? Date.now() : performance.now();
			loadMore();
		}, retryDelayMs);

		return () => {
			window.clearTimeout(timeoutId);
		};
	}, [
		canLoadMore,
		loadMore,
		visibleRangeEnd,
		remainingPx,
		postsLength,
		shouldPreloadNow,
	]);
};
