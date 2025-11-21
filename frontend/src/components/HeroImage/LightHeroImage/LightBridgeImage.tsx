import LightBridgeImage from "public/assets/bridge.avif";
import { AutoWidthImage, BridgeTrack, BridgeWindow } from "../HeroImage.style";

export function LightBridgeHeroImage() {
	const bridgeStyle = {
		"--bridge-opacity": "var(--color-light-heroimage)",
	} as React.CSSProperties;
	return (
		<BridgeWindow style={bridgeStyle}>
			<BridgeTrack>
				{[0, 1, 2, 3, 4, 5].map((index) => (
					<AutoWidthImage
						key={`bridge-${index}`}
						src={LightBridgeImage}
						alt={index === 0 ? "light bridge" : ""}
						priority={index < 2}
						aria-hidden={index !== 0}
					/>
				))}
			</BridgeTrack>
		</BridgeWindow>
	);
}
