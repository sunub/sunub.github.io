import type { Theme } from "type";
import { cdnPath } from "@/utils/cdnPath";

interface Props {
	theme: Theme;
}

export function HeroImagePreload({ theme }: Props) {
	const isLight = theme === "light";

	const criticalImages = isLight
		? [
				cdnPath("/assets/bridge.avif"),
				cdnPath("/assets/clouds.avif"),
				cdnPath("/assets/cars.avif"),
			]
		: [
				cdnPath("/assets/dark_bridge.avif"),
				cdnPath("/assets/dark_clouds.avif"),
				cdnPath("/assets/dark_cars.avif"),
			];
	const favicons = [cdnPath("/assets/favicon.ico")];
	return (
		<>
			{favicons.map((src) => (
				<link
					key={src}
					rel="icon"
					type="image/x-icon"
					sizes="32x32"
					fetchPriority="high"
				/>
			))}
			{criticalImages.map((src) => (
				<link
					key={src}
					rel="preload"
					as="image"
					href={src}
					type="image/avif"
					fetchPriority="high"
				/>
			))}
		</>
	);
}
