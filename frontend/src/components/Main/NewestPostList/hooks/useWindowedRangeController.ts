import type { Dispatch, RefObject, SetStateAction } from "react";
import { useCallback } from "react";
import type { WindowedMetrics } from "../types/windowedRange";
import { calculateWindowMetrics } from "../utils/calculateWindowMetrics";
import {
	createDisabledMetrics,
	EMPTY_WINDOW_METRICS,
	resolveNextWindowedMetrics,
} from "../utils/generateMetrics";
import { getViewportRangeWithinList } from "../utils/virtualListUtils";

export type RangeConfig = {
	isEnabled: boolean;
	estimatedHeight: number;
	overscan: number;
	minRenderCount: number;
};

export type MetricsStateConfig = {
	metricsRef: RefObject<WindowedMetrics>;
	setMetrics: Dispatch<SetStateAction<WindowedMetrics>>;
};

export type MeasurementConfig = {
	measuredHeightsRef: RefObject<Map<number, number>>;
	commitPendingHeights: () => void;
	syncHeightsFromObservedElements: () => boolean;
	getEstimatedHeight: () => number;
	hasResizeObserver: boolean;
};

export function useWindowedRangeController(
	listRef: RefObject<HTMLUListElement | null>,
	itemCount: number,
	rangeConfig: RangeConfig,
	metricsStateConfig: MetricsStateConfig,
	measurementConfig: MeasurementConfig,
) {
	const { isEnabled, ...config } = rangeConfig;
	const { metricsRef, setMetrics } = metricsStateConfig;
	const {
		measuredHeightsRef,
		commitPendingHeights,
		syncHeightsFromObservedElements,
		getEstimatedHeight,
		hasResizeObserver,
	} = measurementConfig;

	const commitWindowMetrics = useCallback(
		(nextMetrics: WindowedMetrics) => {
			const resolved = resolveNextWindowedMetrics(
				metricsRef.current,
				nextMetrics,
			);

			if (!resolved.didChange) {
				return resolved;
			}

			metricsRef.current = resolved.metrics;
			setMetrics(resolved.metrics);
			return resolved;
		},
		[metricsRef, setMetrics],
	);

	const flushMeasuredHeights = useCallback(() => {
		if (!hasResizeObserver && syncHeightsFromObservedElements()) {
			commitPendingHeights();
		}

		commitPendingHeights();
	}, [
		commitPendingHeights,
		hasResizeObserver,
		syncHeightsFromObservedElements,
	]);

	const calculateRange = useCallback(() => {
		const list = listRef.current;
		if (!list) {
			return;
		}

		if (!isEnabled) {
			commitWindowMetrics(
				createDisabledMetrics(itemCount, config.estimatedHeight),
			);
			return;
		}

		if (itemCount === 0) {
			commitWindowMetrics(EMPTY_WINDOW_METRICS);
			return;
		}

		flushMeasuredHeights();

		const { viewportStart, viewportEnd } = getViewportRangeWithinList(list);
		const nextMetrics = calculateWindowMetrics({
			itemCount,
			overscan: config.overscan,
			minRenderCount: config.minRenderCount,
			viewportStart,
			viewportEnd,
			measuredHeightsRef,
			getEstimatedHeight,
		});
		commitWindowMetrics(nextMetrics);
	}, [
		commitWindowMetrics,
		config.estimatedHeight,
		config.minRenderCount,
		config.overscan,
		flushMeasuredHeights,
		getEstimatedHeight,
		itemCount,
		listRef,
		measuredHeightsRef,
		isEnabled,
	]);

	return {
		commitWindowMetrics,
		calculateRange,
	};
}
