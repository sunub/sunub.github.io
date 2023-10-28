import styled from "styled-components";
import React from "react";

const BackDropBtn = styled.button.attrs({
	className: "navigation-menu",
})`
	position: absolute;
	inset: 0px;
	width: 100%;
	height: 100%;
	display: flex;
	background: color-mix(in oklch, var(--color-primary) 80%, transparent);
	backdrop-filter: blur(8px);
	transition: all 500ms ease;

	`;

const BackDropWrapper = styled.div.attrs({
	id: "mobile-nav-btn",
})`
	position: fixed;
	inset: 0px;
	z-index: 10000;
	overflow: hidden;
	height: 100dvh;
	transition: width 500ms ease;

	&[aria-hidden='true'] {
		width: 0vh;
	}
	&[aria-hidden='false'] {
		width: 100vh;
	}
`;

function BackDrop({ isOpen, setOpen }) {
	return (
		<BackDropWrapper aria-hidden={!isOpen}>
			<BackDropBtn
				onClick={() => setOpen(!isOpen)}
				tabIndex={-1}
			/>
		</BackDropWrapper>
	);
}

export default BackDrop;
