import { writeFile } from 'fs/promises';
import { Post } from './blog/Posts';
import { join } from 'path';

const post = Post.getInstance();
const allFrontMatters = await post.createProcessedFrontMatter();
await writeFile(
  join(process.cwd(), 'public', 'posts.json'),
  JSON.stringify(
    {
      all: allFrontMatters,
      web: post.web,
      algorithm: post.algorithm,
      code: post.code,
      cs: post.cs,
    },
    null,
    2
  ),
  'utf8'
);
