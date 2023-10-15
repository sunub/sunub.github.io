import {
	EffectComposer,
	DepthOfField,
	Vignette,
} from "@react-three/postprocessing";
import React from "react";

function Effects() {
	const ref = React.useRef();

	return (
		<EffectComposer disableNormalPass multisampling={0}>
			<DepthOfField
				width={459}
				ref={ref}
				target={[0, 0, 30]}
				bokehScale={8}
				focalLength={0.1}
			/>
			<Vignette eskil={true} darkness={0.2} />
		</EffectComposer>
	);
}

export default Effects;
