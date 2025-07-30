import ora from 'ora';
import getBlogInstance from '../frontend/db/blog/blog';
import { Post } from '../frontend/db/blog/Posts';
import { describe, expect, test } from 'vitest';
import path from 'path';
import { readdir } from 'fs/promises';
import { getRecentPostsMetadata, getPostsMetadataByCategory } from '../frontend/db/blog/api';
import { FrontMatterSchema } from '../frontend/db/blog/Schema';

describe('블로그 포스트의 카테고리를 잘 처리하는가?', () => {
  test('Web 개발 카테고리', async () => {
    const webPostPath = path.join(process.cwd(), 'posts', 'web');
    const actualWebPostFiles = await readdir(webPostPath);

    const post = Post.getInstance();
    await post.createProcessedFrontMatter('web');

    expect(post.web.length).toBe(actualWebPostFiles.length);
  });

  test('Algorithm 카테고리', async () => {
    const algorithmPostPath = path.join(process.cwd(), 'posts', 'algorithm');
    const actualAlgorithmPostFiles = await readdir(algorithmPostPath);

    const post = Post.getInstance();
    await post.createProcessedFrontMatter('algorithm');

    expect(post.algorithm.length).toBe(actualAlgorithmPostFiles.length);
  });

  test('Code 카테고리', async () => {
    const codePostPath = path.join(process.cwd(), 'posts', 'code');
    const actualCodePostFiles = await readdir(codePostPath);

    const post = Post.getInstance();
    await post.createProcessedFrontMatter('code');

    expect(post.code.length).toBe(actualCodePostFiles.length);
  });

  test('CS 카테고리', async () => {
    const csPostPath = path.join(process.cwd(), 'posts', 'cs');
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

async function streaming() {
  const spinner = ora('Streaming 방식 메모리 사용량 측정 중...').start();
  const initialMem = process.memoryUsage();
  console.log(`\n초기 메모리 사용량: ${(initialMem.heapUsed / 1024 / 1024).toFixed(2)}MB`);
  console.time('Streaming 방식 처리 시간');

  const post = Post.getInstance();
  await post.createProcessedFrontMatter('.');

  console.timeEnd('Streaming 방식 처리 시간');
  const finalMem = process.memoryUsage();
  console.log(`최종 메모리 사용량: ${(finalMem.heapUsed / 1024 / 1024).toFixed(2)}MB`);
  spinner.succeed('Streaming 방식 메모리 사용량 측정 완료');
}

async function chunkConcurrent() {
  console.log('병렬 배치 처리 방식 메모리 사용량');
  const spinner = ora('병렬 배치 처리 방식 메모리 사용량 측정 중...').start();
  const initialMem = process.memoryUsage();
  console.log(`\n초기 메모리 사용량: ${(initialMem.heapUsed / 1024 / 1024).toFixed(2)}MB`);
  console.time('병렬 배치 처리 방식 처리 시간');

  await getBlogInstance();

  console.timeEnd('병렬 배치 처리 방식 처리 시간');
  const finalMem = process.memoryUsage();
  console.log(`최종 메모리 사용량: ${(finalMem.heapUsed / 1024 / 1024).toFixed(2)}MB`);
  spinner.succeed('병렬 배치 처리 방식 메모리 사용량 측정 완료');
}
