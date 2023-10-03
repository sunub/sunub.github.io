"use client";

import React from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import "./layersMaterial";
import Effects from "./Effect";

function Object({ ...delegated }) {
	const ref = React.useRef(null);
	const helperRef = React.useRef(null);
	const [bird, clouds, poles, sun, carsAndBridge, waterShadow, background] =
		useLoader(TextureLoader, [
			"bird.png",
			"clouds.png",
			"poles.png",
			"sun.png",
			"cars_and_bridge.png",
			"water_shadow.png",
			"background.jpg",
		]);
	const scene = useThree((state) => state.scene);
	const { x, y, z, scale } = useControls("bird helper", {
		x: {
			value: 0,
			step: 0.1,
		},
		y: {
			value: 0,
			step: 0.1,
		},
		z: {
			value: 10,
			step: 0.1,
		},
		scale: {
			value: 1,
			step: 0.1,
		},
	});

	const colors = new THREE.Color();

	// React.useEffect(() => {
	// 	helperRef.current = new THREE.DirectionalLightHelper(
	// 		ref.current,
	// 		30,
	// 		"red"
	// 	);
	// 	scene.add(helperRef.current);

	// 	return () => scene.remove(helperRef.current);
	// }, [ref.current]);

	// useFrame(() => {
	// 	if (helperRef.current) {
	// 		helperRef.current.update();
	// 	}
	// });

	return (
		<>
			<group {...delegated}>
				<OrbitControls
					onChange={(e) => {
						const curr = e.target;
						console.log(curr.object);
					}}
				/>
				<directionalLight ref={ref} position={[0, -50, 100]} />
				<mesh scale={scale} position={[x, y, z]}>
					<planeGeometry args={[51, 57]} />
					<meshMatcapMaterial
						map={bird}
						transparent
						side={THREE.DoubleSide}
					/>
					{/* <layerMaterial textr={bird} factor={0.7} scale={1} /> */}
				</mesh>
				<mesh position={[0, 136, 10]}>
					<planeGeometry args={[471, 116]} />
					<meshMatcapMaterial
						map={clouds}
						transparent
						side={THREE.DoubleSide}
					/>
				</mesh>
				<mesh position={[0, 69, 0]}>
					<planeGeometry args={[403, 17]} />
					<meshMatcapMaterial
						map={poles}
						transparent
						side={THREE.DoubleSide}
					/>
				</mesh>
				<mesh position={[136, 174, 5]}>
					<planeGeometry args={[72, 72]} />
					<meshMatcapMaterial
						map={sun}
						transparent
						side={THREE.DoubleSide}
					/>
				</mesh>
				<mesh position={[0, 110, 0]}>
					<planeGeometry args={[459, 156]} />
					<meshMatcapMaterial
						map={carsAndBridge}
						transparent
						side={THREE.DoubleSide}
					/>
				</mesh>
				<mesh position={[-4, 10, 0]}>
					<planeGeometry args={[459, 86]} />
					<meshMatcapMaterial
						map={waterShadow}
						transparent
						side={THREE.DoubleSide}
					/>
				</mesh>
			</group>
			{/* <Effects /> */}
		</>
	);
}

export default Object;

// const [bird, clouds] = useLoader(TextureLoader, ["bird.png", "clouds.png"]);
// React.useEffect(() => {
//     helperRef.current = new THREE.DirectionalLightHelper(
//         ref.current,
//         1,
//         "red"
//     );
//     scene.add(helperRef);

//     return () => scene.remove(helperRef.current);
// }, [ref.current]);

// useFrame(() => {
//     helperRef.current.update();
// });
