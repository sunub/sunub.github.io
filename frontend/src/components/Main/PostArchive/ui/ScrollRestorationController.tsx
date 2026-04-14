"use client";

import { useEffect } from "react";

export function ScrollRestorationController() {
	useEffect(() => {
		if ("scrollRestoration" in history) {
			const originalScrollRestoration = history.scrollRestoration;
			history.scrollRestoration = "manual";
			return () => {
				history.scrollRestoration = originalScrollRestoration;
			};
		}
	}, []);

	return null;
}
