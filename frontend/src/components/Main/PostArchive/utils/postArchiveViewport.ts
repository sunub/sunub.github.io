export function shouldBootstrapPostArchiveLoad({
	hasPendingRestore,
	hasUserScrolled,
	isInitialLayoutReady,
	scrollOffsetY,
	listHeightPx,
	remainingPx,
	preloadReservePx,
}: {
	hasPendingRestore: boolean;
	hasUserScrolled: boolean;
	isInitialLayoutReady: boolean;
	scrollOffsetY: number;
	listHeightPx: number;
	remainingPx: number;
	preloadReservePx: number;
}) {
	return (
		!hasPendingRestore &&
		!hasUserScrolled &&
		isInitialLayoutReady &&
		scrollOffsetY <= 1 &&
		listHeightPx > 0 &&
		remainingPx <= preloadReservePx
	);
}

export function shouldEnablePostArchiveLoadMore({
	hasUserScrolled,
	canBootstrapLoad,
	hasPendingRestore,
	hasMore,
	isFetchingMore,
	loadMoreError,
}: {
	hasUserScrolled: boolean;
	canBootstrapLoad: boolean;
	hasPendingRestore: boolean;
	hasMore: boolean;
	isFetchingMore: boolean;
	loadMoreError: string | null;
}) {
	return (
		(hasUserScrolled || canBootstrapLoad || hasPendingRestore) &&
		hasMore &&
		!isFetchingMore &&
		loadMoreError === null
	);
}
