import { preload } from "react-dom";
import { HERO_THEME_IMAGE_URLS } from "@/resources/images";
import { pickImageType } from "./utils/heroImageResources";

export function HeroImagePreload() {
	for (const imageUrl of new Set([
		HERO_THEME_IMAGE_URLS.light.clouds,
		HERO_THEME_IMAGE_URLS.light.bridge,
		HERO_THEME_IMAGE_URLS.light.cars,
		HERO_THEME_IMAGE_URLS.dark.clouds,
		HERO_THEME_IMAGE_URLS.dark.bridge,
		HERO_THEME_IMAGE_URLS.dark.cars,
	])) {
		preload(imageUrl, {
			as: "image",
			type: pickImageType(imageUrl),
			fetchPriority: "high",
		});
	}

	return null;
}
