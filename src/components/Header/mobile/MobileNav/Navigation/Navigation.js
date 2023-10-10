"use client";

import styled from "styled-components";
import React from "react";

const NavWrapper = styled.button.attrs({
	className: "navigation-menu",
})`
	position: absolute;
	inset: 0px;
	width: 100vw;
	height: 100vh;

	display: flex;

	background: color-mix(in oklch, var(--color-primary) 80%, transparent);
	backdrop-filter: blur(8px);
	transition: all 500ms ease;

	&[aria-hidden="true"] {
		visibility: hidden;
		opacity: 0;
	}

	&[aria-hidden="false"] {
		visibility: visible;
		opacity: 1;
	}
`;

const MobileContainer = styled.div.attrs({
	id: "mobile-nav-btn",
})`
	position: fixed;
	inset: 0px;
	z-index: 10000;
	overflow: hidden;
`;

function Navigation({ isOpen, setOpen, children }) {
	return (
		<MobileContainer>
			<NavWrapper
				onClick={() => setOpen(!isOpen)}
				aria-hidden={!isOpen}
				tabIndex={-1}
			>
				{children}
			</NavWrapper>
		</MobileContainer>
	);
}

export default Navigation;
// style={context.isOpen ? { pointerEvents: "auto" } : { pointerEvents: "none" }
