"use client";

import {
	DepthOfField,
	EffectComposer,
	Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import React from "react";

export default function Effects() {
	const ref = React.useRef();
	const { width, target, focalLength, bokehScale } = useControls({
		width: {
			value: 1600,
			step: 1,
		},
		target: {
			value: [0, 0, 30],
			step: 0.1,
		},
		focusDistance: {
			value: 0.1,
			step: 0.1,
			min: 0,
			max: 4,
		},
		focalLength: {
			min: 0,
			max: 1,
			value: 0.1,
		},
		bokehScale: {
			value: 8,
			step: 1,
		},
	});

	return (
		<EffectComposer disableNormalPass multisampling={0}>
			<DepthOfField
				ref={ref}
				target={[0, 0, 30]}
				bokehScale={8}
				focalLength={0.35}
				width={1024}
			/>
			<Vignette />
		</EffectComposer>
	);
}
