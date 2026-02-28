"use server";

import { API_PATHS } from "@/shared/api/endpoints";
import { apiGet } from "@/shared/api/http";
import { PostFrontMatterSchema } from "@sunub/types";

export async function getAllPosts() {
	try {
		const data = await apiGet(API_PATHS.posts.all());
		const parsedData = PostFrontMatterSchema.array().safeParse(data);
		if (!parsedData.success) {
			return [];
		}

		return parsedData.data;
	} catch (error) {
		console.error("Failed to fetch all posts:", error);
		return [];
	}
}
