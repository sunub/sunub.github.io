import { useEffect, useRef } from "react";
import {
	createLoadMoreInvokedEvent,
	isPreloadByItems,
	getLoadMoreReason,
} from "../utils/rootUtils";
import type { BlogPostRangeDebugEvent } from "../types/type";

type WindowedRangeLoadMoreOptions = {
	canLoadMore: boolean;
	isPending: boolean;
	postsLength: number;
	visibleRangeStart: number;
	visibleRangeEnd: number;
	remainingPx: number;
	preloadReservePx: number;
	loadMore: () => void;
	debugLogger?: (event: BlogPostRangeDebugEvent) => void;
};

export const useWindowedRangeLoadMore = ({
	canLoadMore,
	isPending,
	postsLength,
	visibleRangeStart,
	visibleRangeEnd,
	remainingPx,
	preloadReservePx,
	loadMore,
	debugLogger,
}: WindowedRangeLoadMoreOptions): void => {
	const preloadSignalAtRef = useRef<number | null>(null);

	useEffect(() => {
		if (!canLoadMore) {
			preloadSignalAtRef.current = null;
			return;
		}

		const shouldPreloadByPx = remainingPx <= preloadReservePx;
		const shouldPreloadByItems = isPreloadByItems(postsLength, visibleRangeEnd);
		const now =
			typeof performance === "undefined" ? Date.now() : performance.now();

		if (!isPending && (shouldPreloadByPx || shouldPreloadByItems)) {
			if (preloadSignalAtRef.current === null) {
				preloadSignalAtRef.current = now;
			}
		} else {
			preloadSignalAtRef.current = null;
		}

		if (
			canLoadMore &&
			!isPending &&
			(shouldPreloadByPx || shouldPreloadByItems)
		) {
			const reason = getLoadMoreReason(shouldPreloadByPx, shouldPreloadByItems);
			const loadMoreReactionMs =
				preloadSignalAtRef.current === null
					? 0
					: now - preloadSignalAtRef.current;

			if (reason && debugLogger) {
				debugLogger(
					createLoadMoreInvokedEvent({
						now,
						loadMoreReactionMs,
						remainingPx,
						reason,
						preloadReservePx,
						visibleRangeStart,
						visibleRangeEnd,
						canLoadMore,
						isPending,
						itemCount: postsLength,
					}),
				);
			}

			preloadSignalAtRef.current = null;
			loadMore();
		}
	}, [
		canLoadMore,
		debugLogger,
		isPending,
		loadMore,
		postsLength,
		preloadReservePx,
		remainingPx,
		visibleRangeEnd,
		visibleRangeStart,
	]);
};
