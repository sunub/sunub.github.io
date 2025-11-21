import DarkBridgeImage from "public/assets/dark_bridge.avif";
import { AutoWidthImage, BridgeTrack, BridgeWindow } from "../HeroImage.style";

export function DarkBridgeHeroImage() {
	const bridgeStyle = {
		"--bridge-opacity": "var(--color-dark-heroimage)",
	} as React.CSSProperties;
	return (
		<BridgeWindow style={bridgeStyle}>
			<BridgeTrack>
				{[0, 1, 2, 3, 4, 5].map((index) => (
					<AutoWidthImage
						key={`bridge-${index}`}
						src={DarkBridgeImage}
						alt={index === 0 ? "dark bridge" : ""}
						priority={index < 2}
						aria-hidden={index !== 0}
					/>
				))}
			</BridgeTrack>
		</BridgeWindow>
	);
}
