"use client";

import { useContext } from "react";
import { preload } from "react-dom";
import type { Theme } from "type";
import { ThemeContext } from "../Theme/ThemeProvider";
import DarkHeroImage from "./DarkHeroImage";
import { HeroImageWrapper, RootWrapper } from "./HeroImage.style";
import LightHeroImage from "./LightHeroImage";

interface HeroImageProps {
	initialTheme?: Theme;
}

function HeroImage({ initialTheme }: HeroImageProps) {
	const { colorTheme } = useContext(ThemeContext);
	const currentTheme = colorTheme || initialTheme || "light";
	const isDarkTheme = currentTheme === "dark";

	if (isDarkTheme) {
		preload("/assets/dark_bridge.avif", { as: "image" });
		preload("/assets/dark_clouds.avif", { as: "image" });
		preload("/assets/dark_cars.avif", { as: "image" });
	} else {
		preload("/assets/bridge.avif", { as: "image" });
		preload("/assets/clouds.avif", { as: "image" });
		preload("/assets/cars.avif", { as: "image" });
	}

	return (
		<RootWrapper suppressHydrationWarning={true}>
			<HeroImageWrapper>
				<DarkHeroImage $isVisible={isDarkTheme} />
				<LightHeroImage $isVisible={isDarkTheme} />
			</HeroImageWrapper>
		</RootWrapper>
	);
}

export default HeroImage;
