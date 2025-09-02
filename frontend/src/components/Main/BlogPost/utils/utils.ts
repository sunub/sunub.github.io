'use server';

import { getRecentPostsMetadataInRange } from 'db/blog/api';

export async function getAdditionalPost(
  start: number,
  end: number
): Promise<{ totalCount: number; frontmattters: any[] }> {
  const { totalCount, frontmattters } = await getRecentPostsMetadataInRange(start, end);
  return { totalCount, frontmattters };
}
