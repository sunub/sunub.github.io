import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { baseURL } from "@/utils/getBaseUrl";
import Elevation from "@/constants/Elevation";
import { CODE, CS, ALGORITHM, WEB } from "@/components/icon/Category";

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

	& > time {
		justify-self: flex-start;
		font-size: calc(1.375rem);
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

const Wrapper = styled(Elevation)`
	display: grid;
	grid-template:
		"icon header"
		"empty content" / 50px minmax(1ch, 1fr);
	position: relative;
	border-radius: 30px;

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

export default function Card({ frontMatter }) {
	const { category, date, summary, slug, title } = frontMatter;
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
		<Link href={`${baseURL}/${category}/${slug}`} tabIndex={1}>
			<Wrapper $size={256} $distance="mid" $usage="other">
				<Icon>{icon}</Icon>
				<Header>
					<h3>{title}</h3>
					<time>{date}</time>
				</Header>
				<Description>
					<p>{summary}</p>
				</Description>
			</Wrapper>
		</Link>
	);
}
