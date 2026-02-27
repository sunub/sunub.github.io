"use client";

import type { PublishedPost } from "../types";
import { BlogPostProvider } from "./BlogPostProvider";

export function BlogPost({
  recentlyPublished,
  children
}: {
  recentlyPublished: PublishedPost;
  children: React.ReactNode;
}) {
  return (
    <BlogPostProvider initialData={recentlyPublished}>
      {children}
    </BlogPostProvider>
  );
}
