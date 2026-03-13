"use client";

import { css } from "styled-components";

export const postContentThemeVariables = css`
	--post-heading: #1a1a1a;
	--post-body: color-mix(in oklch, #1a1a1a 82%, white 18%);
	--post-body-strong: #1a1a1a;
	--post-muted: color-mix(in oklch, #1a1a1a 48%, white 52%);
	--post-surface: #ffffff;
	--post-surface-soft: #fff8f5;
	--post-accent: #ec5b13;
	--post-accent-soft: #ffd7c2;
	--post-accent-secondary: #4338ca;
	--post-border-strong: #1a1a1a;
	--post-border-soft: rgba(99, 102, 241, 0.12);
	--post-link-hover-bg: rgba(236, 91, 19, 0.12);
	--post-code-bg: #ffffff;
	--post-code-border: #1a1a1a;
	--post-code-header-bg: color-mix(
		in oklch,
		var(--post-code-bg) 92%,
		var(--post-surface-soft) 8%
	);
	--post-code-text: #1a1a1a;
	--post-code-shadow: #ffb088;
	--post-inline-code-bg: #e0e7ff;
	--post-inline-code-text: #4338ca;
	--post-inline-code-border: transparent;
	--post-shadow-accent: #ffb088;
	--post-quote-bg: #ffffff;
	--post-quote-border: #ec5b13;
	--post-table-stripe: rgba(236, 91, 19, 0.05);

	html[data-color-theme="dark"] & {
		--post-heading: #ffffff;
		--post-body: #e0e0e0;
		--post-body-strong: #ffffff;
		--post-muted: rgba(224, 224, 224, 0.6);
		--post-surface: #16161e;
		--post-surface-soft: #0f172a;
		--post-accent: #ff7f6e;
		--post-accent-soft: #ffb088;
		--post-accent-secondary: #818cf8;
		--post-border-strong: #333333;
		--post-border-soft: rgba(255, 255, 255, 0.1);
		--post-link-hover-bg: rgba(255, 127, 110, 0.15);
		--post-code-bg: #050508;
		--post-code-border: #333333;
		--post-code-header-bg: #050508;
		--post-code-text: #e0e0e0;
		--post-code-shadow: #050508;
		--post-inline-code-bg: #20202a;
		--post-inline-code-text: #f7b39f;
		--post-inline-code-border: rgba(255, 127, 110, 0.72);
		--post-shadow-accent: #ffb088;
		--post-quote-bg: #16161e;
		--post-quote-border: #ff7f6e;
		--post-table-stripe: rgba(255, 255, 255, 0.02);
	}
`;

export const postContentDisplayFont =
	"var(--pretendard-font-regular), system-ui, sans-serif";

export const postContentMonoFont =
	"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
