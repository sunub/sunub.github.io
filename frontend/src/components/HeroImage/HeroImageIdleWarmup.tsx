"use client";

import { useEffect } from "react";
import {
	getCriticalImageUrls,
	getNextTheme,
} from "@/components/HeroImage/heroImageResources";
import { preloadImages } from "@/components/HeroImage/imagePreloadRegistry";
import { useTheme } from "@/components/Theme/ThemeProvider";

type NetworkInformationLike = {
	effectiveType?: string;
	saveData?: boolean;
};

function canWarmupHeroImages() {
	if (typeof window === "undefined") {
		return false;
	}

	if (window.matchMedia("(max-width: 768px)").matches) {
		return false;
	}

	const connection = (
		navigator as Navigator & {
			connection?: NetworkInformationLike;
			mozConnection?: NetworkInformationLike;
			webkitConnection?: NetworkInformationLike;
		}
	).connection;

	if (!connection) {
		return true;
	}

	if (connection.saveData) {
		return false;
	}

	return (
		connection.effectiveType !== "slow-2g" && connection.effectiveType !== "2g"
	);
}

function requestIdleWork(callback: () => void) {
	if ("requestIdleCallback" in window) {
		const handle = window.requestIdleCallback(() => callback(), {
			timeout: 1500,
		});

		return () => window.cancelIdleCallback(handle);
	}

	const handle = globalThis.setTimeout(callback, 1);
	return () => globalThis.clearTimeout(handle);
}

function afterLargestContentfulPaint(callback: () => void) {
	if (typeof window === "undefined") {
		return () => {};
	}

	let cleanupIdle = () => {};
	let settled = false;

	function runAfterLcp() {
		if (settled) {
			return;
		}

		settled = true;
		cleanupIdle = requestIdleWork(callback);
	}

	if (document.readyState === "complete") {
		runAfterLcp();
		return () => cleanupIdle();
	}

	const fallbackHandle = globalThis.setTimeout(runAfterLcp, 3000);
	const handleLoad = () => runAfterLcp();
	window.addEventListener("load", handleLoad, { once: true });

	if (!("PerformanceObserver" in window)) {
		return () => {
			globalThis.clearTimeout(fallbackHandle);
			window.removeEventListener("load", handleLoad);
			cleanupIdle();
		};
	}

	const observer = new PerformanceObserver((list) => {
		if (list.getEntries().length > 0) {
			runAfterLcp();
			observer.disconnect();
		}
	});

	try {
		observer.observe({ type: "largest-contentful-paint", buffered: true });
	} catch {
		runAfterLcp();
	}

	return () => {
		globalThis.clearTimeout(fallbackHandle);
		window.removeEventListener("load", handleLoad);
		observer.disconnect();
		cleanupIdle();
	};
}

export function HeroImageIdleWarmup() {
	const { colorTheme } = useTheme();

	useEffect(() => {
		if (!canWarmupHeroImages()) {
			return;
		}

		const nextTheme = getNextTheme(colorTheme);

		return afterLargestContentfulPaint(() => {
			preloadImages(getCriticalImageUrls(nextTheme), {
				fetchPriority: "low",
			});
		});
	}, [colorTheme]);

	return null;
}
