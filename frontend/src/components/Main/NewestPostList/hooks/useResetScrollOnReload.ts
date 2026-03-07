import { useLayoutEffect } from "react";

function isReloadNavigation() {
	if (typeof window === "undefined") {
		return false;
	}

	const [entry] = performance.getEntriesByType(
		"navigation",
	) as PerformanceNavigationTiming[];
	if (entry?.type) {
		return entry.type === "reload";
	}

	// Legacy fallback for older engines.
	if ("navigation" in performance) {
		const legacyNavigation = performance.navigation as PerformanceNavigation;
		return legacyNavigation.type === legacyNavigation.TYPE_RELOAD;
	}

	return false;
}

export function useResetScrollOnReload() {
	useLayoutEffect(() => {
		if (typeof window === "undefined") {
			return;
		}

		if (!isReloadNavigation()) {
			return;
		}

		const hasScrollRestoration = "scrollRestoration" in window.history;
		const previousScrollRestoration = hasScrollRestoration
			? window.history.scrollRestoration
			: null;
		if (hasScrollRestoration) {
			window.history.scrollRestoration = "manual";
		}

		const resetToTop = () => {
			window.scrollTo(0, 0);
		};

		resetToTop();
		const rafId = window.requestAnimationFrame(resetToTop);
		const timeoutId = window.setTimeout(resetToTop, 0);

		return () => {
			window.cancelAnimationFrame(rafId);
			window.clearTimeout(timeoutId);
			if (hasScrollRestoration && previousScrollRestoration) {
				window.history.scrollRestoration = previousScrollRestoration;
			}
		};
	}, []);
}
