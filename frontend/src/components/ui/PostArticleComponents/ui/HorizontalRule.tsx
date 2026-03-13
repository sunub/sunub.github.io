"use client";

import styled from "styled-components";
import { postContentThemeVariables } from "./sharedTheme";

function HorizontalRule() {
	return <Rule />;
}

const Rule = styled.hr`
	${postContentThemeVariables}

	margin: 3rem 0;
	border: none;
	height: 0;
	border-top: 2px dashed color-mix(in oklch, var(--post-accent) 72%, transparent);
	opacity: 0.9;
`;

export { HorizontalRule };
