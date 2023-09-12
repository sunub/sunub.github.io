"use client";

import React from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import LandScape from "./Landscape";
import Effects from "./Effect";
import {
	OrbitControls,
	OrthographicCamera,
	useHelper,
} from "@react-three/drei";
import * as THREE from "three";

const StyledCanvas = styled(Canvas)`
	position: fixed;
	left: 0;
	top: 0;

	width: 100%;
	height: 100%;
	overflow: hidden;
`;

export default function BaseCanvas() {
	const ref = React.useRef(null);

	const [width, setWidth] = React.useState(0);
	const [height, setHeight] = React.useState(0);

	React.useLayoutEffect(() => {
		setWidth(ref.current.offsetWidth);
		setHeight(ref.current.offsetHeight);
	}, []);

	return (
		<>
			<StyledCanvas
				ref={ref}
				orthographic
				camera={{
					zoom: 5,
					position: [200, 100, 200],
					far: 230,
					near: 50,
				}}
			>
				<color args={["#fdf3f1"]} attach={"background"} />
				<OrbitControls />
				<ambientLight />
				<LandScape />
			</StyledCanvas>
		</>
	);
}
