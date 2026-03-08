"use client";

import { useContext } from "react";
import type { Theme } from "type";
import { ThemeContext } from "../Theme/ThemeProvider";
import DarkHeroImage from "./DarkHeroImage";
import LightHeroImage from "./LightHeroImage";

interface HeroImageProps {
	initialTheme?: Theme;
}

function HeroImage({ initialTheme }: HeroImageProps) {
	const { colorTheme } = useContext(ThemeContext);
	const currentTheme = colorTheme || initialTheme || "light";
	const isDarkTheme = currentTheme === "dark";

	return isDarkTheme ? <DarkHeroImage /> : <LightHeroImage />;
}

export default HeroImage;
