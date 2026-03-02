import type { WindowedMetrics } from "../types/windowedRange";

export const createInitialMetrics = (
	itemCount: number,
	estimatedHeight: number,
	minRenderCount: number,
): WindowedMetrics => {
	const initialEnd = Math.min(itemCount, minRenderCount);
	return {
		visibleRange: {
			start: 0,
			end: initialEnd,
		},
		topSpacerPx: 0,
		bottomSpacerPx: Math.max(0, (itemCount - initialEnd) * estimatedHeight),
		totalHeightPx: Math.max(itemCount, 0) * estimatedHeight,
		remainingPx: Math.max(0, (itemCount - initialEnd) * estimatedHeight),
	};
};

export const createDisabledMetrics = (
	itemCount: number,
	estimatedHeight: number,
): WindowedMetrics => ({
	visibleRange: {
		start: 0,
		end: itemCount,
	},
	topSpacerPx: 0,
	bottomSpacerPx: 0,
	totalHeightPx: Math.max(itemCount, 0) * estimatedHeight,
	remainingPx: 0,
});
