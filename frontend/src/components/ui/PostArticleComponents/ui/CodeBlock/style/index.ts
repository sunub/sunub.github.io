"use client";

import styled from "styled-components";
import {
	postContentMonoFont,
	postContentThemeVariables,
} from "../../sharedTheme";

export const ClipboardButton = styled.button`
	${postContentThemeVariables}

	width: 2rem;
	height: 2rem;
	flex-shrink: 0;
	display: grid;
	place-items: center;
	border: 1px solid transparent;
	border-radius: 0.5rem;
	background: transparent;
	color: var(--post-muted);
	opacity: 0.78;
	cursor: pointer;
	transition:
		opacity 0.2s ease,
		transform 0.2s ease,
		border-color 0.2s ease,
		background-color 0.2s ease;

	&:hover {
		opacity: 1;
		background-color: color-mix(in oklch, var(--post-accent) 10%, transparent);
		border-color: color-mix(in oklch, var(--post-accent) 28%, transparent);
		transform: translateY(-1px);
	}

	&:active {
		transform: translateY(0);
	}
`;

export const CodeBlockWrapper = styled.div`
	${postContentThemeVariables}

	margin: 2rem 0;
	background-color: var(--post-code-bg);
	border: 2px solid var(--post-code-border);
	border-radius: 0.75rem;
	box-shadow: 4px 4px 0 var(--post-code-shadow);
	overflow: hidden;
`;

export const CodeBlockHeader = styled.div`
	${postContentThemeVariables}

	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 1rem 1.5rem;
	border-bottom: 1px solid var(--post-border-soft);
	background-color: var(--post-code-header-bg);
`;

export const CodeBlockFilename = styled.span`
	${postContentThemeVariables}

	font-size: 0.7rem;
	font-weight: 800;
	color: var(--post-accent-secondary);
	text-transform: uppercase;
	letter-spacing: 0.16em;
`;

export const CodeBlockContent = styled.div`
	${postContentThemeVariables}

	position: relative;

	.shiki {
		margin: 0 !important;
		padding: 1.5rem !important;
		background: var(--post-code-bg) !important;
		border-radius: 0 !important;
		overflow-x: auto;
		font-size: 0.82rem;
		line-height: 1.8;
	}

	.shiki code {
		display: block;
		font-family: ${postContentMonoFont};
		white-space: pre;
		word-break: normal;
		overflow-wrap: normal;
	}

	.shiki code span {
		font-style: normal;
	}

	pre {
		margin: 0;
		padding: 1.5rem;
		background: var(--post-code-bg);
		overflow-x: auto;
		font-size: 0.82rem;
		line-height: 1.8;
	}

	pre code {
		display: block;
		color: var(--post-code-text);
		font-family: ${postContentMonoFont};
		white-space: pre;
		word-break: normal;
		overflow-wrap: normal;
	}
`;

export const InlineCodeStyle = styled.code`
	${postContentThemeVariables}

	display: inline-block;
	vertical-align: baseline;
	line-height: 1.4;
	padding: 0.2rem 0.4rem;
	margin: 0 0.15rem;
	border-radius: 0.25rem;
	background-color: var(--post-inline-code-bg);
	border: 1px solid var(--post-inline-code-border);
	color: var(--post-inline-code-text);
	font-size: 0.86em;
	font-weight: 500;
	font-family: ${postContentMonoFont};
	box-shadow: 0 0 0 1px color-mix(in oklch, var(--post-inline-code-border) 28%, transparent);

	html[data-color-theme="dark"] & {
		padding: 0.2rem 0.42rem;
		border-radius: 0.35rem;
	}
`;
