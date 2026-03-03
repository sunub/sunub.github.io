import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import type {
	UseWindowedRangeResult,
	VirtualScrollConfig,
	WindowedMetrics,
} from "../types/windowedRange";
import {
	buildPrefixHeights,
	clamp,
	findItemIndexAtOffset,
	getElementOuterHeight,
	getViewportPixels,
} from "../utils/rootUtils";

const createInitialMetrics = (
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

const createDisabledMetrics = (
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

export function useWindowedRange(
	listRef: React.RefObject<HTMLUListElement | null>,
	itemCount: number,
	config: VirtualScrollConfig,
): UseWindowedRangeResult {
	const isEnabled = config.enabled;
	const [metrics, setMetrics] = useState<WindowedMetrics>(() =>
		isEnabled
			? createInitialMetrics(
					itemCount,
					config.estimatedHeight,
					config.minRenderCount,
				)
			: createDisabledMetrics(itemCount, config.estimatedHeight),
	);
	const rafId = useRef<number>(0);
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const measuredHeightsRef = useRef<Map<number, number>>(new Map());
	const pendingHeightsRef = useRef<Map<number, number>>(new Map());
	const observedElementsRef = useRef<Map<number, HTMLElement>>(new Map());
	const measuredHeightSumRef = useRef<number>(0);
	const measuredHeightCountRef = useRef<number>(0);
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

	const getEstimatedHeight = useCallback(() => {
		if (measuredHeightCountRef.current <= 0) {
			return config.estimatedHeight;
		}

		return measuredHeightSumRef.current / measuredHeightCountRef.current;
	}, [config.estimatedHeight]);

	const commitPendingHeights = useCallback(() => {
		if (pendingHeightsRef.current.size === 0) {
			return;
		}

		pendingHeightsRef.current.forEach((height, index) => {
			applyMeasuredHeight(index, height);
		});
		pendingHeightsRef.current.clear();
	}, [applyMeasuredHeight]);

	const syncHeightsFromObservedElements = useCallback(() => {
		let changed = false;
		observedElementsRef.current.forEach((element, index) => {
			const nextHeight = getElementOuterHeight(element);
			const prevHeight = measuredHeightsRef.current.get(index);

			if (prevHeight === nextHeight) {
				return;
			}

			pendingHeightsRef.current.set(index, nextHeight);
			changed = true;
		});

		return changed;
	}, []);

	const calculateRange = useCallback(() => {
		const startAt =
			typeof performance === "undefined" ? Date.now() : performance.now();
		const list = listRef.current;
		if (!list) {
			return;
		}

		if (!isEnabled) {
			setMetrics((prev) => {
				const next = createDisabledMetrics(itemCount, config.estimatedHeight);
				if (areWindowedMetricsEqual(prev, next)) {
					return prev;
				}
				return next;
			});
			return;
		}

		if (itemCount === 0) {
			setMetrics({
				visibleRange: { start: 0, end: 0 },
				topSpacerPx: 0,
				bottomSpacerPx: 0,
				totalHeightPx: 0,
				remainingPx: 0,
			});
			return;
		}

		if (!hasResizeObserver && syncHeightsFromObservedElements()) {
			commitPendingHeights();
		}

		commitPendingHeights();

		const fallbackHeight = getEstimatedHeight();
		const getHeight = (index: number) => {
			return measuredHeightsRef.current.get(index) ?? fallbackHeight;
		};

		const prefixHeights = buildPrefixHeights(itemCount, getHeight);
		const totalHeightPx = prefixHeights[itemCount] ?? 0;
		const { viewportStart, viewportEnd } = getViewportPixels(list);
		const visibleStart = Math.max(
			0,
			findItemIndexAtOffset(prefixHeights, viewportStart),
		);
		const visibleEndCandidate = Math.max(
			0,
			findItemIndexAtOffset(prefixHeights, Math.max(viewportEnd - 0.0001, 0)),
		);

		const start = clamp(
			visibleStart - config.overscan,
			0,
			Math.max(itemCount - 1, 0),
		);
		const visibleWindow = Math.max(
			visibleEndCandidate - visibleStart + 1 + config.overscan,
			config.minRenderCount,
		);
		const end = clamp(start + visibleWindow, start + 1, itemCount);

		const topSpacerPx = prefixHeights[start] ?? 0;
		const bottomSpacerPx = Math.max(
			0,
			(prefixHeights[itemCount] ?? 0) - (prefixHeights[end] ?? 0),
		);

		const nextMetrics: WindowedMetrics = {
			visibleRange: {
				start,
				end,
			},
			topSpacerPx,
			bottomSpacerPx,
			totalHeightPx,
			remainingPx: Math.max(
				0,
				totalHeightPx - Math.min(viewportEnd, totalHeightPx),
			),
		};

		let shouldNotify = false;

		setMetrics((prev) => {
			if (areWindowedMetricsEqual(prev, nextMetrics)) {
				return prev;
			}

			shouldNotify = true;
			return nextMetrics;
		});

		if (shouldNotify && typeof config.onMetrics === "function") {
			const rangeUpdateMs =
				(typeof performance === "undefined" ? Date.now() : performance.now()) -
				startAt;

			config.onMetrics({
				timestamp: Date.now(),
				rangeUpdateMs,
				viewportStart,
				viewportEnd,
				visibleRange: {
					start,
					end,
				},
				topSpacerPx,
				bottomSpacerPx,
				totalHeightPx,
				remainingPx: nextMetrics.remainingPx,
				estimatedHeight: config.estimatedHeight,
				preloadThresholdPx: config.preloadThresholdPx,
				itemCount,
				measuredCount: measuredHeightsRef.current.size,
				pendingCount: pendingHeightsRef.current.size,
			});
		}
	}, [
		commitPendingHeights,
		config.estimatedHeight,
		config.minRenderCount,
		config.overscan,
		config.preloadThresholdPx,
		config.onMetrics,
		hasResizeObserver,
		isEnabled,
		itemCount,
		listRef,
		syncHeightsFromObservedElements,
		getEstimatedHeight,
	]);

	const scheduleRangeUpdate = useCallback(() => {
		if (!isEnabled) {
			return;
		}

		if (rafId.current) {
			cancelAnimationFrame(rafId.current);
		}

		rafId.current = requestAnimationFrame(calculateRange);
	}, [calculateRange, isEnabled]);

	const handleResizeEntries = useCallback(
		(entries: ResizeObserverEntry[]) => {
			if (!isEnabled) {
				return;
			}

			let shouldUpdate = false;

			for (const entry of entries) {
				const rawIndex = (entry.target as HTMLElement).dataset
					?.virtualListIndex;

				if (typeof rawIndex !== "string") {
					continue;
				}

				const index = Number.parseInt(rawIndex, 10);

				if (!Number.isFinite(index)) {
					continue;
				}

				const targetElement = entry.target as HTMLElement;
				const nextHeight = getElementOuterHeight(targetElement);
				const prevHeight = measuredHeightsRef.current.get(index);
				if (prevHeight === nextHeight) {
					continue;
				}

				pendingHeightsRef.current.set(index, nextHeight);
				shouldUpdate = true;
			}

			if (shouldUpdate) {
				scheduleRangeUpdate();
			}
		},
		[scheduleRangeUpdate, isEnabled],
	);

	const registerItemElement = useCallback(
		(index: number, el: HTMLElement | null) => {
			if (!isEnabled) {
				return;
			}

			const previousElement = observedElementsRef.current.get(index);

			if (
				previousElement &&
				previousElement !== el &&
				resizeObserverRef.current
			) {
				resizeObserverRef.current.unobserve(previousElement);
			}

			if (!el) {
				if (previousElement) {
					observedElementsRef.current.delete(index);
				}
				return;
			}

			observedElementsRef.current.set(index, el);
			el.dataset.virtualListIndex = String(index);

			if (hasResizeObserver) {
				if (!resizeObserverRef.current) {
					resizeObserverRef.current = new ResizeObserver(handleResizeEntries);
					resizeObserverRef.current.observe(el);
				} else {
					resizeObserverRef.current.observe(el);
				}
			} else {
				pendingHeightsRef.current.set(index, getElementOuterHeight(el));
			}

			scheduleRangeUpdate();
		},
		[hasResizeObserver, handleResizeEntries, isEnabled, scheduleRangeUpdate],
	);

	useLayoutEffect(() => {
		if (!isEnabled) {
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
				rafId.current = 0;
			}
			if (resizeObserverRef.current) {
				resizeObserverRef.current.disconnect();
				resizeObserverRef.current = null;
			}
			observedElementsRef.current.clear();
			pendingHeightsRef.current.clear();
			measuredHeightsRef.current.clear();
			measuredHeightSumRef.current = 0;
			measuredHeightCountRef.current = 0;
			setMetrics(createDisabledMetrics(itemCount, config.estimatedHeight));
			return;
		}

		if (typeof window === "undefined") {
			return;
		}

		if (hasResizeObserver && resizeObserverRef.current === null) {
			resizeObserverRef.current = new ResizeObserver(handleResizeEntries);
			observedElementsRef.current.forEach((element) => {
				resizeObserverRef.current?.observe(element);
			});
		}

		scheduleRangeUpdate();

		return () => {
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}

			if (resizeObserverRef.current) {
				resizeObserverRef.current.disconnect();
				resizeObserverRef.current = null;
			}
			observedElementsRef.current.clear();
		};
	}, [
		config.estimatedHeight,
		handleResizeEntries,
		hasResizeObserver,
		isEnabled,
		itemCount,
		scheduleRangeUpdate,
	]);

	useEffect(() => {
		const onScrollOrResize = () => {
			scheduleRangeUpdate();
		};

		if (!isEnabled) {
			return;
		}

		if (typeof window === "undefined") {
			return;
		}

		window.addEventListener("scroll", onScrollOrResize, { passive: true });
		window.addEventListener("resize", onScrollOrResize);
		return () => {
			window.removeEventListener("scroll", onScrollOrResize);
			window.removeEventListener("resize", onScrollOrResize);
		};
	}, [isEnabled, scheduleRangeUpdate]);

	useEffect(() => {
		if (!isEnabled) {
			setMetrics(createDisabledMetrics(itemCount, config.estimatedHeight));
			return;
		}

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

		setMetrics((prev) => {
			if (itemCount === 0) {
				return {
					visibleRange: { start: 0, end: 0 },
					topSpacerPx: 0,
					bottomSpacerPx: 0,
					totalHeightPx: 0,
					remainingPx: 0,
				};
			}

			const estimatedHeight = getEstimatedHeight();
			const nextEnd = Math.min(
				itemCount,
				Math.max(prev.visibleRange.end, config.minRenderCount),
			);
			const nextStart = Math.min(
				prev.visibleRange.start,
				Math.max(itemCount - 1, 0),
			);
			const nextBottomSpacerPx = Math.max(
				0,
				(itemCount - nextEnd) * estimatedHeight,
			);

			if (
				prev.visibleRange.start === nextStart &&
				prev.visibleRange.end === nextEnd &&
				prev.topSpacerPx === 0 &&
				prev.bottomSpacerPx === nextBottomSpacerPx
			) {
				return prev;
			}

			return {
				visibleRange: {
					start: nextStart,
					end: nextEnd,
				},
				topSpacerPx: 0,
				bottomSpacerPx: nextBottomSpacerPx,
				totalHeightPx: itemCount * estimatedHeight,
				remainingPx: Math.max(0, itemCount * estimatedHeight),
			};
		});

		scheduleRangeUpdate();
	}, [
		config.estimatedHeight,
		config.minRenderCount,
		isEnabled,
		itemCount,
		getEstimatedHeight,
		scheduleRangeUpdate,
	]);

	return {
		...metrics,
		registerItemElement,
	};
}

function areWindowedMetricsEqual(
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
