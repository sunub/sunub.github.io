"use client";

import { animate } from "motion/react";
import { useCallback } from "react";

export function useOpenCloseAnimations(
	elementRef: React.RefObject<HTMLElement | null>,
) {
	const initOpenAnimation = useCallback(() => {
		if (!elementRef.current) return;

		elementRef.current.style.opacity = "0";
		elementRef.current.style.transform = "translateY(-20px)";

		animate(
			elementRef.current,
			{ opacity: 1, y: 0 },
			{ duration: 0.5, ease: "easeOut" },
		);
	}, [elementRef]);

	const closeAnimation = useCallback(async () => {
		if (!elementRef.current) return;

		await animate(
			elementRef.current,
			{ opacity: 0, y: -20 },
			{ duration: 0.2, ease: "linear" },
		);
	}, [elementRef]);

	return {
		initOpenAnimation,
		closeAnimation,
	};
}
