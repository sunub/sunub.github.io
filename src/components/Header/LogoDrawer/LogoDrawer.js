"use client";

import React from "react";
import styled from "styled-components";
import Logo from "../Logo/Logo";
import Dash from "@/constants/Dash";
import Navigation from "../Navigation";

const NAV_MENU = ["web", "code", "cs", "algorithm"];

const Container = styled.nav`
	display: flex;

	flex-direction: column;
	align-items: center;

	border-radius: 18px;
	padding-top: 16px;
	padding-bottom: 16px;
`;

function LogoDrawer() {
	const [isHovering, setIsHovering] = React.useState(false);

	return (
		<Container>
			<Logo />
			<Dash />
			<Navigation navMenus={NAV_MENU} />
		</Container>
	);
}

export default LogoDrawer;
