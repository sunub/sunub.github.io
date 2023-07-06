"use client";

import Link from "next/link";
import styled from "styled-components";
import { Spacer } from "@/components/Spacer";

const LogoLink = styled.div`
	display: flex;
	flex-direction: row;

	width: 140px;
	height: 100px;
	background-color: red;
	cursor: pointer;
`;

const Tag = ({ children }) => {
	return (
		<Link href={"/"}>
			<p>@</p>
			<Spacer size={16} />
			<p>sun_ub</p>
		</Link>
	);
};

export default function Logo() {
	return <LogoLink></LogoLink>;
}
