"use client";

import styled from "styled-components";
import { SpacerBar } from "../Spacer";
import HeaderLeft from "./HeaderLeft/index";
import HeaderRight from "./HeaderRight/index";

const TopContainer = styled.div`
	position: sticky;
	z-index: 5;
	top: 0px;
	width: 100dvw;
	max-width: 1100px;
`;

const Container = styled.div`
	position: relative;
	z-index: 2;
	margin-left: auto;
	margin-right: auto;
	padding-left: 32px;
	padding-right: 32px;
`;

const Content = styled.header`
	height: 3.75rem;
	display: flex;
	align-items: center;
	justify-content: start;
	padding: 0px;
`;

const HeaderContainer = ({ children }) => {
	return (
		<>
			<SpacerBar size={48} />
			<TopContainer>
				<Container>
					<Content>{children}</Content>
				</Container>
			</TopContainer>
		</>
	);
};

const SiteHeader = () => {
	return (
		<HeaderContainer>
			<HeaderLeft />
			<HeaderRight />
		</HeaderContainer>
	);
};

export default SiteHeader;
