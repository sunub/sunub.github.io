"use client";

import React from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import * as THREE from "three";
import { DirectionalLightHelper } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {
	OrbitControls,
	OrthographicCamera,
	useHelper,
} from "@react-three/drei";

function Object() {
	const ref = React.useRef(null);
	const helperRef = React.useRef(null);
	const [bird, clouds] = useLoader(TextureLoader, ["bird.png", "clouds.png"]);
	const scene = useThree((state) => state.scene);

	React.useEffect(() => {
		helperRef.current = new THREE.DirectionalLightHelper(
			ref.current,
			1,
			"red"
		);
		scene.add(helperRef.current);

		return () => scene.remove(helperRef.current);
	}, [ref.current]);

	useFrame(() => {
		helperRef.current.update();
	});

	return (
		<>
			<OrbitControls />
			<directionalLight ref={ref} />
			<OrthographicCamera position={[0, -10, 10]} />
			<mesh>
				<planeGeometry />
				<meshStandardMaterial
					map={bird}
					transparent
					side={THREE.DoubleSide}
				/>
			</mesh>
			<mesh position={[0, 4, 0]}>
				<planeGeometry args={[12, 4]} />
				<meshStandardMaterial
					map={clouds}
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
