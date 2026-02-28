"use server";

import { API_PATHS } from "@/shared/api/endpoints";
import { apiGet } from "@/shared/api/http";
import { PostFrontMatterSchema } from "@sunub/types";

export async function getAllPosts() {
	const data = await apiGet(API_PATHS.posts.all());
	const parsedData = PostFrontMatterSchema.array().safeParse(data);
	if (!parsedData.success) {
		return [];
	}

	return parsedData.data;
}
