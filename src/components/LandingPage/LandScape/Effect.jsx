import {
	EffectComposer,
	DepthOfField,
	Vignette,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import React from "react";

function Effects() {
	const ref = React.useRef();
	const { focalLength, bokehScale } = useControls({
		focalLength: {
			min: 0,
			max: 1,
			value: 0.1,
		},
		bokehScale: {
			min: 0,
			max: 10,
			value: 8,
		},
	});

	return (
		<EffectComposer disableNormalPass multisampling={0}>
			<DepthOfField
				width={459}
				ref={ref}
				target={[0, 0, 30]}
				bokehScale={bokehScale}
				focalLength={focalLength}
			/>
			<Vignette eskil={true} darkness={0.2} />
		</EffectComposer>
	);
}

export default Effects;
