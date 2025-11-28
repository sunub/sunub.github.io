import { memo } from "react";
import {
	Bridge,
	Cars,
	Clouds,
	DarkShadow,
	DrakHeroImageWapper,
} from "./HeroImage.style";

interface DarkHeroImageProps {
	$isVisible: boolean;
}

const DarkHeroImage = memo(({ $isVisible }: DarkHeroImageProps) => {
	const cloudStyle = {
		"--clouds-opacity": "var(--color-dark-heroimage)",
	} as React.CSSProperties;
	const bridgeStyle = {
		"--bridge-opacity": "var(--color-dark-heroimage)",
	} as React.CSSProperties;
	const carsStyle = {
		"--cars-opacity": "var(--color-dark-heroimage)",
	} as React.CSSProperties;
	const shadowStyle = {
		opacity: "var(--color-dark-heroimage)",
	} as React.CSSProperties;

	return (
		<DrakHeroImageWapper $isVisible={$isVisible}>
			<Clouds $bgUrl={"/assets/dark_clouds.avif"} style={cloudStyle} />
			<Bridge
				$bgUrl={"/assets/dark_bridge.avif"}
				style={bridgeStyle}
			/>
			<Cars $bgUrl={"/assets/dark_cars.avif"} style={carsStyle} />
			<DarkShadow style={shadowStyle} />
		</DrakHeroImageWapper>
	);
});

DarkHeroImage.displayName = "DarkHeroImage";

export default DarkHeroImage;
