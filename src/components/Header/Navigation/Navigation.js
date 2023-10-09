"use client";

import React from "react";
import styled from "styled-components";
import * as Icons from "../icon/Icons";
import { baseURL } from "@/utils/getBaseUrl";
import { animated } from "@react-spring/web";
import Link from "next/link";

const MenuWrapper = styled.nav`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const AnimateIcon = styled(animated.span)`
	width: 64px;
	height: 64px;

	border: 1px solid var("--default-border-color");
	border-radius: 16px;
	background: var(--color-elevation);

	box-shadow: var(--short-shadow);
	display: flex;
	justify-content: center;
	align-items: center;

	cursor: pointer;
	outline-offset: 4px;
	padding: 4px;

	:hover {
		box-shadow: var(--mid-shadow);
	}
`;

function Navigation({ navMenus }) {
	return (
		<MenuWrapper>
			{navMenus.map(({ menu, transform }) => {
				const translateY = transform.translateY;
				const opacity = transform.opacity;

				return (
					<Link
						key={`header_nav_${menu}`}
						href={`${baseURL}/${menu}`}
					>
						<MenuIcon
							translateY={translateY}
							opacity={opacity}
							name={menu}
						/>
					</Link>
				);
			})}
		</MenuWrapper>
	);
}

function MenuIcon({ name, translateY, opacity, ...delegated }) {
	const key = String(name).toUpperCase();
	const Icon = Icons[key];
	return (
		<AnimateIcon
			style={{
				translateY,
				opacity,
			}}
			{...delegated}
		>
			<Icon {...delegated} />
		</AnimateIcon>
	);
}

export default Navigation;
