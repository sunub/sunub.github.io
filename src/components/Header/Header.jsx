"use client";

import HeaderRight from "./HeaderRight";
import styles from "./Header.module.css";
import styled from "styled-components";
import React from "react";
import { Spacer } from "@/constants/Spacer";
import Logo from "./Logo";
import Dash from "@/constants/Dash";
import Menu from "./Menu";
import { useSpring, animated, useSpringValue } from "@react-spring/web";

const Container = styled.nav`
	display: flex;

	flex-direction: column;
	align-items: center;
`;

const MenuContainer = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;
const SiteHeader = () => {
	const logoRef = React.useRef(null);
	const y = useSpringValue(0, {
		config: {
			mass: 2,
			friction: 5,
			tension: 80,
		},
	});
	return (
		<div id="side-ng__header-content" className={styles.HeaderWrapper}>
			<animated.div className={styles.HeaderContainer}>
				<Container>
					<Spacer axis="vertical" size={16} />
					<Logo ref={logoRef} />
					<Dash />
					<MenuContainer>
						<Menu y={y} usage="web" />
					</MenuContainer>
				</Container>
				<HeaderRight />
			</animated.div>
		</div>
	);
};

export default SiteHeader;
