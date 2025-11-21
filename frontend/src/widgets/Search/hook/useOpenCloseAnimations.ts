"use client";

import { gsap } from "gsap";
import { useCallback } from "react";

export function useOpenCloseAnimations(
	elementRef: React.RefObject<HTMLElement | null>,
) {
	const initOpenAnimation = useCallback(() => {
		if (!elementRef.current) return;

		gsap.fromTo(
			elementRef.current,
			{ opacity: 0, y: -20 },
			{ opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
		);
	}, [elementRef]);

	const closeAnimation = useCallback(() => {
		if (!elementRef.current) return Promise.resolve();

		return new Promise<void>((resolve) => {
			gsap.to(elementRef.current, {
				opacity: 0,
				y: -20,
				duration: 0.2,
				onComplete: () => {
					// DOM 업데이트가 완전히 완료될 때까지 대기
					requestAnimationFrame(() => {
						requestAnimationFrame(() => {
							resolve();
						});
					});
				},
			});
		});
	}, [elementRef]);

	return {
		initOpenAnimation,
		closeAnimation,
	};
}
