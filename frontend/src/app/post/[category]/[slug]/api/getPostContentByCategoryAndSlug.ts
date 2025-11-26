"use server";

import { API_HOST } from "@/constants/constants";
import {
  getPostContentByCategoryAndSlug as getPostContentByCategoryAndSlugSlow,
} from "@/db/blog/api";
import { PostSchema } from "@/db/blog/Schema";
import type { PostCategory } from "@/db/blog/Schema";

const fetchPostContentByCategoryAndSlug = async (
  category: PostCategory,
  slug: string,
) => {
  try {
    const API_URL = `${API_HOST}/posts/${category}/${slug}`;
    const data = await fetch(API_URL);
    if (!data.ok) {
      return null;
    }
    return data.json();
  } catch (error) {
    console.error("Error fetching post content:", error);
    return null;
  }
};

export async function getPostContentByCategoryAndSlug(
  category: PostCategory,
  slug: string,
) {
  const data = await fetchPostContentByCategoryAndSlug(category, slug);
  const parsedData = PostSchema.safeParse(data);
  if (parsedData.success) {
    return parsedData.data;
  }
  return await getPostContentByCategoryAndSlugSlow(category, slug);
}
