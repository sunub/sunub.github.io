"use server";

import getBlogInstance from "./blog";
import { type PostCategory } from "@/types/schema";
import { fx } from "db/utils/fx";
import { cache } from "react";

const DAY_IN_SECONDS = 86400;

export const getRecentPostsMetadata = cache(async (count: number = 10) => {
  const blog = await getBlogInstance();
  return fx(blog.sortedPosts)
    .take(count)
    .map((post) => post.frontmatter)
    .toArray();
});

export const getRecentPostsMetadataInRange = cache(
  async (start: number, end: number) => {
    const blog = await getBlogInstance();
    return {
      totalCount: blog.sortedPosts.length,
      frontmattters: fx(blog.sortedPosts)
        .slice(start, end)
        .map((post) => post.frontmatter)
        .toArray(),
    };
  }
);

export const getAllPosts = cache(async () => {
  const blog = await getBlogInstance();
  return fx(blog.sortedPosts)
    .map((post) => post.frontmatter)
    .toArray();
});

export const getPostsMetadataByCategory = cache(
  async (category: PostCategory) => {
    const blog = await getBlogInstance();
    return await blog.getPostsMetadataByCategory(category);
  }
);

export const getPostMetadataBySlug = cache(
  async (category: PostCategory, slug: string) => {
    const blog = await getBlogInstance();
    return blog.getPostMetadataBySlug(category, slug);
  }
);

export const getPostContent = cache(
  async (category: PostCategory, slug: string) => {
    const blog = await getBlogInstance();
    return await blog.getPostContent(category, slug);
  }
);
