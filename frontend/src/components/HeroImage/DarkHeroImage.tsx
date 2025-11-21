import { memo } from "react";
import { DarkBridgeHeroImage } from "./DarkHeroImage/DarkBridgeImage";
import { DarkCarHeroImage } from "./DarkHeroImage/DarkCarsImage";
import { DarkCloudHeroImage } from "./DarkHeroImage/DarkHeroCloudImage";
import { DarkShadow, DrakHeroImageWapper } from "./HeroImage.style";

interface DarkHeroImageProps {
	$isVisible: boolean;
}

const DarkHeroImage = memo(({ $isVisible }: DarkHeroImageProps) => {
	const shadowStyle = {
		opacity: "var(--color-dark-heroimage)",
	} as React.CSSProperties;

	return (
		<DrakHeroImageWapper $isVisible={$isVisible}>
			<DarkCloudHeroImage />
			<DarkCarHeroImage />
			<DarkBridgeHeroImage />
			<DarkShadow style={shadowStyle} />
		</DrakHeroImageWapper>
	);
});

DarkHeroImage.displayName = "DarkHeroImage";

export default DarkHeroImage;
