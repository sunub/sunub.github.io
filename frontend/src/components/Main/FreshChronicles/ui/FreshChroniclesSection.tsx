import type { FrontMatter } from "@sunub/types";
import { getRecentPost } from "../../FeaturedPost/api/getRecentPost";
import type { FreshChroniclesCardOverrideResolver } from "../types";
import { buildFreshChroniclesCards } from "../utils/buildFreshChroniclesCards";
import { FreshChroniclesGrid } from "./FreshChroniclesGrid";

export async function FreshChroniclesSection({
	title = "Fresh Chronicles",
	eyebrow = "Latest Updates",
	cardOverrides,
	posts,
}: {
	title?: string;
	eyebrow?: string;
	cardOverrides?: FreshChroniclesCardOverrideResolver;
	posts?: FrontMatter[];
} = {}) {
	const resolvedPosts = posts ?? (await getRecentPost()).frontmatters;
	const cards = buildFreshChroniclesCards(resolvedPosts, cardOverrides);

	return <FreshChroniclesGrid cards={cards} title={title} eyebrow={eyebrow} />;
}
