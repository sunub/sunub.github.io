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
			<Canvas style={{ height: "80dvh", width: "100%" }} dpr={2}>
				<Object />
			</Canvas>
			{children}
		</Wrapper>
	);
}

export default LandScape;
