import type { FrontMatter } from "@sunub/types";
import type { ReactNode } from "react";
import { getRecentPost } from "../../FeaturedPost/api/getRecentPost";
import type { FreshChroniclesCardOverrideResolver } from "../types";
import { buildFreshChroniclesCards } from "../utils/buildFreshChroniclesCards";
import { FreshChroniclesGrid } from "./FreshChroniclesGrid";

export async function FreshChroniclesSection({
	title = "최신 포스트들",
	eyebrow = "Latest Updates",
	cardOverrides,
	posts,
	children,
}: {
	title?: string;
	eyebrow?: string;
	cardOverrides?: FreshChroniclesCardOverrideResolver;
	posts?: FrontMatter[];
	children?: ReactNode;
} = {}) {
	const resolvedPosts = posts ?? (await getRecentPost()).frontmatters;
	const cards = buildFreshChroniclesCards(resolvedPosts, cardOverrides);

	return (
		<FreshChroniclesGrid cards={cards} title={title} eyebrow={eyebrow}>
			{children}
		</FreshChroniclesGrid>
	);
}
