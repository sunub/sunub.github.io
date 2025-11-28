"use client";

import { type RefObject, useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
	freezeOnceVisible?: boolean;
	triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
	options: UseIntersectionObserverOptions = {},
): [RefObject<T | null>, boolean] {
	const {
		threshold = 0,
		root = null,
		rootMargin = "0px",
		freezeOnceVisible = false,
		triggerOnce = false,
	} = options;

	const elementRef = useRef<T>(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const element = elementRef.current;
		if (!element) {
			return;
		}

		if (freezeOnceVisible && isVisible) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const isIntersecting = entry.isIntersecting;

				setIsVisible(isIntersecting);

				if (isIntersecting && triggerOnce && element) {
					observer.unobserve(element);
				}
			},
			{ threshold, root, rootMargin },
		);

		observer.observe(element);

		return () => {
			if (element) {
				observer.unobserve(element);
			}
		};
	}, [threshold, root, rootMargin, freezeOnceVisible, triggerOnce, isVisible]);

	return [elementRef, isVisible];
}
