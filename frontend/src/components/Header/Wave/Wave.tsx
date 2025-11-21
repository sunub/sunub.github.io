"use client";

import { WaveWrapper } from "./Wave.style";
import { WaveBird } from "./WaveBird";
import { WaveSvg } from "./WaveSvg";

export function Wave() {
	return (
		<WaveWrapper>
			<WaveSvg />
			<WaveBird />
		</WaveWrapper>
	);
}
