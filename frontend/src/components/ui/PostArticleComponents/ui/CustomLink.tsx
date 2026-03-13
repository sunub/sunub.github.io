"use client";

import Link from "next/link";
import styled from "styled-components";
import { postContentThemeVariables } from "./sharedTheme";

function CustomLink({
	href,
	children,
}: {
	href: string;
	children: React.ReactNode;
}) {
	return (
		<LinkComponent
			rel="noopener noreferrer"
			href={href}
			replace
			target="_blank"
		>
			{children}
		</LinkComponent>
	);
}

const LinkComponent = styled(Link)`
	${postContentThemeVariables}

	word-break: break-all;
	text-decoration: none;
	border-bottom: 2px dotted var(--post-accent);
	padding: 0.1rem 0.05rem;
	transition:
		background 180ms ease,
		border-bottom-style 180ms ease;
	color: var(--post-accent);
	border-radius: 2px;
	font-weight: 700;

	:hover {
		background: var(--post-link-hover-bg);
		border-bottom-style: solid;
	}
`;

export { CustomLink };
