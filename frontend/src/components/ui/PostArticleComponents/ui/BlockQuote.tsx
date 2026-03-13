"use client";

import type React from "react";
import styled from "styled-components";
import { postContentThemeVariables } from "./sharedTheme";

const BlockquoteStyle = styled.blockquote`
	${postContentThemeVariables}

	position: relative;
	margin: 2.25rem 0;
	border-left: 6px solid var(--post-quote-border);
	border-top: 2px solid var(--post-border-strong);
	border-right: 2px solid var(--post-border-strong);
	border-bottom: 2px solid var(--post-border-strong);
	border-radius: 0 1rem 1rem 0;
	padding: 1.6rem 1.75rem 1.6rem 2rem;
	background: var(--post-quote-bg);
	color: var(--post-body);
	box-shadow: 4px 4px 0 var(--post-shadow-accent);

	& > h1,
	& > h2,
	& > h3,
	& > h4,
	& > h5,
	& > h6 {
		margin-top: 0;
	}
`;

const Bookmark = styled.div`
	${postContentThemeVariables}

	position: absolute;
	left: 1rem;
	top: 1rem;
	color: var(--post-accent);
`;

function BookmarIcon() {
	return (
		<Bookmark>
			<svg
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className="feather feather-book"
			>
				<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
				<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
			</svg>
		</Bookmark>
	);
}

function Blockquote({ children }: { children: React.ReactNode }) {
	return (
		<BlockquoteStyle>
			<BookmarIcon />
			{children}
		</BlockquoteStyle>
	);
}

export { Blockquote };
