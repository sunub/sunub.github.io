"use client";

import { startTransition, useEffect, useRef, useState } from "react";
import type { Theme } from "type";
import { getCriticalImageUrls, getNextTheme } from "./heroImageResources";
import { canWarmupHeroImages, scheduleAfterPageLoad } from "./heroWarmup";
import { preloadImages } from "./imagePreloadRegistry";

function warmThemeImages(theme: Theme, warmedThemes: Set<Theme>) {
	if (warmedThemes.has(theme)) {
		return;
	}

	warmedThemes.add(theme);
	preloadImages(getCriticalImageUrls(theme), {
		fetchPriority: "low",
	});
}

export function useHeroOverlayVisibility(colorTheme: Theme) {
	const [isOverlayVisible, setIsOverlayVisible] = useState(false);
	const latestThemeRef = useRef(colorTheme);
	const warmedThemesRef = useRef(new Set<Theme>());

	useEffect(() => {
		latestThemeRef.current = colorTheme;
	}, [colorTheme]);

	useEffect(() => {
		if (!canWarmupHeroImages()) {
			return;
		}

		const nextTheme = getNextTheme(colorTheme);

		if (isOverlayVisible) {
			warmThemeImages(nextTheme, warmedThemesRef.current);
			return;
		}

		const scheduledTheme = colorTheme;
		let cancelled = false;

		const cleanup = scheduleAfterPageLoad(() => {
			if (cancelled || latestThemeRef.current !== scheduledTheme) {
				return;
			}

			startTransition(() => {
				if (!cancelled && latestThemeRef.current === scheduledTheme) {
					setIsOverlayVisible(true);
				}
			});

			warmThemeImages(nextTheme, warmedThemesRef.current);
		});

		return () => {
			cancelled = true;
			cleanup();
		};
	}, [colorTheme, isOverlayVisible]);

	return isOverlayVisible;
}
