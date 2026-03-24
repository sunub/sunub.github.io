"use client";

import {
	HeroPosterBridge,
	HeroPosterBridgeStrip,
	HeroPosterCars,
	HeroPosterCarsStrip,
	HeroPosterCloudsFrame,
	HeroPosterCloudsStrip,
	HeroPosterShadow,
	HeroPosterSurface,
} from "./HeroImage.style";

export function HeroPoster({ hidden = false }: { hidden?: boolean }) {
	return (
		<HeroPosterSurface aria-hidden={true}>
			<HeroPosterCloudsFrame data-hidden={hidden}>
				<HeroPosterCloudsStrip />
			</HeroPosterCloudsFrame>
			<HeroPosterBridge>
				<HeroPosterBridgeStrip />
			</HeroPosterBridge>
			<HeroPosterCars data-hidden={hidden}>
				<HeroPosterCarsStrip />
			</HeroPosterCars>
			<HeroPosterShadow />
		</HeroPosterSurface>
	);
}
