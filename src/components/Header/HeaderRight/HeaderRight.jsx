"use client";

import styled from "styled-components";
import Toggler from "@/components/Theme/Toggler/index";
import Spacer from "@/components/Spacer";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	visibility: visible;
	opacity: 1;
`;

const Content = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	width: 44px;
	height: 44px;
	border: 1px solid oklch(61.8% 0.027 30.58 / 0.3);
	border-radius: 50%;
	aspect-ratio: 1 / 1;
	background: var(--color-elevation);
`;

export default function HeaderRight() {
	return (
		<Container>
			<Content>
				<Toggler id={'web-header__theme-toggler'} maskId="header-mask-id" />
			</Content>
			<Spacer axis={"vertical"} size={16} />
		</Container>
	);
}
