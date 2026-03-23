"use server";

import { getAllPostsFromIndex } from "@/server/posts";

export async function getAllPosts() {
	try {
		return await getAllPostsFromIndex();
	} catch (error) {
		console.error("Failed to fetch all posts:", error);
		return [];
	}
}
