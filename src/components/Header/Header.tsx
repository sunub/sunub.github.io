"use client";

import styled from "styled-components";
import HeaderLeft from "./HeaderLeft/index";
import HeaderRight from "./HeaderRight/index";
import React from "react";

const HeaderContainer = styled.div`
	background: var(--surface-1);
	position: sticky;
	z-index: 5;
	top: 0px;
`;

const Container = styled.div`
	position: relative;
	z-index: 2;
	margin-left: auto;
	margin-right: auto;
	padding-left: 32px;
	padding-right: 32px;
	width: 100%;
	max-width: 1100px;
`;

const Content = styled.header`
	height: 3.75rem;
	display: flex;
	align-items: center;
	justify-content: start;
	padding: 0px;
`;


const SiteHeader = () => {
	return (
		<HeaderContainer id="site-header" >
			<Container>
				<Content>
					<HeaderLeft />
					<HeaderRight />
				</Content>
			</Container>
		</HeaderContainer>
	);
};

export default SiteHeader;
