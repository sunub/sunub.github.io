"use client";

import dynamic from "next/dynamic";
import { useContext } from "react";
import type { Theme } from "type";
import { ThemeContext } from "../Theme/ThemeProvider";
import { HeroImageWrapper, RootWrapper } from "./HeroImage.style";

interface HeroImageProps {
	initialTheme?: Theme;
}

const DarkHeroImage = dynamic(() => import("./DarkHeroImage"));
const LightHeroImage = dynamic(() => import("./LightHeroImage"));

function HeroImage({ initialTheme }: HeroImageProps) {
	const { colorTheme } = useContext(ThemeContext);
	const currentTheme = colorTheme || initialTheme || "light";
	const isDarkTheme = currentTheme === "dark";

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
