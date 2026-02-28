"use server";

import { API_PATHS } from "@/shared/api/endpoints";
import { buildApiUrl } from "@/shared/api/config";
import { PublishedPostSchema, type PublishedPost } from "@sunub/types";

const ErrorAdditionalPost: PublishedPost = {
	totalCount: 0,
	frontmatters: [],
} as const;

const getAdditionalPostFetch = async (start: number, end: number) => {
	const API_URL = buildApiUrl(API_PATHS.posts.latestRange(start, end));
	const data = await fetch(API_URL);
	if (!data.ok) {
		return null;
	}
	return data.json();
};

export async function getAdditionalPost(
	start: number,
	end: number,
): Promise<PublishedPost> {
	const data = await getAdditionalPostFetch(start, end);
	const parsedData = PublishedPostSchema.safeParse(data);
	if (parsedData.success) {
		return parsedData.data;
	}
	return ErrorAdditionalPost;
}
