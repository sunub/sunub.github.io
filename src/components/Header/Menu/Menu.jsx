"use client";

import React from "react";
import Link from "next/link";
import * as Icons from "@/components/Header/icon/Icons";
import styled from "styled-components";
import { animated } from "@react-spring/web";

const Wrapper = styled(animated.div)`
	display: block;
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

	transition: box-shadow 0.2s ease-in-out;
	:hover {
		box-shadow: var(--mid-shadow);
	}
`;

function Icon({ usage }) {
	switch (usage) {
		case "web":
			return <Icons.Web />;
		case "code":
			return <Icons.Code />;
		case "cs":
			return <Icons.CS />;
		case "algorithm":
			return <Icons.Algo />;
		default:
			return <Icons.BirdLogo />;
	}
}

function Menu({ usage, y, ...delegated }) {
	console.log(y);
	return (
		<>
			<Wrapper
				onMouseOver={() => y.start("10%")}
				onMouseOut={() => y.start("0%")}
				{...delegated}
				href={`/${usage}`}
			>
				<Link href={`/${usage}`}>
					<Icon usage={usage} />
				</Link>
			</Wrapper>
		</>
	);
}

export default Menu;
