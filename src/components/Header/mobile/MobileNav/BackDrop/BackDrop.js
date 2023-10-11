import styled from "styled-components";
import React from "react";

const BackDropBtn = styled.button.attrs({
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

const BackDropWrapper = styled.div.attrs({
	id: "mobile-nav-btn",
})`
	position: fixed;
	inset: 0px;
	z-index: 10000;
	overflow: hidden;
`;

function BackDrop({ isOpen, setOpen }) {
	return (
		<BackDropWrapper>
			<BackDropBtn
				onClick={() => setOpen(!isOpen)}
				aria-hidden={!isOpen}
				tabIndex={-1}
			/>
		</BackDropWrapper>
	);
}

export default BackDrop;
