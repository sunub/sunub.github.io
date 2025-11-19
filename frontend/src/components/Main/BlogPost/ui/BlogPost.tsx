'use client';

import type { PublishedPost } from '../types';
import { BlogPostProvider } from './BlogPostProvider';
import { BlogPostListViewComposer } from './BlogPostListView';

export function BlogPost({ recentlyPublished }: { recentlyPublished: PublishedPost }) {
  return (
    <BlogPostProvider initialData={recentlyPublished}>
      <BlogPostListViewComposer.root>
        <BlogPostListViewComposer.trigger />
        <BlogPostListViewComposer.loader />
      </BlogPostListViewComposer.root>
    </BlogPostProvider>
  );
}