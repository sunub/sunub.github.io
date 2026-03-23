import type { FrontMatter } from "@sunub/types";
import type { CSSProperties } from "react";

type PostCardCategoryTheme = {
	accent: string;
	visualSurface: string;
};

const POST_CARD_CATEGORY_THEME: Record<
	FrontMatter["category"],
	PostCardCategoryTheme
> = {
	code: {
		accent: "oklch(63% 0.21 302)",
		visualSurface: "var(--post-card-code-visual-surface)",
	},
	web: {
		accent: "oklch(67% 0.16 244)",
		visualSurface: "var(--post-card-web-visual-surface)",
	},
	cs: {
		accent: "oklch(69% 0.16 165)",
		visualSurface: "var(--post-card-cs-visual-surface)",
	},
	algorithm: {
		accent: "oklch(76% 0.17 82)",
		visualSurface: "var(--post-card-algorithm-visual-surface)",
	},
};

export function createPostCardCssVariables(post: FrontMatter): CSSProperties {
	const theme = POST_CARD_CATEGORY_THEME[post.category];

	return {
		["--post-card-accent" as string]: theme.accent,
		["--post-card-visual-surface" as string]: theme.visualSurface,
	};
}
