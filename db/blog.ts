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

interface CachedPost {
  data: z.infer<typeof CacheDataSchema>;
  metadata: PostMetadata;
}

const LRUCacheInstance = new LRUCache<string, CachedPost | any>({
  maxSize: 40 * 1024 * 1024,
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
  #lruCache: LRUCache<string, CachedPost | any>;
  #ALL_POSTS_CACHE_KEY = "all_posts";
  #RECENT_POSTS_KEYS = "recent_posts_keys";
  #isInitializing: boolean;
  #pendingCategories: Set<string>;
  #updateLock: Promise<void>;

  constructor() {
    this.#lruCache = LRUCacheInstance;
    this.#isInitializing = false;
    this.#pendingCategories = new Set();
    this.#updateLock = Promise.resolve();

    const watcher = chokidar.watch(STATIC_DIR, {
      persistent: true,
      ignoreInitial: true,
    });
    watcher.on("change", (filePath) => {
      clearTimeout((this as any)._debounceTimer);
      (this as any)._debounceTimer = setTimeout(() => {
        this.handleFileChange(filePath);
      }, 100);
    });
  }

  async #withLock<T>(fn: () => Promise<T>): Promise<T> {
    const previousLock = this.#updateLock;
    let release: () => void;
    this.#updateLock = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previousLock;
    try {
      return await fn();
    } finally {
      release!();
    }
  }

  async handleFileChange(filePath: string) {
    const relativePath = path.relative(STATIC_DIR, filePath);
    await this.#withLock(async () => {
      try {
        const { frontmatter, parsedPostContent } = await this.parsingMDXFile(
          filePath
        );
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
          throw new Error("Failed to generate cache data.");
        }

        const combined: CachedPost = {
          data: parsedCacheData.data,
          metadata,
        };

        this.#lruCache.set(cacheKey, combined);

        const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
        let categoryPosts: CachedPost[] =
          this.#lruCache.get(postCategoryCacheKey) || [];
        const index = categoryPosts.findIndex(
          (post) => post.data.cacheKey === cacheKey
        );
        if (index >= 0) {
          categoryPosts[index] = combined;
        } else {
          categoryPosts.push(combined);
        }
        this.#lruCache.set(postCategoryCacheKey, categoryPosts);

        let allPostsKeys: string[] =
          this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
        if (!allPostsKeys.includes(cacheKey)) {
          allPostsKeys.push(cacheKey);
          this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, allPostsKeys);
        }

        this.#lruCache.delete(this.#RECENT_POSTS_KEYS);

        console.log(`File changed: ${relativePath}`);
      } catch (error) {
        console.error(`Failed to update cache for ${filePath}:`, error);
      }
    });
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
      throw new Error("Failed to parse frontmatter using gray-matter.");
    }
    return { frontmatter: frontMatter.data, parsedPostContent };
  }

  async #initializeCache() {
    if (this.#isInitializing) return;
    this.#isInitializing = true;

    await Promise.all(
      STATIC_POST_CATEGORIES.map(async (category) => {
        return this.#loadCategoryPosts(category, 5);
      })
    );
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
              let date: Date | null = data.date
                ? new Date(data.date)
                : new Date(stats.mtime);
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
      const categoryPosts: CachedPost[] = [];

      await Promise.all(
        filesToProcess.map(async ({ filePath, fullPath }) => {
          try {
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
            const combined: CachedPost = {
              data: parsedCacheData.data,
              metadata,
            };
            this.#lruCache.set(cacheKey, combined);
            categoryPosts.push(combined);
          } catch (error) {
            console.error(`Failed to process file ${filePath}:`, error);
          }
        })
      );

      const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
      this.#lruCache.set(postCategoryCacheKey, categoryPosts);

      let allPostsKeys: string[] =
        this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
      const newPostKeys = categoryPosts.map((post) => post.data.cacheKey);
      const updatedAllPostsKeys = [
        ...new Set([...allPostsKeys, ...newPostKeys]),
      ];
      this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, updatedAllPostsKeys);

      return categoryPosts;
    } catch (error) {
      console.error(`Failed to load category: ${category}`, error);
    } finally {
      this.#pendingCategories.delete(category);
    }
  }

  async #loadRemainingPosts() {
    for (const category of STATIC_POST_CATEGORIES) {
      const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
      const existingPosts: CachedPost[] =
        this.#lruCache.get(postCategoryCacheKey) || [];
      const categoryDir = path.join(STATIC_DIR, category);
      const files = await fs.readdir(categoryDir);
      const processedSlugs = new Set(
        existingPosts.map((post) => post.data.cacheKey.split("/")[1])
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
                const combined: CachedPost = {
                  data: parsedCacheData.data,
                  metadata,
                };
                this.#lruCache.set(cacheKey, combined);

                let allPostsKeys: string[] =
                  this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
                if (!allPostsKeys.includes(cacheKey)) {
                  allPostsKeys.push(cacheKey);
                  this.#lruCache.set(this.#ALL_POSTS_CACHE_KEY, allPostsKeys);
                }

                let categoryPosts: CachedPost[] =
                  this.#lruCache.get(postCategoryCacheKey) || [];
                categoryPosts.push(combined);
                this.#lruCache.set(postCategoryCacheKey, categoryPosts);
              } catch (error) {
                console.error(`Failed to process file: ${filePath}`, error);
              }
            }
          })
        );
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
    console.log("All posts loaded.");
  }

  getPostsMetadataByCategory(category: string): PostMetadata[] {
    const parsedCategory = PostCategorySchema.safeParse(category);
    if (!parsedCategory.success) {
      console.error(parsedCategory.error);
      throw new Error("Invalid category.");
    }
    const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
    const categoryPosts: CachedPost[] =
      this.#lruCache.get(postCategoryCacheKey) || [];
    return categoryPosts.map((post) => post.metadata);
  }

  getPostsByCategory(category: string) {
    const parsedCategory = PostCategorySchema.safeParse(category);
    if (!parsedCategory.success) {
      console.error(parsedCategory.error);
      throw new Error("Invalid category.");
    }
    const postCategoryCacheKey = this.#createPostCategoryCacheKey(category);
    return this.#lruCache.get(postCategoryCacheKey) || [];
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
    const cacheKey = this.#createCacheKey(category, slug);
    const cached: CachedPost = this.#lruCache.get(cacheKey);
    return cached ? cached.metadata : null;
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
        throw new Error("Failed to generate cache data.");
      }
      const combined: CachedPost = {
        data: parsedCacheData.data,
        metadata,
      };
      this.#lruCache.set(cacheKey, combined);
      return combined.data;
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
    const allPostsKeys: string[] =
      this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
    const metadataList: PostMetadata[] = [];
    for (const key of allPostsKeys) {
      const cached: CachedPost = this.#lruCache.get(key);
      if (cached) {
        metadataList.push(cached.metadata);
      }
    }
    const sortedPosts = metadataList
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, count);
    this.#lruCache.set(cacheKey, sortedPosts);
    return sortedPosts;
  }

  getAllPosts() {
    const allPostsKeys: string[] =
      this.#lruCache.get(this.#ALL_POSTS_CACHE_KEY) || [];
    return allPostsKeys
      .map((key: string) => this.#lruCache.get(key))
      .filter((post: CachedPost) => post != null);
  }

  async getRecentPosts(count: number = 10) {
    const recentPostsMetadata = await this.getRecentPostsMetadata(count);
    const recentPostKeys = recentPostsMetadata.map((meta: PostMetadata) =>
      this.#createCacheKey(meta.category, meta.slug)
    );
    return recentPostKeys
      .map((key) => this.#lruCache.get(key))
      .filter((post) => post != null)
      .map((cached: CachedPost) => cached.data);
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
  async (category: string): Promise<CachedPost[]> => {
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
  ): Promise<z.infer<typeof CacheDataSchema> | null> => {
    const blog = await getBlogInstance();
    const cached = blog.getPostBySlug(category, slug);
    return cached ? cached.data : null;
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
    return blog.getAllPosts().map((cached: CachedPost) => cached.data);
  },
  ["all-posts"],
  {
    revalidate: DAY_IN_SECONDS,
    tags: ["posts"],
  }
);
