import type { PostCategory } from "@sunub/types";
import { getPostsByCategoryFromIndex } from "@/server/posts";

export async function getPostsMetadataByCategory(category: PostCategory) {
	try {
		return await getPostsByCategoryFromIndex(category);
	} catch (error) {
		console.error("Error fetching post content:", error);
		return [];
	}
}
