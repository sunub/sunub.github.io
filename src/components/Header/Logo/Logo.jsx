"use client";

import * as Icons from "../icon/Icons";
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

function Logo({ ...delegated }) {
	return (
		<LogoLink
			aria-label={`Move to sunub's web home page.`}
			{...delegated}
			href={`/`}
		>
			<Icons.BirdLogo />
		</LogoLink>
	);
}

export default Logo;
