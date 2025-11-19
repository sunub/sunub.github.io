'use server';

import fs from 'fs/promises';
import { chunk } from 'fx_utils';
import matter from 'gray-matter';
import { join, resolve } from 'path';
import { cwd } from 'process';
import { cache } from 'react';
import postsJson from '@/generated/posts.generated.json';
import { type PostCategory } from '@/types/schema';
import { Post } from './Posts';
import { FrontMatterSchema, JsonPostFrontMatterSchema, PostFrontMatter } from './Schema';

const getPostsDir = cache(() => {
  const projectRoot = resolve(cwd(), '..');
  const postsPath = join(projectRoot, 'posts');

  if (!postsPath) throw new Error('posts 디렉터리를 찾을 수 없습니다.');
  return postsPath;
});

const getAllJsonFrontMatter = cache(async () => {
  const parsedJsonFrontMatter = JsonPostFrontMatterSchema.safeParse(postsJson);

  if (!parsedJsonFrontMatter.success) {
    console.error('posts.generated.json 스키마 검증 실패:', parsedJsonFrontMatter.error);
    throw new Error('posts.generated.json 파일의 형식이 잘못되었습니다.');
  }

  return parsedJsonFrontMatter.data;
});

export async function getAllPostsFrontmatter(): Promise<PostFrontMatter[]> {
  const allData = await getAllJsonFrontMatter();
  return allData?.all ?? [];
}

export async function getWebPostsFrontmatter(): Promise<PostFrontMatter[]> {
  const allData = await getAllJsonFrontMatter();
  return allData?.web ?? [];
}

export async function getAlgorithmPostsFrontmatter(): Promise<PostFrontMatter[]> {
  const allData = await getAllJsonFrontMatter();
  return allData?.algorithm ?? [];
}

export async function getCodePostsFrontmatter(): Promise<PostFrontMatter[]> {
  const allData = await getAllJsonFrontMatter();
  return allData?.code ?? [];
}

export async function getCSPostsFrontmatter(): Promise<PostFrontMatter[]> {
  const allData = await getAllJsonFrontMatter();
  return allData?.cs ?? [];
}

export const getRecentPostsMetadata = cache(async (batchSize: number = 10) => {
  const post = Post.getInstance();
  return post.postFrontMatterGenerator(batchSize);
});

export const getChunkedRecentPostsFrontmatter = cache(async (chunkSize = 10) => {
  return chunk(chunkSize, await getAllPostsFrontmatter());
});

export const getRecentPostsMetadataInRange = cache(async (start: number, end: number) => {
  const allFrontMatters = await getAllPostsFrontmatter();
  return {
    totalCount: allFrontMatters.length,
    frontmattters: allFrontMatters.slice(start, end).map(post => post.frontmatter),
  };
});

export const getAllPosts = cache(async () => {
  const allFrontMatters = await getAllPostsFrontmatter();
  return allFrontMatters;
});

export const getPostsMetadataByCategory = cache(async (category: PostCategory) => {
  switch (category) {
    case 'web':
      return getWebPostsFrontmatter();
    case 'algorithm':
      return getAlgorithmPostsFrontmatter();
    case 'code':
      return getCodePostsFrontmatter();
    case 'cs':
      return getCSPostsFrontmatter();
    default:
      throw new Error(`알 수 없는 카테고리: ${category as string}`);
  }
});

export const getPostFrontMatterByCategoryAndSlug = cache(async (category: PostCategory, slug: string) => {
  try {
    let currFrontMatter = null;
    switch (category) {
      case 'web':
        currFrontMatter = await getWebPostsFrontmatter();
        break;
      case 'algorithm':
        currFrontMatter = await getAlgorithmPostsFrontmatter();
        break;
      case 'code':
        currFrontMatter = await getCodePostsFrontmatter();
        break;
      case 'cs':
        currFrontMatter = await getCSPostsFrontmatter();
        break;
      default:
        throw new Error(`알 수 없는 카테고리: ${category as string}`);
    }
    const postData = currFrontMatter.find(post => post.frontmatter.slug === slug);
    if (!postData) {
      throw new Error(`카테고리: ${category}, 슬러그: ${slug}에 해당하는 포스트를 찾을 수 없습니다.`);
    }
    return postData;
  } catch (error) {
    console.error(
      `카테고리와 Slug를 기준으로 메타데이터를 읽어오는데 실패 했습니다 : ${category}, slug: ${slug}`,
      error
    );
    throw error;
  }
});

function readMDXContent(filePath: string): Promise<string> {
  return fs.readFile(filePath, 'utf8');
}

export const getPostContentByCategoryAndSlug = cache(async (category: PostCategory, slug: string) => {
  try {
    const postPath = getPostsDir();
    const filePath = join(postPath, category, `${slug}.mdx`);
    const minimumTimeout = 1000;

    // const fileContent = await readMDXContent(filePath);
    const [fileContent, _] = await Promise.all([
      readMDXContent(filePath),
      new Promise(resolve => setTimeout(resolve, minimumTimeout)),
    ]);

    const { content, data } = matter(fileContent);

    const parsedFrontMatter = FrontMatterSchema.safeParse(data);
    if (!parsedFrontMatter.success) {
      console.error(parsedFrontMatter.error);
      throw new Error(`FrontMatter 유효성 검증 실패: ${filePath}`);
    }

    return {
      content,
      frontmatter: parsedFrontMatter.data,
    };
  } catch (error: unknown) {
    console.error(`데이터 읽기 실패: category=${category}, slug=${slug}`, error);
    throw error;
  }
});
