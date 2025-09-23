'use client';

import { FrontMatter } from 'db/blog/Schema';
import { useRef, useState } from 'react';
import { FrontMatterLoading } from '@/components/Skeletons/ui/ContentLoading';
import { BlogPostList, ScrollTrigger, ScrollTriggerHelper } from '../style';
import { BlogPostItem } from './BlogPostItem';
import { useLoadMorePublishdedPosts } from '../hooks/useLoadMorePublishdedPosts';
import { useLoadPostAnimation } from '../hooks/useLoadPostAnimation';
import { useScrollAction } from '../hooks/useScrollAction';
import type { PublishedPost } from '../types';

function filteringUniquePosts(recentlyPublished: PublishedPost) {
  const seen = new Set<string>();
  const filtered: FrontMatter[] = [];
  for (const post of recentlyPublished.frontmattters) {
    const key = `${post.category}-${post.slug}`;
    if (!seen.has(key)) {
      seen.add(key);
      filtered.push(post);
    }
  }
  return filtered;
}

export function BlogPost({ recentlyPublished }: { recentlyPublished: PublishedPost }) {
  const MAX_POST_COUNT = recentlyPublished.totalCount;
  const postListRef = useRef<HTMLUListElement>(null);
  const [publishedPost, setPublishedPost] = useState<PublishedPost>({
    totalCount: MAX_POST_COUNT,
    frontmattters: filteringUniquePosts(recentlyPublished),
  });

  const { isPending, loadMorePublishedPost } = useLoadMorePublishdedPosts(
    publishedPost,
    setPublishedPost,
    MAX_POST_COUNT
  );
  const scrollBottomRef = useRef<HTMLDivElement | null>(null);

  useScrollAction(scrollBottomRef, loadMorePublishedPost);
  useLoadPostAnimation(postListRef);

  if (publishedPost.frontmattters.length === 0) {
    return <div>현재 표시할 포스트가 없습니다.</div>;
  }

  return (
    <BlogPostList ref={postListRef} id="blog-post__recently-post-list" data-testid="blog-main__recently-post-list">
      {publishedPost.frontmattters.map((post, index) => (
        <BlogPostItem
          key={`${post.category}-${post.slug}-${index}`}
          slug={post.slug}
          title={post.title}
          summary={post.summary}
          category={post.category}
          date={new Date(post.date)}
          index={index}
        />
      ))}

      {isPending && <FrontMatterLoading length={2} />}
      <ScrollTriggerHelper data-testid={'blog-main__scroll-trigger-helper'} />
      <ScrollTrigger data-testid={'blog-main__scroll-trigger'} ref={scrollBottomRef} />
    </BlogPostList>
  );
}
