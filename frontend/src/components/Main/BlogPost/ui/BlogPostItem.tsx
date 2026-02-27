"use client";

import { memo, useCallback, useMemo } from "react";
import type { FrontMatter } from "@/db/blog/Schema";
import { BlogPostItemComposer } from "./BlogPostItemComposer";

interface BlogPostItemProps {
  post: FrontMatter;
  index: number;
  registerItemElement?: (index: number, el: HTMLElement | null) => void;
}

export const BlogPostItem = memo(function BlogPostItem({
  post,
  index,
  registerItemElement,
}: BlogPostItemProps) {
  const titleId = `blog-post__recently-post-title-${index}`;
  const titleLinkId = `blog-post__recently-post-link-${index}`;

  const href = `/post/${post.category}/${post.slug}`;

  const dateISO = useMemo(() => new Date(post.date).toISOString(), [post.date]);
  const itemRef = useCallback(
    (element: HTMLLIElement | null) => {
      registerItemElement?.(index, element);
    },
    [index, registerItemElement],
  );

  return (
    <BlogPostItemComposer.root
      itemRef={itemRef}
      index={index}
      aria-labelledby={titleId}
      data-testid={`blog-post__recently-${index}-post-item`}
    >
      <BlogPostItemComposer.main
        href={href}
        aria-label={titleLinkId}
        scroll={true}
      >
        <BlogPostItemComposer.title>{post.title}</BlogPostItemComposer.title>
        <BlogPostItemComposer.content>
          {post.summary}
        </BlogPostItemComposer.content>
      </BlogPostItemComposer.main>
      <BlogPostItemComposer.footer dateISO={dateISO} />
    </BlogPostItemComposer.root>
  );
});
