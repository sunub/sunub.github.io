"use server";

import fs from "fs/promises";
import path from "path";
import { LRUCache } from "lru-cache";
import matter from "gray-matter";
import { z } from "zod";
import { unstable_cache } from "next/cache";
import chokidar from "chokidar";
import {
  CacheDataSchema,
  FrontMatterSchema,
  PostCategorySchema,
} from "@/types/schema";

const STATIC_DIR = path.join(process.cwd(), "posts");

const STATIC_POST_CATEGORIES = ["web", "algorithm", "cs", "code"] as const;

const LRUCacheInstance = new LRUCache<string, any>({
  maxSize: 50 * 1024 * 1024,
  ttl: 1000 * 60 * 30,
  updateAgeOnGet: true,
  sizeCalculation: (value) => {
    if (typeof value === "string") {
      return value.length;
    }
    return new TextEncoder().encode(JSON.stringify(value)).length;
  },
});

class Blog {
  #lruCache: LRUCache<string, any>;
  #ALL_POSTS_CACHE_KEY = "all_posts";

  constructor() {
    this.#lruCache = LRUCacheInstance;
    this.#initializeCache();

    const watcher = chokidar.watch(STATIC_DIR, {
      persistent: true,
      ignoreInitial: true,
    });

    watcher.on("change", (filePath) => this.handleFileChange(filePath));
  }

  async handleFileChange(filePath: string) {
    const relativePath = path.relative(STATIC_DIR, filePath);
    try {
      const { frontmatter, parsedPostContent } = await this.parsingMDXFile(
        path.join(STATIC_DIR, relativePath),
      );
      const { category, slug, date } = frontmatter;
      const cacheKey = this.#createCacheKey(category, slug);
      const cacheData = {
        ...parsedPostContent,
        cacheKey,
        category,
        date,
      };

      const parsedCacheData = CacheDataSchema.safeParse(cacheData);
      if (!parsedCacheData.success) {
        console.error(parsedCacheData.error);
        throw new Error("캐시 데이터를 생성하는데 실패했습니다.");
      }

      const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
      const categorizedPost = this.getPostsByCategory(category) || [];
      const udpatedCategorizedPost: z.infer<typeof CacheDataSchema>[] =
        categorizedPost.map((post: z.infer<typeof CacheDataSchema>) => {
          if (post.cacheKey === cacheKey) {
            return parsedCacheData.data;
          }
          return post;
        });

      const allPosts = this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
      interface CacheData {
        cacheKey: string;
        category: string;
        date: Date;
        [key: string]: any;
      }
      const updatedAllPosts: CacheData[] = allPosts.map((post: CacheData) => {
        if (post.cacheKey === cacheKey) {
          return parsedCacheData.data as CacheData;
        }
        return post;
      });

      this.#lruCache.set(cacheKey, parsedCacheData.data);
      this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, updatedAllPosts);
      this.#lruCache.set(postCategoryCacheKey, udpatedCategorizedPost);
      console.log(`File changed: ${relativePath}`);
    } catch (error) {
      console.error(`Failed to update cache for ${filePath}:`, error);
    }
  }

  static async initialize() {
    const blog = new Blog();
    await blog.#initializeCache();
    return blog;
  }

  #createCacheKey(category: string, slug: string) {
    return `${category}/${slug}`;
  }

  #createPostCategoryCacheKey(category: string) {
    return `${category}`;
  }

  async parsingMDXFile(fullPath: string) {
    const fileData = await fs.readFile(fullPath, "utf-8");
    const parsedPostContent = matter(fileData);
    const frontMatter = FrontMatterSchema.safeParse(parsedPostContent.data);
    if (!frontMatter.success) {
      console.error(frontMatter.error);
      throw new Error(
        "Gray matter 를 이용하여 frontmatter 를 파싱하는데 실패했습니다.",
      );
    }
    return { frontmatter: frontMatter.data, parsedPostContent };
  }

  async readMDXFile(category: string, dir: string) {
    const files = await fs.readdir(dir);
    const categorizedPost: z.infer<typeof CacheDataSchema>[] = [];

    await Promise.all(
      files.map(async (filePath) => {
        const fullPath = path.join(dir, filePath);
        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
          this.readMDXFile(category, fullPath);
        } else {
          const { frontmatter, parsedPostContent } =
            await this.parsingMDXFile(fullPath);
          const { category, slug, date } = frontmatter;
          const cacheKey = this.#createCacheKey(category, slug);
          const cacheData = {
            ...parsedPostContent,
            cacheKey,
            category,
            date,
          };

          const parsedCacheData = CacheDataSchema.safeParse(cacheData);
          if (!parsedCacheData.success) {
            console.error(parsedCacheData.error);
            throw new Error("캐시 데이터를 생성하는데 실패했습니다.");
          }

          this.#lruCache.set(cacheKey, parsedCacheData.data);
          categorizedPost.push(parsedCacheData.data);
        }
        const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
        this.#lruCache.set(postCategoryCacheKey, categorizedPost);
      }),
    );
  }

  getPostsByCategory(category: string) {
    const parsedCategory = PostCategorySchema.safeParse(category);
    if (!parsedCategory.success) {
      console.error(parsedCategory.error);
      throw new Error("잘못된 카테고리입니다.");
    }
    const cacheKey = this.#createPostCategoryCacheKey(category);
    if (this.#lruCache.has(cacheKey)) {
      return this.#lruCache.get(cacheKey);
    }
  }

  getPostBySlug(category: string, slug: string) {
    const cacheKey = this.#createCacheKey(category, slug);
    if (this.#lruCache.has(cacheKey)) {
      return this.#lruCache.get(cacheKey);
    }
    return null;
  }

  async #initializeCache() {
    let allPosts: z.infer<typeof CacheDataSchema>[] = [];

    await Promise.all(
      STATIC_POST_CATEGORIES.map(async (category) => {
        const categoryPostFilePath = path.join(STATIC_DIR, category);
        await this.readMDXFile(category, categoryPostFilePath);

        const categorizedPosts = this.getPostsByCategory(category) || [];
        allPosts = [...allPosts, ...categorizedPosts];
      }),
    );
    this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, allPosts);
  }

  getAllPosts() {
    if (this.#lruCache.has(this.#ALL_POSTS_CACHE_KEY)) {
      return this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY);
    }
    return [];
  }

  getRecentPosts(count: number = 10) {
    const allPosts = this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) as z.infer<
      typeof CacheDataSchema
    >[];
    if (!allPosts) {
      throw new Error("게시물이 존재하지 않습니다.");
    }

    return allPosts
      .map(({ cacheKey }) => this.#lruCache.get(cacheKey))
      .filter((post): post is z.infer<typeof CacheDataSchema> => post != null)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, count)
      .map(({ data }) => data);
  }
}

