"use client";

import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Elevation from "@/constants/Elevation";
import * as Icons from "@/components/LandingPage/Icons/Icons";

const Wrapper = styled.article`
	${Elevation(170, 216, 15, "short", "other")}
`;

const Header = styled.h3`
	grid-area: card-header;

	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: var(--size4);
	text-align: left;
	word-break: break-all;
	font-weight: 700;

	& > h3 {
		font-size: calc(1.375rem);
	}

	@media (max-width: 768px) {
		flex-direction: column;
		& > time {
			font-size: calc(0.575rem);
		}
	}
`;

const Footer = styled.time`
	grid-area: card-footer;

	font-size: 10px;
	word-break: break-all;
	justify-self: center;
`;

const LinkWrapper = styled(Link)`
	display: grid;
	align-items: center;

	grid:
		[card-icon] 0.2fr
		[card-header] minmax(1ch, 1fr)
		[card-footer] 15px / 1fr;

	height: 100%;
	padding: 1rem;

	transition: background 350ms ease 0s;
	cursor: pointer;
	touch-action: manipulation;
`;

const IconWrapper = styled.div`
	grid-area: card-icon;
	display: flex;
`;

const ICONS_BY_VARIANT = {
	web: Icons.WEB,
	algorithm: Icons.ALGORITHM,
	code: Icons.CODE,
	cs: Icons.CS,
};

export default function Card({ frontMatter }) {
	const { category, date, slug, title } = frontMatter;
	const IconComponent = ICONS_BY_VARIANT[category];
	return (
		<Wrapper>
			<LinkWrapper href={`/${category}/${slug}`} tabIndex={1}>
				<IconWrapper>{IconComponent}</IconWrapper>
				<Header>{title}</Header>
				<Footer>{date.slice(2)}</Footer>
			</LinkWrapper>
		</Wrapper>
	);
}
