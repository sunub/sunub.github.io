import type { Theme } from "type";

export const HERO_THEME_IMAGE_URLS = {
	light: {
		clouds: "/assets/light_clouds.webp",
		bridge: "/assets/light_bridge.webp",
		cars: "/assets/light_cars.webp",
	},
	dark: {
		clouds: "/assets/dark_clouds.webp",
		bridge: "/assets/dark_bridge.webp",
		cars: "/assets/dark_cars.webp",
	},
} as const satisfies Record<
	Theme,
	{
		clouds: string;
		bridge: string;
		cars: string;
	}
>;

export const LIGHT_CRICAL_IMAGE_URLS = [
	HERO_THEME_IMAGE_URLS.light.clouds,
	HERO_THEME_IMAGE_URLS.light.bridge,
	HERO_THEME_IMAGE_URLS.light.cars,
] as const;

export const DARK_CRICAL_IMAGE_URLS = [
	HERO_THEME_IMAGE_URLS.dark.clouds,
	HERO_THEME_IMAGE_URLS.dark.bridge,
	HERO_THEME_IMAGE_URLS.dark.cars,
] as const;

export function getHeroThemeImageUrls(theme: Theme) {
	return HERO_THEME_IMAGE_URLS[theme];
}
