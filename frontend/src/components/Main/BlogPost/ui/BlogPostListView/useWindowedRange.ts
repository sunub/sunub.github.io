import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";

export type VirtualRenderRange = {
	start: number;
	end: number;
};

type ListBounds = {
	top: number;
};

export type VirtualScrollConfig = {
	itemHeight: number;
	overscan: number;
	minRenderCount: number;
};

const clamp = (value: number, min: number, max: number) => {
	return Math.max(min, Math.min(max, value));
};

const getListBounds = (list: HTMLUListElement): ListBounds => {
	const rect = list.getBoundingClientRect();
	return {
		top: Math.max(0, rect.top),
	};
};

export const resolveVisibleRange = ({
	viewportStart,
	viewportEnd,
	itemCount,
	itemHeight,
	overscan,
	minRenderCount,
}: {
	viewportStart: number;
	viewportEnd: number;
	itemCount: number;
	itemHeight: number;
	overscan: number;
	minRenderCount: number;
}): VirtualRenderRange => {
	if (itemCount <= 0) {
		return { start: 0, end: 0 };
	}

	const startCandidate = Math.floor(viewportStart / itemHeight) - overscan;
	const endCandidate = Math.ceil(viewportEnd / itemHeight) + overscan;
	const visibleWindow = Math.max(endCandidate - startCandidate, minRenderCount);

	const start = clamp(startCandidate, 0, Math.max(itemCount - 1, 0));
	const end = clamp(start + visibleWindow, start + 1, itemCount);

	return { start, end };
};

const getViewportPixels = (list: HTMLUListElement) => {
	const listBounds = getListBounds(list);
	const listTopOffset = window.scrollY + listBounds.top;
	const viewportStart = Math.max(window.scrollY - listTopOffset, 0);
	const viewportEnd = Math.max(
		window.scrollY + window.innerHeight - listTopOffset,
		0,
	);

	return { viewportStart, viewportEnd };
};

export function useWindowedRange(
	listRef: React.RefObject<HTMLUListElement | null>,
	itemCount: number,
	config: VirtualScrollConfig,
) {
	const [visibleRange, setVisibleRange] = useState<VirtualRenderRange>({
		start: 0,
		end: Math.min(config.minRenderCount, itemCount),
	});
	const rafId = useRef<number>(0);

	const calculateRange = useCallback(() => {
		const list = listRef.current;
		if (!list) {
			return;
		}

		if (itemCount === 0) {
			setVisibleRange({ start: 0, end: 0 });
			return;
		}

		const { viewportStart, viewportEnd } = getViewportPixels(list);
		const nextRange = resolveVisibleRange({
			viewportStart,
			viewportEnd,
			itemCount,
			itemHeight: config.itemHeight,
			overscan: config.overscan,
			minRenderCount: config.minRenderCount,
		});

		setVisibleRange((prev) =>
			prev.start === nextRange.start && prev.end === nextRange.end
				? prev
				: nextRange,
		);
	}, [
		config.itemHeight,
		config.minRenderCount,
		config.overscan,
		itemCount,
		listRef,
	]);

	const scheduleRangeUpdate = useCallback(() => {
		if (rafId.current) {
			cancelAnimationFrame(rafId.current);
		}

		rafId.current = requestAnimationFrame(calculateRange);
	}, [calculateRange]);

	useLayoutEffect(() => {
		scheduleRangeUpdate();
		return () => {
			if (rafId.current) {
				cancelAnimationFrame(rafId.current);
			}
		};
	}, [scheduleRangeUpdate]);

	useEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		const onScrollOrResize = () => {
			scheduleRangeUpdate();
		};

		window.addEventListener("scroll", onScrollOrResize, { passive: true });
		window.addEventListener("resize", onScrollOrResize);
		return () => {
			window.removeEventListener("scroll", onScrollOrResize);
			window.removeEventListener("resize", onScrollOrResize);
		};
	}, [scheduleRangeUpdate]);

	useEffect(() => {
		setVisibleRange((prev) => {
			if (itemCount === 0) {
				return { start: 0, end: 0 };
			}

			const start = clamp(prev.start, 0, Math.max(itemCount - 1, 0));
			const end = clamp(prev.end, start + 1, itemCount);
			if (start === prev.start && end === prev.end) {
				return prev;
			}

			return { start, end };
		});

		scheduleRangeUpdate();
	}, [itemCount, scheduleRangeUpdate]);

	return { visibleRange };
}
