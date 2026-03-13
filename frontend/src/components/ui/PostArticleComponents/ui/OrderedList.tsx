"use client";

import type React from "react";
import styled from "styled-components";
import {
	postContentDisplayFont,
	postContentThemeVariables,
} from "./sharedTheme";

function OrderedList({ children }: { children: React.ReactNode }) {
	return <Ol>{children}</Ol>;
}

const Ol = styled.ol`
	${postContentThemeVariables}

	margin: 1.8rem 0;
	padding-left: 0;
	list-style: none;
	counter-reset: ordered-list;

	& > li {
		position: relative;
		counter-increment: ordered-list;
		padding-left: 3rem;
		margin-bottom: 1.35rem;
		min-height: 2rem;
	}

	& > li::before {
		content: counter(ordered-list, decimal-leading-zero);
		position: absolute;
		left: 0;
		top: 0.05rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 2rem;
		height: 2rem;
		border-radius: 999px;
		background: var(--post-accent);
		border: 2px solid color-mix(in oklch, var(--post-accent) 60%, black 40%);
		color: white;
		font-family: ${postContentDisplayFont};
		font-size: 0.64rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		box-shadow: 2px 2px 0 color-mix(in oklch, black 88%, transparent);
	}

	html[data-color-theme="dark"] & > li::before {
		background: #ff5733;
		border-color: #000000;
		box-shadow: 2px 2px 0 #000000;
	}

	& > li > p:first-child {
		margin: 0 0 0.8rem;
		min-height: 2rem;
		display: flex;
		align-items: center;
		color: var(--post-body);
		font-size: 1rem;
		font-weight: 600;
		line-height: 1.62;
		text-wrap: pretty;
	}

	& > li > p:first-child code {
		font-size: 0.88em;
	}

	& > li > ul,
	& > li > ol {
		margin: 0.55rem 0 0;
		margin-left: 0;
		padding-left: 0;
	}

	& > li > ul > li,
	& > li > ol > li {
		margin-bottom: 0.6rem;
	}

	& > li:last-child {
		margin-bottom: 0;
	}

	@media (max-width: 768px) {
		& > li {
			padding-left: 2.65rem;
		}

		& > li::before {
			min-width: 1.85rem;
			height: 1.85rem;
			font-size: 0.6rem;
		}
	}
`;

export { OrderedList };
