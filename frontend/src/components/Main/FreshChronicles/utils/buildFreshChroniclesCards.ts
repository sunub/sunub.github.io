import type { FrontMatter } from "@sunub/types";
import type {
	FreshChroniclesCardData,
	FreshChroniclesCardOverride,
	FreshChroniclesCardOverrideResolver,
} from "../types";

const DEFAULT_FRESH_CHRONICLES_BADGE = "New";

function normalizeTag(tag: string) {
	return `#${tag.trim().replace(/\s+/g, "-")}`;
}

function createEyebrow(post: FrontMatter) {
	const tags = post.tags.slice(0, 2).map(normalizeTag).filter(Boolean);

	if (tags.length > 0) {
		return tags.join(" ");
	}

	return `#${post.category}`;
}

function resolveOverride(
	overrides: FreshChroniclesCardOverrideResolver | undefined,
	post: FrontMatter,
	index: number,
): FreshChroniclesCardOverride | undefined {
	if (!overrides) {
		return undefined;
	}

	if (typeof overrides === "function") {
		return overrides(post, index);
	}

	return overrides[getFreshChroniclesCardKey(post)];
}

export function getFreshChroniclesCardKey(post: FrontMatter) {
	return `${post.category}/${post.slug}`;
}

export function buildFreshChroniclesCards(
	posts: FrontMatter[],
	overrides?: FreshChroniclesCardOverrideResolver,
): FreshChroniclesCardData[] {
	return posts.map((post, index) => {
		const override = resolveOverride(overrides, post, index);
		const defaultVariant = index === 0 ? "wide" : "default";

		return {
			post,
			variant: override?.variant ?? defaultVariant,
			media: override?.media,
			badge:
				override?.badge ??
				(index === 0 ? DEFAULT_FRESH_CHRONICLES_BADGE : undefined),
			eyebrow: override?.eyebrow ?? createEyebrow(post),
		};
	});
}
