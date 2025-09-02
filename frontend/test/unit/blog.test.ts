import { describe, expect, test } from 'vitest';
import { readdir } from 'fs/promises';
import path from 'path';
import { getPostsMetadataByCategory, getRecentPostsMetadata } from '../../db/blog/api';
import { Post } from '../../db/blog/Posts';
import { FrontMatterSchema } from '../../db/blog/Schema';

const postsPath = path.join(process.cwd(), '..', 'posts');

describe('블로그 포스트의 카테고리를 잘 처리하는가?', () => {
  test('Web 개발 카테고리', async () => {
    const webPostPath = path.join(postsPath, 'web');
    const actualWebPostFiles = await readdir(webPostPath);

    const post = Post.getInstance();
    await post.createProcessedFrontMatter('web');

    expect(post.web.length).toBe(actualWebPostFiles.length);
  });

  test('Algorithm 카테고리', async () => {
    const algorithmPostPath = path.join(postsPath, 'algorithm');
    const actualAlgorithmPostFiles = await readdir(algorithmPostPath);

    const post = Post.getInstance();
    await post.createProcessedFrontMatter('algorithm');

    expect(post.algorithm.length).toBe(actualAlgorithmPostFiles.length);
  });

  test('Code 카테고리', async () => {
    const codePostPath = path.join(postsPath, 'code');
    const actualCodePostFiles = await readdir(codePostPath);

    const post = Post.getInstance();
    await post.createProcessedFrontMatter('code');

    expect(post.code.length).toBe(actualCodePostFiles.length);
  });

  test('CS 카테고리', async () => {
    const csPostPath = path.join(postsPath, 'cs');
    const actualCsPostFiles = await readdir(csPostPath);

    const post = Post.getInstance();
    await post.createProcessedFrontMatter('cs');

    expect(post.cs.length).toBe(actualCsPostFiles.length);
  });
});

describe('블로그 포스트 API 테스트', () => {
  test('정해진 청크 사이즈의 FrontMatter를 반환하는가?', async () => {
    const batchSize = 20;
    const recentPosts = await getRecentPostsMetadata(batchSize);
    const chunkedPosts = await recentPosts.next();
    expect(chunkedPosts.done).toBe(false);
    if (!chunkedPosts.done) {
      expect(chunkedPosts.value.length).toBeLessThanOrEqual(batchSize);
    }
  });

  test('FrontMatter가 올바른 형식인가?', async () => {
    const webPosts = await getPostsMetadataByCategory('web');
    const algorithmPosts = await getPostsMetadataByCategory('algorithm');
    const codePosts = await getPostsMetadataByCategory('code');
    const csPosts = await getPostsMetadataByCategory('cs');

    expect(webPosts.map(post => FrontMatterSchema.safeParse(post.frontmatter).success)).toEqual(
      Array(webPosts.length).fill(true)
    );
    expect(algorithmPosts.map(post => FrontMatterSchema.safeParse(post.frontmatter).success)).toEqual(
      Array(algorithmPosts.length).fill(true)
    );
    expect(codePosts.map(post => FrontMatterSchema.safeParse(post.frontmatter).success)).toEqual(
      Array(codePosts.length).fill(true)
    );
    expect(csPosts.map(post => FrontMatterSchema.safeParse(post.frontmatter).success)).toEqual(
      Array(csPosts.length).fill(true)
    );
  });
});
