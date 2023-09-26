"use client";

import React from "react";
import BaseCanvas from "@/components/WebGPU/Canvas";
import { setPhysics } from "@/components/WebGPU/Canvas.helper";
import styled from "styled-components";

const Container = styled.div`
	display: flex;
	width: 100%;
	padding: 2rem;
`;

// const Button = styled.button`
// 	position: relative;
// 	left: calc(50% - 100px);
// 	padding: 1rem;
// 	background-color: black;
// 	color: white;

// 	width: 200px;
// 	border-radius: 30px;
// 	margin-bottom: 15px;
// `;

export default function HeroImage() {
	React.useEffect(() => {
		setPhysics();
	}, []);

	return (
		<>
			<Container>
				<BaseCanvas key={"2d-physic__base-canvas"} />
			</Container>
		</>
	);
}
