"use client";

import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import clouds from "public/clouds.png";
import { OrbitControls, Plane, useTexture } from "@react-three/drei";

function HeroLandscape() {
	return (
		<Canvas
			style={{
				width: "100%",
				height: "80dvh",
			}}
		>
			<ambientLight />
			<OrbitControls />
			<mesh>
				<planeGeometry args={[1, 1]} />
				<meshBasicMaterial
					map={clouds}
					color={"orange"}
					side={THREE.DoubleSide}
				/>
			</mesh>
		</Canvas>
	);
}

export default HeroLandscape;
