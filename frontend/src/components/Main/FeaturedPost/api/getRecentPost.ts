"use server";

import { API_PATHS } from "@/shared/api/endpoints";
import { buildApiUrl } from "@/shared/api/config";
import { PublishedPostSchema, type PublishedPost } from "@sunub/types";

const ErrorRecentPost: PublishedPost = {
	totalCount: 0,
	frontmatters: [],
};

async function getRecentPostFetch() {
	try {
		const API_URL = buildApiUrl(API_PATHS.posts.latest());
		const data = await fetch(API_URL);
		if (!data.ok) {
			throw new Error("Failed to fetch recent posts");
		}

		return data.json();
	} catch (error) {
		console.error("Error fetching recent posts:", error);
		return [];
	}
}

export async function getRecentPost() {
	const data = await getRecentPostFetch();
	const parsedData = PublishedPostSchema.safeParse(data);

	if (!parsedData.success) {
		console.error("Error parsing recent posts data:", parsedData.error);
		console.log(parsedData.error?.issues);
		return ErrorRecentPost;
	}

	return parsedData.data;
}
