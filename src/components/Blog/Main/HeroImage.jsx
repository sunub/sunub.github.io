"use client";

import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from "three";
import { baseURL } from "@/utils/getBaseUrl";

const url = `${baseURL}/bird.svg`;

function loadSVG(url) {
	const loader = new SVGLoader();

	loader.load(url, function (data) {
		const group = new THREE.Group();
		group.scale.multiplyScalar(0.25);
		group.position.x = -70;
		group.position.y = 70;
		group.scale.y *= -1;

		let renderOrder = 0;

		for (const path of data.paths) {
			console.log(path);
		}
	});
}

export default function HeroImage() {
	loadSVG(url);

	return (
		<>
			<Canvas
				style={{
					position: "relative",
					width: "100dvw",
					height: "65dvh",
				}}
			></Canvas>
		</>
	);
}
