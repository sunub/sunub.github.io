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

type PostMetadata = z.infer<typeof FrontMatterSchema>;
const DAY_IN_SECONDS = 86400;
const STATIC_DIR = path.join(process.cwd(), "posts");
const STATIC_POST_CATEGORIES = ["web", "algorithm", "cs", "code"] as const;
const LRUCacheInstance = new LRUCache<string, any>({
  maxSize: 40 * 1024 * 1024, // 최대 40MB로 제한
  ttl: 1000 * 60 * 30, // 30분 TTL
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
  #RECENT_POSTS_KEYS = "recent_posts_keys";
  #isInitializing: boolean;
  #pendingCategories: Set<string>;

  constructor() {
    this.#lruCache = LRUCacheInstance;
    this.#isInitializing = false;
    this.#pendingCategories = new Set();

    // 파일 변경 감지
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
        path.join(STATIC_DIR, relativePath)
      );
      const { category, slug, date } = frontmatter;
      const cacheKey = this.#createCacheKey(category, slug);

      const metadataOnly = {
        slug: frontmatter.slug,
        title: frontmatter.title,
        summary: frontmatter.summary,
        date: frontmatter.date,
        category: frontmatter.category,
        tags: frontmatter.tags,
      };

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

      const allPostsKeys = this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
      const updatedAllPostsKeys = [...allPostsKeys];
      const postIndex = updatedAllPostsKeys.findIndex(
        (key) => key === cacheKey
      );
      if (postIndex === -1) {
        updatedAllPostsKeys.push(cacheKey);
      }

      this.#lruCache.set(cacheKey, parsedCacheData.data);
      this.#lruCache.set(`${cacheKey}_metadata`, metadataOnly);
      this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, updatedAllPostsKeys);
      this.#lruCache.set(postCategoryCacheKey, udpatedCategorizedPost);

      this.#lruCache.delete(this.#RECENT_POSTS_KEYS);
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
        "Gray matter를 이용하여 frontmatter를 파싱하는데 실패했습니다."
      );
    }
    return { frontmatter: frontMatter.data, parsedPostContent };
  }

  async #initializeCache() {
    if (this.#isInitializing) return;
    this.#isInitializing = true;

    const initialPostsPromises = STATIC_POST_CATEGORIES.map(
      async (category) => {
        return this.#loadCategoryPosts(category, 5);
      }
    );

    await Promise.all(initialPostsPromises);
    this.#isInitializing = false;

    setTimeout(() => {
      this.#loadRemainingPosts();
    }, 2000);
  }

  async #loadCategoryPosts(category: string, limit?: number) {
    if (this.#pendingCategories.has(category)) return;
    this.#pendingCategories.add(category);

    try {
      const categoryDir = path.join(STATIC_DIR, category);
      const files = await fs.readdir(categoryDir);

      const fileMetadata: Array<{
        filePath: string;
        date: Date | null;
        fullPath: string;
      }> = [];

      await Promise.all(
        files.map(async (filePath) => {
          const fullPath = path.join(categoryDir, filePath);
          const stats = await fs.stat(fullPath);

          if (
            !stats.isDirectory() &&
            (filePath.endsWith(".mdx") || filePath.endsWith(".md"))
          ) {
            try {
              const fileContent = await fs.readFile(fullPath, "utf-8");
              const { data } = matter(fileContent);
              let date: Date | null = null;

              if (data.date) {
                date = new Date(data.date);
              } else {
                date = new Date(stats.mtime);
              }

              fileMetadata.push({ filePath, date, fullPath });
            } catch (error) {
              console.error(`Failed to read metadata from ${filePath}:`, error);
              fileMetadata.push({
                filePath,
                date: new Date(stats.mtime),
                fullPath,
              });
            }
          }
        })
      );

      fileMetadata.sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return b.date.getTime() - a.date.getTime();
      });

      const filesToProcess = limit
        ? fileMetadata.slice(0, limit)
        : fileMetadata;
      const categorizedPost: z.infer<typeof CacheDataSchema>[] = [];
      const metadataList: PostMetadata[] = [];

      await Promise.all(
        filesToProcess.map(async ({ filePath, fullPath }) => {
          try {
            const stats = await fs.stat(fullPath);

            if (!stats.isDirectory()) {
              const { frontmatter, parsedPostContent } =
                await this.parsingMDXFile(fullPath);
              const { category, slug, date } = frontmatter;
              const cacheKey = this.#createCacheKey(category, slug);

              const metadata: PostMetadata = {
                slug: frontmatter.slug,
                title: frontmatter.title,
                summary: frontmatter.summary,
                date: frontmatter.date,
                category: frontmatter.category,
                tags: frontmatter.tags,
                completed: frontmatter.completed,
              };

              const cacheData = {
                ...parsedPostContent,
                cacheKey,
                category,
                date,
              };

              const parsedCacheData = CacheDataSchema.safeParse(cacheData);
              if (!parsedCacheData.success) {
                console.error(parsedCacheData.error);
                return;
              }

              this.#lruCache.set(cacheKey, parsedCacheData.data);
              this.#lruCache.set(`${cacheKey}_metadata`, metadata);
              categorizedPost.push(parsedCacheData.data);
              metadataList.push(metadata);
            }
          } catch (error) {
            console.error(`Failed to process file ${filePath}:`, error);
          }
        })
      );

      const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
      this.#lruCache.set(postCategoryCacheKey, categorizedPost);

      const allPostsKeys = this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
      const newPostKeys = categorizedPost.map((post) => post.cacheKey);
      const updatedAllPostsKeys = [
        ...new Set([...allPostsKeys, ...newPostKeys]),
      ];
      this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, updatedAllPostsKeys);

      this.#lruCache.set(`${postCategoryCacheKey}_metadata`, metadataList);

      return categorizedPost;
    } catch (error) {
      console.error(`Failed to load category: ${category}`, error);
    } finally {
      this.#pendingCategories.delete(category);
    }
  }

  async #loadRemainingPosts() {
    for (const category of STATIC_POST_CATEGORIES) {
      const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
      const existingPosts = this.#lruCache.get(postCategoryCacheKey) || [];

      const categoryDir = path.join(STATIC_DIR, category);
      const files = await fs.readdir(categoryDir);

      const processedSlugs = new Set(
        existingPosts.map((post: any) => post.data?.slug || "")
      );

      const remainingFiles = files.filter((file) => {
        const fileName = path.basename(file, path.extname(file));
        return (
          !processedSlugs.has(fileName) &&
          (file.endsWith(".md") || file.endsWith(".mdx"))
        );
      });

      const chunkSize = 5;
      for (let i = 0; i < remainingFiles.length; i += chunkSize) {
        const filesChunk = remainingFiles.slice(i, i + chunkSize);
        await Promise.all(
          filesChunk.map(async (filePath) => {
            const fullPath = path.join(categoryDir, filePath);
            const stats = await fs.stat(fullPath);

            if (!stats.isDirectory()) {
              try {
                const { frontmatter, parsedPostContent } =
                  await this.parsingMDXFile(fullPath);
                const { category, slug, date } = frontmatter;
                const cacheKey = this.#createCacheKey(category, slug);

                if (this.#lruCache.has(cacheKey)) return;

                // 메타데이터 분리
                const metadata: PostMetadata = {
                  slug: frontmatter.slug,
                  title: frontmatter.title,
                  summary: frontmatter.summary,
                  date: frontmatter.date,
                  category: frontmatter.category,
                  tags: frontmatter.tags,
                  completed: frontmatter.completed,
                };

                const cacheData = {
                  ...parsedPostContent,
                  cacheKey,
                  category,
                  date,
                };

                const parsedCacheData = CacheDataSchema.safeParse(cacheData);
                if (!parsedCacheData.success) {
                  console.error(parsedCacheData.error);
                  return;
                }

                this.#lruCache.set(cacheKey, parsedCacheData.data);
                this.#lruCache.set(`${cacheKey}_metadata`, metadata);

                const allPostsKeys =
                  this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
                if (!allPostsKeys.includes(cacheKey)) {
                  this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, [
                    ...allPostsKeys,
                    cacheKey,
                  ]);
                }

                const categoryPosts =
                  this.#lruCache.get(postCategoryCacheKey) || [];
                this.#lruCache.set(postCategoryCacheKey, [
                  ...categoryPosts,
                  parsedCacheData.data,
                ]);

                const categoryMetadata =
                  this.#lruCache.get(`${postCategoryCacheKey}_metadata`) || [];
                this.#lruCache.set(`${postCategoryCacheKey}_metadata`, [
                  ...categoryMetadata,
                  metadata,
                ]);
              } catch (error) {
                console.error(`Failed to process file: ${filePath}`, error);
              }
            }
          })
        );

        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
    console.log("모든 포스트 로딩 완료");
  }

  getPostsMetadataByCategory(category: string): PostMetadata[] {
    const parsedCategory = PostCategorySchema.safeParse(category);
    if (!parsedCategory.success) {
      console.error(parsedCategory.error);
      throw new Error("잘못된 카테고리입니다.");
    }

    const cacheKey = `${this.#createPostCategoryCacheKey(category)}_metadata`;
    return this.#lruCache.get(cacheKey) || [];
  }

  getPostsByCategory(category: string) {
    const parsedCategory = PostCategorySchema.safeParse(category);
    if (!parsedCategory.success) {
      console.error(parsedCategory.error);
      throw new Error("잘못된 카테고리입니다.");
    }
    const cacheKey = this.#createPostCategoryCacheKey(category);
    return this.#lruCache.get(cacheKey) || [];
  }

  getPostBySlug(category: string, slug: string) {
    const cacheKey = this.#createCacheKey(category, slug);

    if (!this.#lruCache.has(cacheKey)) {
      const filePath = path.join(STATIC_DIR, category, `${slug}.mdx`);
      this.#loadSinglePost(filePath, category, slug).catch((err) => {
        console.error(`Failed to load post: ${category}/${slug}`, err);
      });
    }

    return this.#lruCache.get(cacheKey);
  }

  getPostMetadataBySlug(category: string, slug: string): PostMetadata | null {
    const cacheKey = `${this.#createCacheKey(category, slug)}_metadata`;
    return this.#lruCache.get(cacheKey) || null;
  }

  async #loadSinglePost(filePath: string, category: string, slug: string) {
    try {
      const { frontmatter, parsedPostContent } = await this.parsingMDXFile(
        filePath
      );
      const cacheKey = this.#createCacheKey(category, slug);

      const metadata: PostMetadata = {
        slug: frontmatter.slug,
        title: frontmatter.title,
        summary: frontmatter.summary,
        date: frontmatter.date,
        category: frontmatter.category,
        tags: frontmatter.tags,
        completed: frontmatter.completed,
      };

      const cacheData = {
        ...parsedPostContent,
        cacheKey,
        category,
        date: frontmatter.date,
      };

      const parsedCacheData = CacheDataSchema.safeParse(cacheData);
      if (!parsedCacheData.success) {
        console.error(parsedCacheData.error);
        throw new Error("캐시 데이터를 생성하는데 실패했습니다.");
      }

      this.#lruCache.set(cacheKey, parsedCacheData.data);
      this.#lruCache.set(`${cacheKey}_metadata`, metadata);

      return parsedCacheData.data;
    } catch (error) {
      console.error(`Failed to load single post: ${category}/${slug}`, error);
      throw error;
    }
  }

  async getRecentPostsMetadata(count: number = 10): Promise<PostMetadata[]> {
    const cacheKey = `recent_posts_metadata_${count}`;

    if (this.#lruCache.has(cacheKey)) {
      return this.#lruCache.get(cacheKey);
    }

    const allPostsKeys = this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
    const metadataList: PostMetadata[] = [];

    for (const key of allPostsKeys) {
      const metadata = this.#lruCache.get(`${key}_metadata`);
      if (metadata) {
        metadataList.push(metadata);
      }
    }

    const sortedPosts = metadataList
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);

    this.#lruCache.set(cacheKey, sortedPosts);
    return sortedPosts;
  }

  getAllPosts() {
    const allPostsKeys = this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
    return allPostsKeys
      .map((key: string) => this.#lruCache.get(key))
      .filter((post: PostMetadata) => post != null);
  }

  async getRecentPosts(count: number = 10) {
    const recentPostsMetadata = await this.getRecentPostsMetadata(count);
    const recentPostKeys = recentPostsMetadata.map((meta: PostMetadata) =>
      this.#createCacheKey(meta.category, meta.slug)
    );

    return recentPostKeys
      .map((key) => this.#lruCache.get(key))
      .filter((post) => post != null)
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

export const getRecentPostsMetadata = unstable_cache(
  async (count: number = 10): Promise<PostMetadata[]> => {
    const blog = await getBlogInstance();
    return blog.getRecentPostsMetadata(count);
  },
  ["recent-posts-metadata"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getRecentPosts = unstable_cache(
  async (count: number = 10) => {
    const blog = await getBlogInstance();
    return blog.getRecentPosts(count);
  },
  ["recent-posts"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getPostsMetadataByCategory = unstable_cache(
  async (category: string): Promise<PostMetadata[]> => {
    const blog = await getBlogInstance();
    return blog.getPostsMetadataByCategory(category);
  },
  ["posts-metadata-by-category"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getPostsByCategory = unstable_cache(
  async (category: string): Promise<z.infer<typeof CacheDataSchema>[]> => {
    const blog = await getBlogInstance();
    return blog.getPostsByCategory(category);
  },
  ["posts-by-category"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getPostBySlug = unstable_cache(
  async (
    category: string,
    slug: string
  ): Promise<z.infer<typeof CacheDataSchema>> => {
    const blog = await getBlogInstance();
    return blog.getPostBySlug(category, slug);
  },
  ["post-by-slug"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getPostMetadataBySlug = unstable_cache(
  async (category: string, slug: string): Promise<PostMetadata | null> => {
    const blog = await getBlogInstance();
    return blog.getPostMetadataBySlug(category, slug);
  },
  ["post-metadata-by-slug"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);

export const getAllPosts = unstable_cache(
  async (): Promise<z.infer<typeof CacheDataSchema>[]> => {
    const blog = await getBlogInstance();
    return blog.getAllPosts();
  },
  ["all-posts"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);
