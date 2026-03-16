"use client";

import { useEffect } from "react";
import type { Theme } from "type";
import { HeroImage } from "@/components/HeroImage";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { HeroOverlayLayer } from "./HeroImage.style";
import { useHeroOverlayVisibility } from "./utils/useHeroOverlayVisibility";

export function HeroImageIdleWarmup({
	onOverlayVisibleChange,
}: {
	onOverlayVisibleChange: (visible: boolean) => void;
}) {
	const { colorTheme } = useTheme();
	const isOverlayVisible = useHeroOverlayVisibility(colorTheme as Theme);

	useEffect(() => {
		onOverlayVisibleChange(isOverlayVisible);
	}, [isOverlayVisible, onOverlayVisibleChange]);

	return (
		<HeroOverlayLayer aria-hidden={true} data-visible={isOverlayVisible}>
			{isOverlayVisible ? <HeroImage /> : null}
		</HeroOverlayLayer>
	);
}
