'use server';

import { readFile } from 'fs/promises';
import { findUpDir } from 'fx_utils';
import path from 'path';
import { cache } from 'react';

export const getPostContent = cache(async (category: string, slug: string) => {
  const postsRootPath = (await findUpDir('posts')) ?? '';
  const filePath = path.join(postsRootPath, category, `${slug}.mdx`);
  const fileContent = await readFile(filePath, 'utf8');
  const contentWithoutFrontmatter = fileContent.replace(/---[\s\S]*?---/, '');
  return contentWithoutFrontmatter;
});
