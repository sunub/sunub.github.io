import { getPostsMetadataByCategory as getPostsMetadataByCategorySlow } from "db/blog/api";
import { PostFrontMatterSchema } from "@/db/blog/Schema";
import { API_HOST } from "@/constants/constants";
import type { PostCategory } from "@/db/blog/Schema";

const fetchPostsMetadataByCategory = async (category: PostCategory) => {
  try {
    const API_URL = `${API_HOST}/posts/${category}`;
    const data = await fetch(API_URL);
    if (!data.ok) {
      return null;
    }
    return data.json();
  } catch (error) {
    console.error("Error fetching post content:", error);
    return null;
  }
}

export async function getPostsMetadataByCategory(category: PostCategory) {
  const data = await fetchPostsMetadataByCategory(category);
  const parsedData = PostFrontMatterSchema.array().safeParse(data);
  if (parsedData.success) {
    return parsedData.data;
  }

  return getPostsMetadataByCategorySlow(category);
}