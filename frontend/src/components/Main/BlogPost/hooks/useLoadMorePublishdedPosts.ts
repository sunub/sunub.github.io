import throttle from 'lodash.throttle';
import { useTransition } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { FrontMatter } from '@/db/blog/Schema';
import { getAdditionalPost } from '../ui/utils';

type PublishedPost = {
  totalCount: number;
  frontmattters: FrontMatter[];
};

const THROTTLE_DELAY = 300;

async function addNewPublishedPost(current: FrontMatter[], setPublishedPost: Dispatch<SetStateAction<PublishedPost>>) {
  const nextEnd = current.length + 10;
  const [dataPromise, _] = await Promise.all([
    getAdditionalPost(current.length, nextEnd),
    new Promise(resolve => setTimeout(resolve, 500)),
  ]);

  const seen = new Set(current.map(p => `${p.category}-${p.slug}`));
  const filteredNewPosts = dataPromise.frontmattters.filter(p => {
    const key = `${p.category}-${p.slug}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });

  if (filteredNewPosts.length === 0) {
    return;
  }

  setPublishedPost(prev => ({
    ...prev,
    frontmattters: [...prev.frontmattters, ...filteredNewPosts],
  }));
}

export function useLoadMorePublishdedPosts(
  publishedPost: PublishedPost,
  setPublishedPost: Dispatch<SetStateAction<PublishedPost>>,
  MAX_POST_COUNT: number
) {
  const [isPending, startTransition] = useTransition();
  const loadMorePublishedPost = throttle(() => {
    const current = publishedPost.frontmattters;
    if (current.length >= MAX_POST_COUNT) {
      return;
    }
    startTransition(async () => await addNewPublishedPost(current, setPublishedPost));
  }, THROTTLE_DELAY);

  return { isPending, loadMorePublishedPost };
}
