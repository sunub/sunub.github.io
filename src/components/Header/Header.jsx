"use client";

import styled from "styled-components";
import { SpacerBar } from "../Spacer";

const SiteHeader = styled.div`
	position: sticky;
	z-index: 5;
	top: 0px;
`;

const Container = styled.div`
	position: relative;
	z-index: 2;
	width: 100%;
	max-width: 1100px;
	margin-left: auto;
	margin-right: auto;
	padding-left: 32px;
	padding-right: 32px;
`;

const Content = styled.header`
	height: 3.75rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0px;
`;

const HeaderContainer = ({ children }) => {
	return (
		<>
			<SpacerBar size={48} />
			<SiteHeader>
				<Container>
					<Content>{children}</Content>
				</Container>
			</SiteHeader>
		</>
	);
};

export default HeaderContainer;
