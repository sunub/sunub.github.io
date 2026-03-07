import type { RefObject } from "react";
import type { WindowedMetrics } from "../types/windowedRange";
import {
	buildCumulativeItemHeights,
	clampNumber,
	findItemIndexForOffset,
} from "./virtualListUtils";

export type CalculateWindowMetricsConfig = {
	itemCount: number;
	overscan: number;
	minRenderCount: number;
	viewportStart: number;
	viewportEnd: number;
	measuredHeightsRef: RefObject<Map<number, number>>;
	getEstimatedHeight: () => number;
};

type CalculateMeasuredMeticsConfig = {
	itemCount: number;
	estimatedHeight: number;
	minRenderCount: number;
	previousMetrics: WindowedMetrics;
	measuredHeightsRef: RefObject<Map<number, number>>;
};

export function calculateWindowMetrics(
	config: CalculateWindowMetricsConfig,
): WindowedMetrics {
	const getHeight = (index: number) => {
		const fallbackHeight = config.getEstimatedHeight();
		return config.measuredHeightsRef.current.get(index) ?? fallbackHeight;
	};

	const cumulativeHeights = buildCumulativeItemHeights(
		config.itemCount,
		getHeight,
	);
	const totalHeightPx = cumulativeHeights[config.itemCount] ?? 0;
	const visibleStart = Math.max(
		0,
		findItemIndexForOffset(cumulativeHeights, config.viewportStart),
	);
	const visibleEndCandidate = Math.max(
		0,
		findItemIndexForOffset(
			cumulativeHeights,
			Math.max(config.viewportEnd - 0.0001, 0),
		),
	);

	const start = clampNumber(
		visibleStart - config.overscan,
		0,
		Math.max(config.itemCount - 1, 0),
	);
	const visibleWindow = Math.max(
		visibleEndCandidate - visibleStart + 1 + config.overscan,
		config.minRenderCount,
	);
	const end = clampNumber(start + visibleWindow, start + 1, config.itemCount);

	const topSpacerPx = cumulativeHeights[start] ?? 0;
	const bottomSpacerPx = Math.max(
		0,
		(cumulativeHeights[config.itemCount] ?? 0) - (cumulativeHeights[end] ?? 0),
	);

	return {
		visibleRange: {
			start,
			end,
		},
		topSpacerPx,
		bottomSpacerPx,
		totalHeightPx,
		remainingPx: Math.max(
			0,
			totalHeightPx - Math.min(config.viewportEnd, totalHeightPx),
		),
	};
}

export function calculateMeasuredMetrics(
	config: CalculateMeasuredMeticsConfig,
): WindowedMetrics {
	if (config.itemCount === 0) {
		return {
			visibleRange: { start: 0, end: 0 },
			topSpacerPx: 0,
			bottomSpacerPx: 0,
			totalHeightPx: 0,
			remainingPx: 0,
		};
	}

	const clampedMaxStart = Math.max(config.itemCount - 1, 0);
	const nextStart = clampNumber(
		config.previousMetrics.visibleRange.start,
		0,
		clampedMaxStart,
	);
	const nextEnd = clampNumber(
		Math.max(
			config.previousMetrics.visibleRange.end,
			nextStart + 1,
			config.minRenderCount,
		),
		nextStart + 1,
		config.itemCount,
	);
	const nextBottomSpacerPx = Math.max(
		0,
		(config.itemCount - nextEnd) * config.estimatedHeight,
	);
	const nextTotalHeightPx = config.itemCount * config.estimatedHeight;
	const estimatedCumulativeHeights = buildCumulativeItemHeights(
		config.itemCount,
		(index) =>
			config.measuredHeightsRef.current.get(index) ?? config.estimatedHeight,
	);
	const nextTopSpacerPx = estimatedCumulativeHeights[nextStart] ?? 0;

	return {
		visibleRange: {
			start: nextStart,
			end: nextEnd,
		},
		topSpacerPx: Math.max(0, nextTopSpacerPx),
		bottomSpacerPx: nextBottomSpacerPx,
		totalHeightPx: nextTotalHeightPx,
		remainingPx: nextBottomSpacerPx,
	};
}
