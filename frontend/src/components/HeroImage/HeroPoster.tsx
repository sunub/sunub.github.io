"use client";

import { useTheme } from "@/components/Theme/ThemeProvider";
import {
	HeroPosterBridge,
	HeroPosterCars,
	HeroPosterCloudsFrame,
	HeroPosterShadow,
	HeroPosterSurface,
	HeroPosterTile,
	HeroPosterTrack,
} from "./HeroImage.style";
import { getHeroSceneImageUrls } from "./utils/heroImageResources";

const CLOUDS_WIDTH = 1039;
const CLOUDS_HEIGHT = 162;
const CLOUDS_REPEAT_COUNT = 3;

const BRIDGE_WIDTH = 462;
const BRIDGE_HEIGHT = 114;
const BRIDGE_REPEAT_COUNT = 6;

const CARS_WIDTH = 1554;
const CARS_HEIGHT = 14;
const CARS_REPEAT_COUNT = 6;

function RepeatedPosterStrip({
	alt,
	count,
	fetchPriority,
	height,
	src,
	width,
}: {
	alt: string;
	count: number;
	fetchPriority?: "auto" | "high" | "low";
	height: number;
	src: string;
	width: number;
}) {
	const tileKeys = Array.from(
		{ length: count },
		(_, index) => `${src}-${width}-${height}-${index + 1}`,
	);

	return (
		<HeroPosterTrack aria-hidden={true}>
			{tileKeys.map((tileKey, index) => (
				<HeroPosterTile
					key={tileKey}
					src={src}
					alt={alt}
					width={width}
					height={height}
					decoding="async"
					loading="eager"
					fetchPriority={index === 0 ? fetchPriority : undefined}
				/>
			))}
		</HeroPosterTrack>
	);
}

export function HeroPoster({ hidden = false }: { hidden?: boolean }) {
	const { colorTheme } = useTheme();
	const { bridge, clouds, cars } = getHeroSceneImageUrls(colorTheme);

	return (
		<HeroPosterSurface aria-hidden={true}>
			<HeroPosterCloudsFrame data-hidden={hidden}>
				<RepeatedPosterStrip
					src={clouds}
					width={CLOUDS_WIDTH}
					height={CLOUDS_HEIGHT}
					count={CLOUDS_REPEAT_COUNT}
					alt=""
					fetchPriority="high"
				/>
			</HeroPosterCloudsFrame>
			<HeroPosterBridge>
				<RepeatedPosterStrip
					src={bridge}
					width={BRIDGE_WIDTH}
					height={BRIDGE_HEIGHT}
					count={BRIDGE_REPEAT_COUNT}
					alt=""
				/>
			</HeroPosterBridge>
			<HeroPosterCars data-hidden={hidden}>
				<RepeatedPosterStrip
					src={cars}
					width={CARS_WIDTH}
					height={CARS_HEIGHT}
					count={CARS_REPEAT_COUNT}
					alt=""
					fetchPriority="high"
				/>
			</HeroPosterCars>
			<HeroPosterShadow />
		</HeroPosterSurface>
	);
}