let blogInstance: Promise<Blog> | null = null;

const getBlogInstance = () => {
  if (!blogInstance) {
    blogInstance = Blog.initialize();
  }
  return blogInstance;
};

export const getBlogInstanceForSeed = async () => {
  if (!blogInstance) {
    blogInstance = Blog.initialize();
  }
  return blogInstance;
};

export const getRecentPosts = unstable_cache(
  async (count: number = 10) => {
    const blog = await getBlogInstance();
    return blog.getRecentPosts(count);
  },
  ["recent-posts"],
  {
    revalidate: 30,
    tags: ["posts"],
  },
);

export const getPostsByCategory = unstable_cache(
  async (category: string): Promise<z.infer<typeof CacheDataSchema>[]> => {
    const blog = await getBlogInstance();
    return blog.getPostsByCategory(category);
  },
  ["posts-by-category"],
  {
    revalidate: 30,
    tags: ["posts"],
  },
);

export const getPostBySlug = unstable_cache(
  async (
    category: string,
    slug: string,
  ): Promise<z.infer<typeof CacheDataSchema>> => {
    const blog = await getBlogInstance();
    return blog.getPostBySlug(category, slug);
  },
  ["post-by-slug"],
  {
    revalidate: 30,
    tags: ["posts"],
  },
);

export const getAllPosts = unstable_cache(
  async (): Promise<z.infer<typeof CacheDataSchema>[]> => {
    const blog = await getBlogInstance();
    return blog.getAllPosts();
  },
  ["all-posts"],
  {
    revalidate: 30,
    tags: ["posts"],
  },
);
