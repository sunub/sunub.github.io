import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Elevation from "@/constants/Elevation";
import { CODE, CS, ALGORITHM, WEB } from "@/components/icon/Category";
import { Spacer } from "@/constants/Spacer";

const Icon = styled.div`
	grid-area: icon;
`;

const Header = styled.header`
	grid-area: header;

	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-left: var(--size4);
	text-align: left;
	word-break: break-all;
	font-weight: 700;

	& > time {
		justify-self: flex-start;
		font-size: calc(1rem);
	}

	@media (max-width: 768px) {
		flex-direction: column;
		& > time {
			font-size: calc(0.575rem);
		}
	}
`;

const Description = styled.section`
	grid-area: content;
	display: inline-flex;
`;

const Footer = styled.time`
	grid-area: footer;

	font-size: 10px;
	word-break: break-all;
	justify-self: center;
`;

const Wrapper = styled(Link)`
	display: grid;
	align-items: center;

	grid-template-rows: [icon] 15px [header] minmax(1ch, 1fr) [footer] 15px;
	grid-template-columns: 1fr;

	width: 100%;
	height: 100%;
	padding: 1rem;

	transition: background 350ms ease 0s;
	cursor: pointer;
	touch-action: manipulation;
	&:hover {
		h1 {
			color: var(--color-highlightColor);
			text-decoration: underline;
			text-decoration-thickness: 6px;
			text-underline-offset: 10px;
		}
	}

	@media (max-width: 768px) {
		grid-template:
			"header"
			"content" / 1fr;

		${Icon} {
			display: none;
			visibility: hidden;
			opacity: 0;
		}
	}

	@media (max-width: 320px) {
		padding: 16px;
		column-gap: 0;

		${Header} {
			flex-direction: column;

			h1 {
				font-size: 1.25rem;
			}

			time {
				font-size: 4px;
			}
		}

		${Description} {
			font-size: 8px;
			justify-self: center;
		}
	}
`;

export default function Card({ baseURL, frontMatter }) {
	const { category, date, slug, title } = frontMatter;
	let icon;
	switch (category.toUpperCase()) {
		case "WEB":
			icon = WEB;
			break;
		case "ALGORITHM":
			icon = ALGORITHM;
			break;
		case "CODE":
			icon = CODE;
			break;
		case "CS":
			icon = CS;
			break;
	}

	return (
		<Elevation
			$width={120}
			$height={216}
			$border={15}
			$distance="short"
			$usage="other"
		>
			<Wrapper href={`${baseURL}/${category}/${slug}`} tabIndex={1}>
				<Icon>
					<Spacer axis="vertical" size={32} />
					{icon}
				</Icon>
				<Header>
					<p>{title}</p>
				</Header>
				<Footer>{date.slice(2)}</Footer>
			</Wrapper>
		</Elevation>
	);
}
