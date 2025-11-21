import LightHeroCloudImage from "public/assets/clouds.avif";
import {
	AnimationTrack,
	AnimationWindow,
	AutoWidthImage,
} from "../HeroImage.style";

export function LightCloudHeroImage() {
	const cloudStyle = {
		"--clouds-opacity": "var(--color-light-heroimage)",
	} as React.CSSProperties;

	return (
		<AnimationWindow style={cloudStyle}>
			<AnimationTrack>
				<AutoWidthImage
					src={LightHeroCloudImage}
					alt="light clouds"
					priority
					sizes="100vw"
				/>
				<AutoWidthImage
					src={LightHeroCloudImage}
					alt="light clouds loop 1"
					priority
					sizes="100vw"
				/>
				<AutoWidthImage
					src={LightHeroCloudImage}
					alt="light clouds loop 2"
					priority
					sizes="100vw"
				/>
			</AnimationTrack>
		</AnimationWindow>
	);
}
