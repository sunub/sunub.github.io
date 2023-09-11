"use client";

import { OrbitControls, Plane, useAspect, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import {
	DepthOfField,
	EffectComposer,
	Vignette,
} from "@react-three/postprocessing";
import { Leva, useControls } from "leva";
import Experience from "./Experience";
import * as THREE from "three";
import React from "react";
import bg from "public/bg.jpg";
import bird from "public/bird.png";
import bridge from "public/bridge.png";
import carPoles from "public/car_poles.png";
import clouds from "public/clouds.png";
import waterShadow from "public/water_shadow.png";
import sun from "public/sun.png";
import "./layerMaterial";

function Cube() {
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
	]);
	const [movement] = React.useState(() => new THREE.Vector3());
	const [temp] = React.useState(() => new THREE.Vector3());
	const layersRef = React.useRef([]);
	const layers = [
		{ texture: textures[0], z: 0, factor: 0.005, scale: scaleW },
		{ texture: textures[1], z: 10, factor: 0.005, scale: scaleW },
		{ texture: textures[2], z: 10, factor: 0.005, scale: scaleW },
		{ texture: textures[3], z: 20, factor: 0.015, scale: scaleW },
		{ texture: textures[4], z: 2, factor: 0.015, scale: scaleN },
		{
			texture: textures[5],
			z: 40,
			wiggle: 0.6,
			factor: 0.015,
			scale: scaleW,
		},
		{
			texture: textures[6],
			z: 49,
			wiggle: 1,
			scaleFactor: 0.83,
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

function Effects() {
	const ref = React.useRef();
	const { width, focusDistance, focalLength, bokehScale } = useControls({
		width: {
			value: 1024,
			step: 1,
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
			value: 0.35,
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
				bokehScale={bokehScale}
				focalLength={focalLength}
				width={width}
			/>
			<Vignette />
		</EffectComposer>
	);
}

export default function BaseCanvas() {
	const controls = useControls({
		position: {
			value: { x: 0, y: 0, z: 300 },
			step: 10,
		},
	});

	return (
		<>
			<Leva />
			<Canvas
				orthographic
				camera={{ zoom: 5, position: [0, 0, 200], far: 230, near: 50 }}
			>
				<OrbitControls />
				<Experience />
				<Effects />
				<Cube />
			</Canvas>
		</>
	);
}
