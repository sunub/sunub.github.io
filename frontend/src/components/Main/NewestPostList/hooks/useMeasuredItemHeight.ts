import { useCallback, useLayoutEffect, useRef } from "react";
import { measureElementOuterHeight } from "../utils/virtualListUtils";

type UseMeasuredItemHeightOptions = {
	estimatedHeight: number;
	isEnabled: boolean;
	itemCount: number;
	onMeasurementChange: () => void;
};

export function useMeasuredItemHeight({
	estimatedHeight,
	isEnabled,
	itemCount,
	onMeasurementChange,
}: UseMeasuredItemHeightOptions) {
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const measuredHeightsRef = useRef<Map<number, number>>(new Map());
	const pendingHeightsRef = useRef<Map<number, number>>(new Map());
	const observedElementsRef = useRef<Map<number, HTMLElement>>(new Map());
	const measuredHeightSumRef = useRef(0);
	const measuredHeightCountRef = useRef(0);
	const hasResizeObserver =
		typeof window !== "undefined" && typeof ResizeObserver !== "undefined";

	const applyMeasuredHeight = useCallback(
		(index: number, nextHeight: number) => {
			const prevHeight = measuredHeightsRef.current.get(index);
			if (prevHeight === nextHeight) {
				return;
			}

			if (typeof prevHeight === "number") {
				measuredHeightSumRef.current -= prevHeight;
			} else {
				measuredHeightCountRef.current += 1;
			}

			measuredHeightSumRef.current += nextHeight;
			measuredHeightsRef.current.set(index, nextHeight);
		},
		[],
	);

	const commitPendingHeights = useCallback(() => {
		if (pendingHeightsRef.current.size === 0) {
			return;
		}

		pendingHeightsRef.current.forEach((height, index) => {
			applyMeasuredHeight(index, height);
		});
		pendingHeightsRef.current.clear();
	}, [applyMeasuredHeight]);

	const getEstimatedHeight = useCallback(() => {
		if (measuredHeightCountRef.current <= 0) {
			return estimatedHeight;
		}

		return measuredHeightSumRef.current / measuredHeightCountRef.current;
	}, [estimatedHeight]);

	const syncHeightsFromObservedElements = useCallback(() => {
		let changed = false;

		observedElementsRef.current.forEach((element, index) => {
			const nextHeight = measureElementOuterHeight(element);
			const prevHeight = measuredHeightsRef.current.get(index);

			if (prevHeight === nextHeight) {
				return;
			}

			pendingHeightsRef.current.set(index, nextHeight);
			changed = true;
		});

		return changed;
	}, []);

	const disconnectResizeObserver = useCallback(() => {
		if (resizeObserverRef.current) {
			resizeObserverRef.current.disconnect();
			resizeObserverRef.current = null;
		}
	}, []);

	const resetMeasuredItems = useCallback(() => {
		disconnectResizeObserver();
		observedElementsRef.current.clear();
		pendingHeightsRef.current.clear();
		measuredHeightsRef.current.clear();
		measuredHeightSumRef.current = 0;
		measuredHeightCountRef.current = 0;
	}, [disconnectResizeObserver]);

	const handleResizeEntries = useCallback(
		(entries: ResizeObserverEntry[]) => {
			if (!isEnabled) {
				return;
			}

			let shouldNotify = false;

			for (const entry of entries) {
				const rawIndex = (entry.target as HTMLElement).dataset.virtualListIndex;
				if (typeof rawIndex !== "string") {
					continue;
				}

				const index = Number.parseInt(rawIndex, 10);
				if (!Number.isFinite(index)) {
					continue;
				}

				const targetElement = entry.target as HTMLElement;
				const nextHeight = measureElementOuterHeight(targetElement);
				const prevHeight = measuredHeightsRef.current.get(index);

				if (prevHeight === nextHeight) {
					continue;
				}

				pendingHeightsRef.current.set(index, nextHeight);
				shouldNotify = true;
			}

			if (shouldNotify) {
				onMeasurementChange();
			}
		},
		[isEnabled, onMeasurementChange],
	);

	const ensureResizeObserver = useCallback(() => {
		if (!isEnabled || !hasResizeObserver || resizeObserverRef.current) {
			return;
		}

		resizeObserverRef.current = new ResizeObserver(handleResizeEntries);
		observedElementsRef.current.forEach((element) => {
			resizeObserverRef.current?.observe(element);
		});
	}, [handleResizeEntries, hasResizeObserver, isEnabled]);

	const registerItemElement = useCallback(
		(index: number, element: HTMLElement | null) => {
			if (!isEnabled) {
				return;
			}

			const previousElement = observedElementsRef.current.get(index);

			if (
				previousElement &&
				previousElement !== element &&
				resizeObserverRef.current
			) {
				resizeObserverRef.current.unobserve(previousElement);
			}

			if (!element) {
				if (previousElement) {
					observedElementsRef.current.delete(index);
				}
				return;
			}

			observedElementsRef.current.set(index, element);
			element.dataset.virtualListIndex = String(index);

			if (hasResizeObserver) {
				ensureResizeObserver();
				resizeObserverRef.current?.observe(element);
			} else {
				pendingHeightsRef.current.set(
					index,
					measureElementOuterHeight(element),
				);
			}

			onMeasurementChange();
		},
		[ensureResizeObserver, hasResizeObserver, isEnabled, onMeasurementChange],
	);

	const pruneMeasurementsBeyondItemCount = useCallback(() => {
		const keysToDelete: number[] = [];

		measuredHeightsRef.current.forEach((_value, key) => {
			if (key >= itemCount) {
				keysToDelete.push(key);
			}
		});

		for (const key of keysToDelete) {
			const element = observedElementsRef.current.get(key);
			if (element && resizeObserverRef.current) {
				resizeObserverRef.current.unobserve(element);
			}

			const removedHeight = measuredHeightsRef.current.get(key);
			if (typeof removedHeight === "number") {
				measuredHeightSumRef.current -= removedHeight;
				measuredHeightCountRef.current -= 1;
				if (measuredHeightCountRef.current < 0) {
					measuredHeightCountRef.current = 0;
				}
			}

			measuredHeightsRef.current.delete(key);
			observedElementsRef.current.delete(key);
			pendingHeightsRef.current.delete(key);
		}
	}, [itemCount]);

	useLayoutEffect(() => {
		if (!isEnabled) {
			resetMeasuredItems();
			return;
		}

		if (typeof window === "undefined") {
			return;
		}

		ensureResizeObserver();

		return () => {
			disconnectResizeObserver();
		};
	}, [
		disconnectResizeObserver,
		ensureResizeObserver,
		isEnabled,
		resetMeasuredItems,
	]);

	useLayoutEffect(() => {
		if (!isEnabled) {
			return;
		}

		pruneMeasurementsBeyondItemCount();
	}, [isEnabled, pruneMeasurementsBeyondItemCount]);

	return {
		measuredHeightsRef,
		pendingHeightsRef,
		registerItemElement,
		commitPendingHeights,
		syncHeightsFromObservedElements,
		getEstimatedHeight,
		resetMeasuredItems,
		pruneMeasurementsBeyondItemCount,
		getMeasuredCount: () => measuredHeightsRef.current.size,
		getPendingCount: () => pendingHeightsRef.current.size,
	};
}
