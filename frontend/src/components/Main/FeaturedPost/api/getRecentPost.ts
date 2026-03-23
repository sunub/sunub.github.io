"use server";

import type { PublishedPost } from "@sunub/types";
import { getLatestPublishedPosts } from "@/server/posts";

const ErrorRecentPost: PublishedPost = {
	totalCount: 0,
	frontmatters: [],
};

export async function getRecentPost() {
	try {
		return await getLatestPublishedPosts(4);
	} catch (error) {
		console.error("Error loading recent posts from index:", error);
		return ErrorRecentPost;
	}
}
