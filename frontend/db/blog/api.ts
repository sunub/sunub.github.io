'use server';

import { type PostCategory } from '@/types/schema';
import { cache } from 'react';
import { Post } from './Posts';
import { join } from 'path';
import { FrontMatterSchema, JsonPostFrontMatterSchema, PostFrontMatter } from './Schema';
import fs from 'fs/promises';
import { chunk, findUpDir } from 'fx_utils';
import matter from 'gray-matter';

const getPostsDir = cache(async () => {
  const postPath = await findUpDir('posts');
  if (!postPath) throw new Error('posts 디렉터리를 찾을 수 없습니다.');
  return postPath;
});

const getAllJsonFrontMatter = cache(async () => {
  const possiblePaths = [
    join(process.cwd(), 'public', 'posts.json'),
    join(process.cwd(), 'frontend', 'public', 'posts.json'),
    join('/var/task', 'public', 'posts.json'), // Vercel 환경
    join('/vercel/path0', 'frontend', 'public', 'posts.json'), // Vercel 빌드 환경
  ];

  for (const filePath of possiblePaths) {
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      const json = JSON.parse(fileContent);

      const parsedJsonFrontMatter = JsonPostFrontMatterSchema.safeParse(json);
      if (!parsedJsonFrontMatter.success) {
        console.error(parsedJsonFrontMatter.error);
        throw new Error(`posts.json 파일의 형식이 잘못되었습니다: ${filePath}`);
      }
      return parsedJsonFrontMatter.data;
    } catch (error) {
      console.error(`posts.json 파일을 처리하는 중 오류가 발생했습니다: ${filePath}`);
      continue;
    }
  }
  console.error('모든 경로에서 posts.json 파일을 찾을 수 없습니다.');
  throw new Error('posts.json 파일을 찾을 수 없습니다.');
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
      throw new Error(`알 수 없는 카테고리: ${category}`);
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
        throw new Error(`알 수 없는 카테고리: ${category}`);
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

export const getPostContentByCategoryAndSlug = cache(async (category: PostCategory, slug: string) => {
  try {
    const postPath = await getPostsDir();
    const filePath = join(postPath, category, `${slug}.mdx`);
    const fileContent = await fs.readFile(filePath, 'utf8');

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
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return null;
    }
    console.error(`데이터 읽기 실패: category=${category}, slug=${slug}`, error);
    throw error;
  }
});
