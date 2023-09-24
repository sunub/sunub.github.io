"use client";

import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import React, { Suspense } from "react";
import { baseURL } from "@/utils/getBaseUrl";

function SVG({ url }) {
	const { paths } = useLoader(SVGLoader, `${baseURL}/${url}.svg`);
	const shapes = React.useMemo(
		() =>
			paths.flatMap((p) =>
				p.toShapes(true).map((shape) => ({
					shape,
					color: p.color,
					fillOpacity: p.userData.style.fillOpacity,
				}))
			),
		[paths]
	);

	return (
		<group>
			{shapes.map((props) => (
				<Bird key={props.shape.uuid} {...props} />
			))}
		</group>
	);
}

function Bird({ color, shape, fillOpacity }) {
	console.log(shape);
	return (
		<mesh>
			<meshBasicMaterial
				attach={"material"}
				color={color}
				opacity={fillOpacity}
				side={THREE.DoubleSide}
			/>
			<shapeBufferGeometry attach={"geometry"} args={[shape]} />
		</mesh>
	);
}

export default function LandScape() {
	return (
		<Suspense fallback={null}>
			<SVG url={"bird"} />
		</Suspense>
	);
}
