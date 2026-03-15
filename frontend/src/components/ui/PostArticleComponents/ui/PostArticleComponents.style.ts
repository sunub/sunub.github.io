import styled, { css } from "styled-components";
import {
	postContentDisplayFont,
	postContentThemeVariables,
} from "./sharedTheme";

const LinkSVG = styled.svg`
	width: 1rem;
	height: 1rem;
	color: var(--post-accent);
`;

const LinkAnchor = styled.a`
	${postContentThemeVariables}

	position: absolute;
	left: -2rem;
	top: 0.18em;
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 1.35rem;
	height: 1.35rem;
	border: none;
	outline-offset: 4px;
	opacity: 0;
	transform: translateX(-0.25rem);
	transition:
		opacity 180ms ease,
		transform 180ms ease;

	@media (max-width: 768px) {
		left: -1.55rem;
		width: 1.15rem;
		height: 1.15rem;
		opacity: 0.68;
		transform: none;
	}

	@media (hover: none) {
		opacity: 0.68;
		transform: none;
	}
`;

const baseHeadingStyles = css`
	${postContentThemeVariables}

	position: relative;
	display: block;
	width: fit-content;
	margin-top: 2rem;
	margin-bottom: 1rem;
	padding: 0;
	border: none;
	outline-offset: 4px;
	color: var(--post-heading);
	font-family: ${postContentDisplayFont};
	letter-spacing: -0.03em;
	line-height: 1.15;

	&:hover ${LinkAnchor} {
		opacity: 1;
		transform: translateX(0);
	}

	&:focus-within ${LinkAnchor} {
		opacity: 1;
		transform: translateX(0);
	}

	& > .post-heading-titles {
		display: inline;
		color: var(--post-heading);
		word-break: keep-all;
		text-wrap: pretty;
	}

	& > .post-heading-titles a {
		color: inherit;
		text-decoration: none;
		border: 0;
		padding: 0;
		border-radius: 0;
		background: transparent;
		font: inherit;
		font-weight: inherit;
		word-break: keep-all;
		transition: color 180ms ease;
	}

	& > .post-heading-titles a:hover {
		color: color-mix(in oklch, var(--post-accent) 82%, var(--post-heading));
	}

	& > .post-heading-titles strong,
	& > .post-heading-titles em,
	& > .post-heading-titles code {
		color: inherit;
		font: inherit;
		background: transparent;
		border: 0;
		padding: 0;
		box-shadow: none;
	}

	@media (max-width: 768px) {
		max-width: calc(100% - 1rem);
	}
`;

const H1 = styled.h1`
	${baseHeadingStyles}
	font-size: clamp(2.8rem, 4.8vw, 3.5rem);
	font-weight: 800;
	line-height: 1.1;
	margin-bottom: 1.5rem;
	max-width: 16ch;
`;

const H2 = styled.h2`
	${baseHeadingStyles}
	font-size: 2.25rem;
	font-weight: 800;
	margin-top: 3rem;
	margin-bottom: 1.5rem;

	& > span {
		position: relative;
		display: inline-block;
		padding-bottom: 0.5rem;
	}

	& > span::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: -0.25rem;
		width: 100%;
		height: 0.25rem;
		border-radius: 0.125rem;
		background: var(--post-accent);
	}
`;

const H3 = styled.h3`
	${baseHeadingStyles}
	font-size: 1.5rem;
	font-weight: 800;
	margin-top: 2rem;
	margin-bottom: 1rem;

	& > span {
		position: relative;
		padding-left: 1.75rem;
	}

	& > span::before {
		content: "";
		position: absolute;
		left: 0;
		top: 50%;
		width: 0.7rem;
		height: 0.7rem;
		border-radius: 0.04rem;
		background: var(--post-accent);
		transform: translateY(-50%) rotate(45deg);
	}

	h2 + & {
		margin-top: 1rem;
	}
`;

const H4 = styled.h4`
	${baseHeadingStyles}
	font-size: 1.22rem;
	font-weight: 800;
	letter-spacing: -0.02em;
	margin-top: 1.5rem;
	margin-bottom: 0.75rem;
`;

const H5 = styled.h5`
	${baseHeadingStyles}
	font-size: 1.1rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.08em;
	color: var(--post-accent);

	& > span {
		color: var(--post-accent);
	}
`;

const H6 = styled.h6`
	${baseHeadingStyles}
	font-size: 0.9rem;
	font-weight: 800;
	text-transform: uppercase;
	letter-spacing: 0.12em;
	color: var(--post-muted);

	& > span {
		color: var(--post-muted);
	}
`;

const P = styled.p`
	${postContentThemeVariables}

	margin-top: 1.25rem;
	margin-bottom: 1.25rem;
	max-width: 72ch;
	color: var(--post-body);
	font-size: clamp(1rem, 1vw + 0.85rem, 1.1rem);
	line-height: 1.72;
	word-break: keep-all;
	text-wrap: pretty;
`;

const ParagraphFlow = styled.div`
	${postContentThemeVariables}

	margin-top: 1.25rem;
	margin-bottom: 1.25rem;
	width: 100%;

	& > *:first-child {
		margin-top: 0;
	}

	& > *:last-child {
		margin-bottom: 0;
	}
`;

const Pre = styled.pre`
	${postContentThemeVariables}

	margin: 2rem 0;
	padding: 1.5rem;
	overflow-x: auto;
	border-radius: 0.75rem;
	border: 2px solid var(--post-code-border);
	background: var(--post-code-bg);
	box-shadow: 4px 4px 0 var(--post-code-shadow);
	color: var(--post-code-text);
	font-size: 0.92rem;
	line-height: 1.8;

	& > code {
		white-space: pre;
	}
`;

const Strong = styled.strong`
	${postContentThemeVariables}

	color: var(--post-body-strong);
	font-weight: 800;
`;

const Emphasis = styled.em`
	${postContentThemeVariables}

	color: var(--post-body-strong);
	font-style: italic;
`;

export {
	Emphasis,
	H1,
	H2,
	H3,
	H4,
	H5,
	H6,
	LinkAnchor,
	LinkSVG,
	P,
	ParagraphFlow,
	Pre,
	Strong,
};
