'use server';

import path from 'path';
import { readFile } from 'fs/promises';
import { cache } from 'react';
import { findUpDir } from 'fx_utils';

export const getPostContent = cache(async (category: string, slug: string) => {
  const postsRootPath = (await findUpDir('posts')) ?? '';
  const filePath = path.join(postsRootPath, category, `${slug}.mdx`);
  const fileContent = await readFile(filePath, 'utf8');
  const contentWithoutFrontmatter = fileContent.replace(/---[\s\S]*?---/, '');
  return contentWithoutFrontmatter;
});
