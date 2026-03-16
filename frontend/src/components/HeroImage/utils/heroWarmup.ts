type NetworkInformationLike = {
	effectiveType?: string;
	saveData?: boolean;
};

export function canWarmupHeroImages() {
	if (typeof window === "undefined") {
		return false;
	}

	if (window.matchMedia("(max-width: 768px)").matches) {
		return false;
	}

	if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
	return () => {
		globalThis.clearTimeout(handle);
	};
}

export function scheduleAfterPageLoad(callback: () => void) {
	if (typeof window === "undefined") {
		return () => {};
	}

	if (document.readyState === "complete") {
		return requestIdleWork(callback);
	}

	let cleanupIdle = () => {};
	const handleLoad = () => {
		cleanupIdle = requestIdleWork(callback);
	};

	window.addEventListener("load", handleLoad, { once: true });

	return () => {
		window.removeEventListener("load", handleLoad);
		cleanupIdle();
	};
}
