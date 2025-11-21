"use client";

import { useCallback, useEffect, useRef } from "react";

export function useOutsideClick(
	ref: React.RefObject<HTMLElement | null>,
	callback: () => void,
) {
	const callbackRef = useRef(callback);
	callbackRef.current = callback;

	const handleOutsideClick = useCallback(
		(event: MouseEvent) => {
			if (!ref.current) return;

			const target = event.target as Node;
			if (!target) return;
			if (ref.current.contains(target)) {
				return;
			}

			callbackRef.current();
		},
		[ref],
	);

	useEffect(() => {
		const timer = setTimeout(() => {
			document.addEventListener("click", handleOutsideClick, true);
			document.addEventListener("mousedown", handleOutsideClick, true);
		}, 10);

		return () => {
			clearTimeout(timer);
			document.removeEventListener("click", handleOutsideClick, true);
			document.removeEventListener("mousedown", handleOutsideClick, true);
		};
	}, [handleOutsideClick]);
}
