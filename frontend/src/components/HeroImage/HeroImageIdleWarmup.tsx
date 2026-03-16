"use client";

import { useEffect, useState } from "react";
import type { Theme } from "type";
import { HeroImage } from "@/components/HeroImage";
import { useTheme } from "@/components/Theme/ThemeProvider";
import { HeroOverlayLayer } from "./HeroImage.style";
import { useHeroOverlayVisibility } from "./utils/useHeroOverlayVisibility";

function waitForFrames(count: number, callback: () => void) {
	let frameId = 0;

	const tick = (remaining: number) => {
		frameId = window.requestAnimationFrame(() => {
			if (remaining <= 1) {
				callback();
				return;
			}

			tick(remaining - 1);
		});
	};

	tick(count);
	return () => {
		window.cancelAnimationFrame(frameId);
	};
}

export function HeroImageIdleWarmup({
	onOverlayVisibleChange,
}: {
	onOverlayVisibleChange: (visible: boolean) => void;
}) {
	const { colorTheme } = useTheme();
	const shouldMountOverlay = useHeroOverlayVisibility(colorTheme as Theme);
	const [isOverlaySettled, setIsOverlaySettled] = useState(false);
	const [isOverlayAnimationPlaying, setIsOverlayAnimationPlaying] =
		useState(false);

	useEffect(() => {
		if (shouldMountOverlay) {
			return;
		}

		setIsOverlaySettled(false);
		setIsOverlayAnimationPlaying(false);
	}, [shouldMountOverlay]);

	useEffect(() => {
		if (!isOverlaySettled) {
			return;
		}

		waitForFrames(2, () => {
			setIsOverlayAnimationPlaying(true);
		});
	}, [isOverlaySettled]);

	useEffect(() => {
		onOverlayVisibleChange(isOverlaySettled);
	}, [isOverlaySettled, onOverlayVisibleChange]);

	if (!shouldMountOverlay) {
		return null;
	}

	return (
		<HeroOverlayLayer
			aria-hidden={true}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.42,
				ease: [0.22, 1, 0.36, 1],
			}}
			onAnimationComplete={() => {
				setIsOverlaySettled(true);
			}}
		>
			<HeroImage isPlaying={isOverlayAnimationPlaying} />
		</HeroOverlayLayer>
	);
}
