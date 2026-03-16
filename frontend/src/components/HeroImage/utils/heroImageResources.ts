import type { Theme } from "type";
import {
	DARK_CRICAL_IMAGE_URLS,
	getHeroThemeImageUrls,
	LIGHT_CRICAL_IMAGE_URLS,
} from "@/resources/images";

export function getCriticalImageUrls(theme: Theme) {
	return theme === "light" ? LIGHT_CRICAL_IMAGE_URLS : DARK_CRICAL_IMAGE_URLS;
}

export function getHeroSceneImageUrls(theme: Theme) {
	return getHeroThemeImageUrls(theme);
}

export function getNextTheme(theme: Theme): Theme {
	return theme === "light" ? "dark" : "light";
}

export function pickImageType(src: string) {
	const extension = src.split(".").pop();

	if (extension === "avif") {
		return "image/avif";
	}

	if (extension === "webp") {
		return "image/webp";
	}

	return undefined;
}
