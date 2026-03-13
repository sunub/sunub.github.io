"use client";

import styled from "styled-components";
import { postContentThemeVariables } from "./sharedTheme";

function UnOrderedList({ children }: { children: React.ReactNode }) {
	return <Ul>{children}</Ul>;
}

const Ul = styled.ul`
	${postContentThemeVariables}

	list-style: none;
	padding-left: 0;
	margin: 1.4rem 0;
	--nested-padding-left: 1.25rem;

	&:last-child {
		margin-bottom: 0;
	}

	& > li {
		padding-left: 1.05rem;
	}

	& > li::before {
		content: "-";
		position: absolute;
		left: 0;
		top: 0.86em;
		color: var(--post-accent);
		font-size: 1rem;
		font-weight: 800;
		line-height: 1;
		transform: translateY(-50%);
	}

	& ul,
	& ol {
		padding-left: var(--nested-padding-left);
		margin-top: 0.75rem;
	}

	& ul ul,
	& ol ol {
		padding-left: calc(var(--nested-padding-left) * 1.5);
	}
`;

export { UnOrderedList };
