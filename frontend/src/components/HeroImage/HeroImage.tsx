import { memo } from "react";
import { Cars, Clouds, CloudsFrame, HeroImageSurface } from "./HeroImage.style";

const HeroImage = memo(({ isPlaying = true }: { isPlaying?: boolean }) => {
	return (
		<HeroImageSurface>
			<CloudsFrame>
				<Clouds data-playing={isPlaying} />
			</CloudsFrame>
			<Cars data-playing={isPlaying} />
		</HeroImageSurface>
	);
});

HeroImage.displayName = "HeroImage";

export default HeroImage;
