"use client";

import { Plane, useAspect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import React from "react";
import bg from "public/bg.jpg";
import bird from "public/bird.png";
import bridge from "public/bridge.png";
import carPoles from "public/car_poles.png";
import clouds from "public/clouds.png";
import waterShadow from "public/water_shadow.png";
import sun from "public/sun.png";
import frame from "public/frame.png";
import "./layerMaterial";

export default function LandScape() {
	const scaleN = useAspect(1600, 1000, 1.05);
	const scaleW = useAspect(2200, 1000, 1.05);
	const group = React.useRef();
	const textures = useTexture([
		bg.src,
		bridge.src,
		waterShadow.src,
		carPoles.src,
		sun.src,
		clouds.src,
		bird.src,
		frame.src,
	]);
	const [movement] = React.useState(() => new THREE.Vector3());
	const [temp] = React.useState(() => new THREE.Vector3());
	const layersRef = React.useRef([]);
	const layers = [
		{ texture: textures[0], z: 0, factor: 0.005, scale: scaleW },
		{ texture: textures[1], z: 10, factor: 0.005, scale: scaleW },
		{ texture: textures[2], z: 10, factor: 0.005, scale: scaleW },
		{ texture: textures[3], z: 20, factor: 0.015, scale: scaleW },
		{ texture: textures[4], z: 10, factor: 0.015, scale: scaleN },
		{
			texture: textures[5],
			z: 11,
			wiggle: 0.6,
			factor: 0.015,
			scale: scaleW,
		},
		{
			texture: textures[6],
			z: 20,
			wiggle: 1,
			scale: scaleW,
		},
		{
			texture: textures[7],
			z: 19,
			scale: scaleW,
		},
	];
	console.log(bg);
	useFrame((state, delta) => {
		movement.lerp(temp.set(state.mouse.x, state.mouse.y * 0.2, 0), 0.2);
		group.current.position.x = THREE.MathUtils.lerp(
			group.current.position.x,
			state.mouse.x * 20,
			0.2
		);
		group.current.rotation.x = THREE.MathUtils.lerp(
			group.current.rotation.x,
			state.mouse.y / 10,
			0.2
		);
		group.current.rotation.y = THREE.MathUtils.lerp(
			group.current.rotation.y,
			-state.mouse.x / 13,
			0.2
		);
	});

	React.useEffect(() => {
		console.log(layersRef);
	}, []);

	return (
		<group ref={group}>
			{layers.map(
				(
					{
						scale,
						texture,
						ref,
						factor = 0,
						scaleFactor = 1,
						wiggle = 0,
						z,
					},
					i
				) => {
					return (
						<Plane
							key={i}
							scale={scale}
							args={[1, 1, wiggle ? 10 : 1]}
							position-z={z}
							ref={ref}
						>
							<layerMaterial
								movement={movement}
								textr={texture}
								factor={factor}
								wiggle={wiggle}
								scale={scaleFactor}
								ref={(el) => (layersRef.current[i] = el)}
							/>
						</Plane>
					);
				}
			)}
		</group>
	);
}
