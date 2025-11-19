import { mkdir, writeFile } from 'fs/promises';
import { dirname, join } from 'path';
import { Post } from './blog/Posts';

const post = Post.getInstance();
const allFrontMatters = await post.createProcessedFrontMatter();

const payload = {
  all: allFrontMatters,
  web: post.web,
  algorithm: post.algorithm,
  code: post.code,
  cs: post.cs,
};

await Promise.all([
  writeJsonFile(join(process.cwd(), 'public', 'posts.json'), payload),
  writeJsonFile(join(process.cwd(), 'src', 'generated', 'posts.generated.json'), payload),
]);

async function writeJsonFile(filePath: string, data: unknown) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}
