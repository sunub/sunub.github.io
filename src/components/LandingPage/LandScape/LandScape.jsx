"use client";

import React from "react";
import styled from "styled-components";
import useHasMounted from "@/hooks/use-mounted.hook";
import { Canvas } from "@react-three/fiber";
import Object from "./Objects";
import Spacer from "@/components/Spacer";
// import HeroImage from "../HeroImage";

const Wrapper = styled.div`
	grid-area: main-content;

	width: 100dvw;
`;

function LandScape({ children }) {
	const hasMount = useHasMounted();

	if (!hasMount) {
		return null;
	}

	return (
		<Wrapper>
			<Spacer axis="vertical" size={32} />
			<Canvas
				style={{
					height: "80dvh",
					width: "100%",
				}}
				orthographic
				camera={{
					zoom: 2,
					position: [0, 0, 200],
					far: 300,
					near: 50,
				}}
				dpr={[1, 1.5]}
			>
				<Object position={[0, -100, 0]} />
			</Canvas>

			{children}
		</Wrapper>
	);
}

export default LandScape;
