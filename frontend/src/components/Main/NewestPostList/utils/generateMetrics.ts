import type { WindowedMetrics } from "../types/windowedRange";

export const EMPTY_WINDOW_METRICS: WindowedMetrics = {
	visibleRange: {
		start: 0,
		end: 0,
	},
	topSpacerPx: 0,
	bottomSpacerPx: 0,
	totalHeightPx: 0,
	remainingPx: 0,
};

export const createInitialMetrics = (
	itemCount: number,
	estimatedHeight: number,
	minRenderCount: number,
): WindowedMetrics => {
	const initialEnd = Math.min(itemCount, minRenderCount);
	const totalHeightPx = Math.max(itemCount, 0) * estimatedHeight;
	return {
		visibleRange: {
			start: 0,
			end: initialEnd,
		},
		topSpacerPx: 0,
		bottomSpacerPx: Math.max(0, (itemCount - initialEnd) * estimatedHeight),
		totalHeightPx,
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

export function areWindowedMetricsEqual(
	left: WindowedMetrics,
	right: WindowedMetrics,
) {
	return (
		left.visibleRange.start === right.visibleRange.start &&
		left.visibleRange.end === right.visibleRange.end &&
		left.topSpacerPx === right.topSpacerPx &&
		left.bottomSpacerPx === right.bottomSpacerPx &&
		left.totalHeightPx === right.totalHeightPx &&
		left.remainingPx === right.remainingPx
	);
}

export function resolveNextWindowedMetrics(
	prev: WindowedMetrics,
	next: WindowedMetrics,
) {
	if (areWindowedMetricsEqual(prev, next)) {
		return {
			didChange: false,
			metrics: prev,
		};
	}

	return {
		didChange: true,
		metrics: next,
	};
}
