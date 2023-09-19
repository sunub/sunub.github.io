import React from "react";
import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { baseURL } from "@/utils/getBaseUrl";

const Icon = styled(Image)`
	grid-area: icon;

	align-self: center;
	justify-self: center;

	visibility: visible;
	opacity: 1;
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

const Wrapper = styled(Link)`
	display: grid;
	grid-template:
		"icon header"
		"empty content" / 50px minmax(1ch, 1fr);
	position: relative;

	background: var(--color-primary);
	transition: background 350ms ease 0s;
	border: none 0px transparent;
	border-radius: var(--size-5);
	background-color: var(--color-primary);

	padding: 2rem 2rem 3rem 2rem;
	gap: clamp(1rem, 1.25rem, 1.5rem);

	cursor: pointer;
	touch-action: manipulation;
	&:hover {
		box-shadow: var(--box-shadow-1);

		h1 {
			color: var(--color-highlightColor);
			text-decoration: underline;
			text-decoration-thickness: 6px;
			text-underline-offset: 10px;
		}
	}

	&:active {
		border-radius: 30px;
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
export default function Content({
	category,
	date,
	summary,
	slug,
	title,
	tags,
}) {
	return (
		<Wrapper href={`${baseURL}/${category}/${slug}`} tabIndex={1}>
			<Icon
				src={`/icon_${tags}.svg`}
				width={32}
				height={32}
				alt={`Image ${category}`}
			/>
			<Header>
				<h3>{title}</h3>
				<time>{date}</time>
			</Header>
			<Description>
				<p>{summary}</p>
			</Description>
		</Wrapper>
	);
}
