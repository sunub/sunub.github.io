"use server";

import { API_PATHS } from "@/shared/api/endpoints";
import { apiGet } from "@/shared/api/http";
import { SpecificPostInfoSchema } from "@sunub/types";
import type { FrontMatter, PostCategory } from "@sunub/types";

export async function getPostContentByCategoryAndSlug(
	category: PostCategory,
	slug: string,
) {
	const data = await apiGet(API_PATHS.posts.bySlug(category, slug));
	const parsedData = SpecificPostInfoSchema.safeParse(data);
	if (!parsedData.success) {
		return {
			frontmatter: {} as FrontMatter,
			content: "",
		};
	}

	return parsedData.data;
}
