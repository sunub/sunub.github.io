import { useRef, useLayoutEffect, useCallback, useEffect } from "react";

interface UseWindowedRangeSchedulerOptions {
	enabled: boolean;
	onFrame: () => void;
}

export function useWindowedRangeScheduler({
	enabled,
	onFrame,
}: UseWindowedRangeSchedulerOptions) {
	const rafId = useRef<number | null>(null);

	const scheduleRangeUpdate = useCallback(() => {
		if (!enabled) {
			return;
		}

		if (rafId.current !== null) {
			cancelAnimationFrame(rafId.current);
		}

		rafId.current = requestAnimationFrame(onFrame);
	}, [onFrame, enabled]);

	useLayoutEffect(() => {
		if (!enabled) {
			if (rafId.current !== null) {
				cancelAnimationFrame(rafId.current);
				rafId.current = null;
			}
			return;
		}

		scheduleRangeUpdate();
		return () => {
			if (rafId.current !== null) {
				cancelAnimationFrame(rafId.current);
				rafId.current = null;
			}
		};
	}, [enabled, scheduleRangeUpdate]);

	useEffect(() => {
		if (!enabled) {
			return;
		}

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
	}, [enabled, scheduleRangeUpdate]);

	return scheduleRangeUpdate;
}
