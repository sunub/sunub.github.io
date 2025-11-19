'use client';

import { memo, useMemo } from 'react';
import { FrontMatter } from '@/db/blog/Schema'; 
import { BlogPostItemComposer } from './BlogPostItemComposer';

interface BlogPostItemProps {
  post: FrontMatter;
  index: number;
}

export const BlogPostItem = memo(function BlogPostItem({ post, index }: BlogPostItemProps) {
  const titleId = `blog-post__recently-post-title-${index}`;
  const titleLinkId = `blog-post__recently-post-link-${index}`;
  
  const href = `/post/${post.category}/${post.slug}`;
  
  const dateISO = useMemo(() => 
    new Date(post.date).toISOString(),
    [post.date]
  );

  return (
    <BlogPostItemComposer.root
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
        <BlogPostItemComposer.content>{post.summary}</BlogPostItemComposer.content>
      </BlogPostItemComposer.main>
      <BlogPostItemComposer.footer dateISO={dateISO} />
    </BlogPostItemComposer.root>
  );
});
