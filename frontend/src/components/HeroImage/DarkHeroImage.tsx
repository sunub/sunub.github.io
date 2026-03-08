import { memo } from "react";
import {
	Bridge,
	Cars,
	Clouds,
	CloudsFrame,
	DarkShadow,
	DrakHeroImageWapper,
} from "./HeroImage.style";

const DarkHeroImage = memo(() => {
	return (
		<DrakHeroImageWapper>
			<CloudsFrame>
				<Clouds />
			</CloudsFrame>
			<Bridge />
			<Cars />
			<DarkShadow />
		</DrakHeroImageWapper>
	);
});

DarkHeroImage.displayName = "DarkHeroImage";

export default DarkHeroImage;
