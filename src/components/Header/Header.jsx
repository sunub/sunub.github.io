"use client";

import HeaderRight from "./HeaderRight";
import styles from "./Header.module.css";
import styled from "styled-components";
import React from "react";
import { Spacer } from "@/constants/Spacer";
import Logo from "./Logo";
import Dash from "@/constants/Dash";
import Menu from "./Menu";
import {
	useSpring,
	animated,
	useSpringValue,
	useChain,
} from "@react-spring/web";

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
	const webRef = React.useRef(null);
	const codeRef = React.useRef(null);
	const csRef = React.useRef(null);
	const algoRef = React.useRef(null);

	const names = ["web", "code", "cs", "algorithm"];
	const icons = Array.from({ length: 4 }, () => 0);
	const transaltes = [];
	for (let i = 0; i < icons.length; i++) {
		const opacity = useSpringValue(0, {
			config: {
				mass: 5,
				friction: 26,
				tension: 170,
			},
		});
		let yValue = -150;
		if (i !== 0) {
			yValue = -275 - 125 * (i - 1);
		}
		const translateY = useSpringValue(yValue, {
			config: {
				mass: 5,
				friction: 26,
				tension: 170,
			},
		});
		transaltes.push({ opacity, translateY, yValue });

		icons[i] = {
			usage: names[i],
			translateY,
			opacity,
		};
	}

	const backgroundTimeout = React.useRef(null);
	function handleHover({ hovering }) {
		if (hovering) {
			if (backgroundTimeout.current) {
				clearTimeout(backgroundTimeout.current);
			}
		}

		if (!hovering) {
			backgroundTimeout.current = setTimeout(() => {
				transaltes.map(({ translateY, opacity }, i) => {
					translateY.start(`0%`);
					opacity.start(1);
				});
			}, 1000);
		}
	}

	return (
		<div id="side-ng__header-content" className={styles.HeaderWrapper}>
			<animated.div className={styles.HeaderContainer}>
				<Container>
					<Spacer axis="vertical" size={16} />
					<Logo ref={logoRef} transaltes={transaltes} />
					<Dash />
					<MenuContainer>
						{icons.map((icon) => (
							<Menu
								key={icon.usage}
								translateY={icon.translateY}
								opacity={icon.opacity}
								{...icon}
							/>
						))}
					</MenuContainer>
				</Container>
				<HeaderRight />
			</animated.div>
		</div>
	);
};

export default SiteHeader;
