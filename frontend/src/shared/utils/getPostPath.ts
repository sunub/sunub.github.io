import path from 'node:path';

export const getPostPath = (category: string, slug: string) => {
  const ROOT_BLOG_PATH = path.join(process.cwd(), 'posts');
  const filePath = path.join(ROOT_BLOG_PATH, category, `${slug}.mdx`);
  return filePath;
};
