"use client";

import Link from "next/link";
import styled from "styled-components";
import { Spacer } from "@/components/Spacer";

const LogoLink = styled(Link)`
	display: flex;
	flex-direction: row;

	cursor: pointer;
	font-size: 20px;
	margin-right: 32px;
	letter-spacing: -1px;
`;

const Logo = () => {
	return (
		<LogoLink href={"/"}>
			<p>@</p>
			<Spacer size={8} />
			<p>sun_ub</p>
		</LogoLink>
	);
};

export default Logo;
