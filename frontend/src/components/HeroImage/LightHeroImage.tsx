import { memo } from "react";
import {
	Bridge,
	Cars,
	Clouds,
	LightHeroImageWapper,
	LightShadow,
} from "./HeroImage.style";
import { cdnPath } from "@/utils/cdnPath";

interface LightHeroImageProps {
	$isVisible: boolean;
}

const LightHeroImage = memo(({ $isVisible }: LightHeroImageProps) => {
	const cloudStyle = {
		"--clouds-opacity": "var(--color-light-heroimage)",
	} as React.CSSProperties;
	const bridgeStyle = {
		"--bridge-opacity": "var(--color-light-heroimage)",
	} as React.CSSProperties;
	const carsStyle = {
		"--cars-opacity": "var(--color-light-heroimage)",
	} as React.CSSProperties;
	const shadowStyle = {
		opacity: "var(--color-light-heroimage)",
	} as React.CSSProperties;
	console.log(cdnPath("/assets/clouds.avif"));

	return (
		<LightHeroImageWapper $isVisible={$isVisible}>
			<Clouds $bgUrl={cdnPath("/assets/clouds.avif")} style={cloudStyle} />
			<Bridge $bgUrl={cdnPath("/assets/bridge.avif")} style={bridgeStyle} />
			<Cars $bgUrl={cdnPath("/assets/cars.avif")} style={carsStyle} />
			<LightShadow style={shadowStyle} />
		</LightHeroImageWapper>
	);
});

LightHeroImage.displayName = "LightHeroImage";

export default LightHeroImage;
