"use client";

import Elevation from "@/constants/Elevation";
import * as Icons from "../icon/Icons";
import { baseURL } from "@/utils/getBaseUrl";
import Link from "next/link";
import styled from "styled-components";
import React from "react";

const LogoLink = styled(Link)`
	display: flex;
	align-items: center;
	justify-items: center;
	outline-offset: 4px;

	position: relative;
	z-index: 10001;
	width: 64px;
	height: 64px;

	border: 2px solid var(--color-bird);
	border-radius: 16px;
	background: var(--color-elevation);

	box-shadow: var(--long-shadow);

	display: flex;
	justify-content: center;
	align-items: center;
`;
// 150, 275 400 525,

function Logo({ transaltes, ...delegated }, ref) {
	return (
		<LogoLink
			onMouseOver={() =>
				transaltes.map(({ translateY, opacity }, i) => {
					opacity.start(1);
					translateY.start(0);
				})
			}
			onMouseOut={() =>
				transaltes.map(({ translateY, opacity, yValue }, i) => {
					translateY.start(yValue);
					opacity.start(0);
				})
			}
			ref={ref}
			{...delegated}
			href={`${baseURL}/`}
		>
			<Icons.BirdLogo />
		</LogoLink>
	);
}

export default React.forwardRef(Logo);
