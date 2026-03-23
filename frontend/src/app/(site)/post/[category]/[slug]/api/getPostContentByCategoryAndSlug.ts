"use server";

import type { PostCategory, SpecificPostInfo } from "@sunub/types";
import { getPostContentFromLocalSource } from "@/server/posts";

export async function getPostContentByCategoryAndSlug(
	category: PostCategory,
	slug: string,
): Promise<SpecificPostInfo | null> {
	try {
		return await getPostContentFromLocalSource(category, slug);
	} catch (error) {
		console.error(
			`local post content load failed for ${category}/${slug}:`,
			error,
		);
		return null;
	}
}
