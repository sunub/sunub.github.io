"use client";

import React from "react";
import styled from "styled-components";
import Logo from "../Logo/Logo";
import Dash from "@/constants/Dash";
import { Spacer } from "@/constants/Spacer";
import Navigation from "../Navigation";
import { NAV_MENU } from "@/constants/constants";
import { useSpringValue } from "@react-spring/web";
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

	const transformValues = [];
	const navMenus = NAV_MENU.map((menu, i) => {
		const transform = caclculateTranform(i);
		transformValues.push(transform);
		return {
			menu,
			transform,
		};
	});

	const handleMouverHover = (transformValues) => {
		if (!isHovering) {
			transformValues.map(({ translateY, opacity }) => {
				opacity.start(1);
				translateY.start(0);
			});
			setIsHovering(true);
		}
	};

	const handleMouseLeave = (transformValues) => {
		if (isHovering) {
			transformValues.map(({ translateY, opacity }) => {
				const startPosition = translateY.animation.from;
				const startOpacity = opacity.animation.from;

				translateY.start(startPosition);
				opacity.start(startOpacity);
			});
			setIsHovering(false);
		}
	};

	return (
		<Container onMouseLeave={() => handleMouseLeave(transformValues)}>
			<Logo
				handleMouverHover={handleMouverHover}
				transformValues={transformValues}
			/>
			<Dash />
			<Navigation navMenus={navMenus} />
		</Container>
	);
}

function caclculateTranform(count) {
	const y = count === 0 ? -96 : -176 - 80 * (count - 1);
	const translateY = useSpringValue(y, {
		config: {
			mass: 5,
			friction: 26,
			tension: 170,
		},
	});

	const opacity = useSpringValue(0, {
		config: {
			mass: 5,
			friction: 26,
			tension: 170,
		},
	});

	return {
		translateY,
		opacity,
	};
}

export default LogoDrawer;
