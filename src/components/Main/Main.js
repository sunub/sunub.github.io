"use client";

import styled from "styled-components";
import HeroImage from "../LandingPage/HeroImage";
import Spacer from "../Spacer";

const Wrapper = styled.main`
	grid-area: main-content;

	padding-left: 32px;
	padding-right: 32px;
`;

function Main({ children }) {
	return (
		<Wrapper>
			<Spacer axis={"vertical"} size={32} />
			<HeroImage />
			{children}
		</Wrapper>
	);
}

export default Main;
