"use client";

import React from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";

function Object() {
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
	const { x, y, z } = useControls("dirlight helper", {
		x: {
			value: 0,
			step: 0.1,
		},
		y: {
			value: -50,
			step: 0.1,
		},
		z: {
			value: 100,
			step: 0.1,
		},
	});

	React.useEffect(() => {
		helperRef.current = new THREE.DirectionalLightHelper(
			ref.current,
			30,
			"red"
		);
		scene.add(helperRef.current);

		return () => scene.remove(helperRef.current);
	}, [ref.current]);

	useFrame(() => {
		if (helperRef.current) {
			helperRef.current.update();
		}
	});

	return (
		<>
			<directionalLight ref={ref} position={[x, y, z]} />
			<mesh position={[0, 10, 10]}>
				<planeGeometry args={[51, 57]} />
				<meshBasicMaterial
					map={bird}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[0, 136, 10]}>
				<planeGeometry args={[471, 116]} />
				<meshBasicMaterial
					map={clouds}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[0, 69, 0]}>
				<planeGeometry args={[403, 17]} />
				<meshBasicMaterial
					map={poles}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[136, 174, 5]}>
				<planeGeometry args={[72, 72]} />
				<meshBasicMaterial
					map={sun}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[0, 110, 0]}>
				<planeGeometry args={[459, 156]} />
				<meshBasicMaterial
					map={carsAndBridge}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[-4, 10, 0]}>
				<planeGeometry args={[459, 86]} />
				<meshBasicMaterial
					map={waterShadow}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[-4, 100, -10]}>
				<planeGeometry args={[459, 310]} />
				<meshBasicMaterial
					map={background}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
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
