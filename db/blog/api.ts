"use server";

import getBlogInstance from "./blog";
import { type PostCategory } from "@/types/schema";
import { unstable_cache } from "next/cache";
import { DAY_IN_SECONDS } from "./constants";

export const getRecentPostsMetadata = unstable_cache(
  async (count: number = 10) => {
    const blog = await getBlogInstance();
    return blog.sortedPosts.slice(0, count).map((post) => post.frontmatter);
  },
  ["recent-posts-metadata"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getAllPosts = unstable_cache(
  async () => {
    const blog = await getBlogInstance();
    return blog.sortedPosts.map((post) => post.frontmatter);
  },
  ["all-posts"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getPostsMetadataByCategory = unstable_cache(
  async (category: PostCategory) => {
    const blog = await getBlogInstance();
    const targetPosts = blog[category];
    return [...targetPosts.values()];
  },
  ["posts-metadata-by-category"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getPostMetadataBySlug = unstable_cache(
  async (category: PostCategory, slug: string) => {
    const blog = await getBlogInstance();
    return blog.getPostMetadataBySlug(category, slug);
  },
  ["post-metadata-by-slug"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getPostContents = unstable_cache(
  async (category: PostCategory, slug: string) => {
    const blog = await getBlogInstance();
    return blog.getPostContent(category, slug);
  },
  ["post-contents"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);
