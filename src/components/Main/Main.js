"use client";

import styled from "styled-components";
import HeroImage from "../LandingPage/HeroImage";

const Wrapper = styled.div`
	grid-area: main-content;

	margin-left: auto;
	margin-right: auto;
	padding-left: 32px;
	padding-right: 32px;
`;

function Main({ children }) {
	return (
		<Wrapper>
			<HeroImage />
			{children}
		</Wrapper>
	);
}

export default Main;
