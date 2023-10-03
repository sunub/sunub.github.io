"use client";

import React from "react";
import styled from "styled-components";
import useHasMounted from "@/hooks/use-mounted.hook";
import { Canvas } from "@react-three/fiber";
import Object from "./Objects";

const Wrapper = styled.div`
	grid-area: main-content;

	margin-left: 32px;
	margin-right: 32px;
	padding: 0;
`;

function LandScape({ children }) {
	const hasMount = useHasMounted();

	if (!hasMount) {
		return null;
	}

	return (
		<Wrapper>
			<Canvas
				orthographic
				camera={{
					zoom: 2,
					position: [0, 0, 200],
					far: 300,
					near: 50,
				}}
				style={{ height: "80dvh", width: "100%" }}
				dpr={[1, 1.5]}
			>
				<Object position={[0, -100, 0]} />
			</Canvas>
			{children}
		</Wrapper>
	);
}

export default LandScape;
