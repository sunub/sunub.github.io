import { memo } from "react";
import { Cars, Clouds, CloudsFrame, HeroImageSurface } from "./HeroImage.style";

const HeroImage = memo(() => {
	return (
		<HeroImageSurface>
			<CloudsFrame>
				<Clouds />
			</CloudsFrame>
			<Cars />
		</HeroImageSurface>
	);
});

HeroImage.displayName = "HeroImage";

export default HeroImage;
