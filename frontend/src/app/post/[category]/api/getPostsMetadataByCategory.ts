import { API_PATHS } from "@/shared/api/endpoints";
import { apiGet } from "@/shared/api/http";
import { PostFrontMatterSchema } from "@sunub/types";
import type { PostCategory } from "@sunub/types";

const fetchPostsMetadataByCategory = async (category: PostCategory) => {
	try {
		return await apiGet(API_PATHS.posts.byCategory(category));
	} catch (error) {
		console.error("Error fetching post content:", error);
		return null;
	}
};

export async function getPostsMetadataByCategory(category: PostCategory) {
	const data = await fetchPostsMetadataByCategory(category);
	const parsedData = PostFrontMatterSchema.array().safeParse(data);
	if (parsedData.success) {
		return parsedData.data;
	}
	return [];
}
