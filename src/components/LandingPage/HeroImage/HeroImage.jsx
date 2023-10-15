"use client";

import React from "react";
import styled from "styled-components";
import Images from "./Images";
import Spacer from "@/components/Spacer";

const Container = styled.div`
	width: 100%;

	margin-left: auto;
	margin-right: auto;
	padding-left: 32px;
	padding-right: 32px;
`;

export default function HeroImage() {
	return (
		<Container>
			<Spacer axis={"vertical"} size={32} />
			<Images />
		</Container>
	);
}
