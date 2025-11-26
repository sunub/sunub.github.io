"use server";

import { API_HOST } from "@/constants/constants";
import {
  getAllPosts as getAllPostsSlow,
} from "@/db/blog/api";
import { PostFrontMatterSchema } from "@/db/blog/Schema";

async function fetchAllPostFrontmatter() {
  try {
    const data = await fetch(`${API_HOST}/posts/all`, {
      cache: "force-cache",
    });
    if (!data.ok) {
      throw new Error("Failed to fetch all posts");
    }
    return data.json();
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

export async function getAllPosts() {
  const data = await fetchAllPostFrontmatter();
  const parsedData = PostFrontMatterSchema.array().safeParse(data);
  if (parsedData.success) {
    return parsedData.data;
  }
  return getAllPostsSlow();
}
