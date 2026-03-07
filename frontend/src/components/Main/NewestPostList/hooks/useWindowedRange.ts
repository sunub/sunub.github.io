import { useEffect, useRef, useState } from "react";
import { useMeasuredItemHeight } from "./useMeasuredItemHeight";
import type {
	UseWindowedRangeResult,
	VirtualScrollConfig,
	WindowedMetrics,
} from "../types/windowedRange";
import { calculateMeasuredMetrics } from "../utils/calculateWindowMetrics";
import {
	createDisabledMetrics,
	createInitialMetrics,
	EMPTY_WINDOW_METRICS,
} from "../utils/generateMetrics";
import { useWindowedRangeScheduler } from "./useWindowedRangeScheduler";
import { useWindowedRangeController } from "./useWindowedRangeController";
import type {
	RangeConfig,
	MetricsStateConfig,
	MeasurementConfig,
} from "./useWindowedRangeController";

export function useWindowedRange(
	listRef: React.RefObject<HTMLUListElement | null>,
	itemCount: number,
	config: VirtualScrollConfig,
): UseWindowedRangeResult {
	const isEnabled = config.enabled;
	const initialMetrics = isEnabled
		? createInitialMetrics(
				itemCount,
				config.estimatedHeight,
				config.minRenderCount,
			)
		: createDisabledMetrics(itemCount, config.estimatedHeight);
	const [metrics, setMetrics] = useState<WindowedMetrics>(initialMetrics);
	const metricsRef = useRef<WindowedMetrics>(initialMetrics);

	const hasResizeObserver =
		typeof window !== "undefined" && typeof ResizeObserver !== "undefined";

	const {
		measuredHeightsRef,
		registerItemElement,
		commitPendingHeights,
		syncHeightsFromObservedElements,
		getEstimatedHeight,
	} = useMeasuredItemHeight({
		estimatedHeight: config.estimatedHeight,
		isEnabled,
		itemCount,
		onMeasurementChange: () => {
			scheduleRangeUpdate();
		},
	});

	const rangeConfig: RangeConfig = {
		isEnabled,
		estimatedHeight: config.estimatedHeight,
		overscan: config.overscan,
		minRenderCount: config.minRenderCount,
	};

	const metricsStateConfig: MetricsStateConfig = {
		metricsRef,
		setMetrics,
	};

	const measurementConfig: MeasurementConfig = {
		measuredHeightsRef,
		commitPendingHeights,
		syncHeightsFromObservedElements,
		getEstimatedHeight,
		hasResizeObserver,
	};

	const { calculateRange, commitWindowMetrics } = useWindowedRangeController(
		listRef,
		itemCount,
		rangeConfig,
		metricsStateConfig,
		measurementConfig,
	);

	const scheduleRangeUpdate = useWindowedRangeScheduler({
		enabled: isEnabled,
		onFrame: calculateRange,
	});

	useEffect(() => {
		if (!isEnabled) {
			commitWindowMetrics(
				createDisabledMetrics(itemCount, config.estimatedHeight),
			);
		}
	}, [commitWindowMetrics, isEnabled, itemCount, config.estimatedHeight]);

	useEffect(() => {
		if (!isEnabled) {
			return;
		}

		const nextMetrics =
			itemCount === 0
				? EMPTY_WINDOW_METRICS
				: calculateMeasuredMetrics({
						itemCount,
						estimatedHeight: getEstimatedHeight(),
						minRenderCount: config.minRenderCount,
						previousMetrics: metricsRef.current,
						measuredHeightsRef,
					});

		commitWindowMetrics(nextMetrics);
		scheduleRangeUpdate();
	}, [
		commitWindowMetrics,
		config.minRenderCount,
		getEstimatedHeight,
		isEnabled,
		itemCount,
		measuredHeightsRef,
		scheduleRangeUpdate,
	]);

	return {
		...metrics,
		registerItemElement,
	};
}
