"use client";

import { useEffect, useRef, useState } from "react";

export function useIdleCallback(
	callback: () => void,
	deps: React.DependencyList = [],
) {
	const callbackRef = useRef(callback);
	const [isIdle, setIsIdle] = useState(false);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const requestIdleCallbackPolyfill =
			typeof window !== "undefined" && "requestIdleCallback" in window
				? window.requestIdleCallback
				: (cb: IdleRequestCallback) =>
						setTimeout(
							() => cb({ didTimeout: false, timeRemaining: () => 0 }),
							1,
						);

		const cancelIdleCallbackPolyfill =
			typeof window !== "undefined" && "cancelIdleCallback" in window
				? window.cancelIdleCallback
				: clearTimeout;

		const handle = requestIdleCallbackPolyfill(() => {
			setIsIdle(true);
			callbackRef.current();
		});

		return () => {
			if(typeof handle === "number") {
				cancelIdleCallbackPolyfill(handle);
			}
		};
	}, [...deps]);

	return isIdle;
}
