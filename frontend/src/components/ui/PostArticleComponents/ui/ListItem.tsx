"use client";

import styled from "styled-components";
import { postContentThemeVariables } from "./sharedTheme";

function ListItem({ children }: { children: React.ReactNode }) {
	return <Li>{children}</Li>;
}

const Li = styled.li`
	${postContentThemeVariables}

	position: relative;
	display: block;
	margin-bottom: 0.78rem;
	color: var(--post-body);
	line-height: 1.72;
	word-break: keep-all;
	font-weight: 400;

	& > ul,
	& > ol {
		margin-top: 0.75rem;
	}
`;

export { ListItem };
