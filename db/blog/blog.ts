"use server";

import { z } from "zod";
import chalk from "chalk";
import path from "node:path";
import chokidar from "chokidar";
import matter from "gray-matter";
import {
  FrontMatter,
  FrontMatterSchema,
  PostCategorySchema,
} from "@/types/schema";
import { debounce } from "@/shared/utils/debounce";
import { cache } from "react";
import { readFile, readdir, stat } from "fs/promises";
import { executeWithLimit } from "db/utils/async/executeWithLimit";
import { fromAsync } from "db/utils/async/fromAsync";
import { toAsync } from "db/utils/async/toAsync";

const ROOT_BLOG_PATH = path.join(process.cwd(), "posts");

type PostData = {
  frontmatter: z.infer<typeof FrontMatterSchema>;
  postKey: string;
};

type PostCategory = z.infer<typeof PostCategorySchema>;
type PostKey = `posts:${PostCategory}:${string}`;
type PostContentKey = `posts:content:${PostCategory}:${string}`;

const readMdxFile = cache(async (filePath: string) => {
  return await readFile(filePath, "utf8");
});

const parseFrontMatter = cache((content: string) => {
  const { data, content: mdxContent } = matter(content);
  if (FrontMatterSchema.safeParse(data).success) {
    return {
      frontmatter: data as z.infer<typeof FrontMatterSchema>,
      content: mdxContent,
    };
  }
  return null;
});

class Blog {
  #__updateLock: Promise<void> = Promise.resolve();

  sortedPosts: PostData[] = [];
  blogContents: Map<PostContentKey, string[]> = new Map();
  algorithm: Map<string, FrontMatter> = new Map();
  code: Map<string, FrontMatter> = new Map();
  cs: Map<string, FrontMatter> = new Map();
  web: Map<string, FrontMatter> = new Map();

  isInitialized = false;

  private static instance: Blog | null = null;
  private static initializationPromise: Promise<Blog> | null = null;

  constructor() {
    const watcher = chokidar.watch(ROOT_BLOG_PATH, {
      persistent: true,
      ignoreInitial: true,
    });
    watcher.on("change", (changeFilePath) =>
      debounce(() => this.handleFileChange(changeFilePath), 100)
    );
  }

  async handleFileChange(changeFilePath: string) {
    await this.#__withLock(async () => {
      const pathParts = changeFilePath.split(path.sep);
      const fileName = pathParts[pathParts.length - 1];
      const category = pathParts[pathParts.length - 2];
      const slug = fileName.split(".")[0];
      const parsedCategory = PostCategorySchema.safeParse(category);
      if (!parsedCategory.success) {
        console.error(
          chalk.redBright(
            `카테고리가 잘못되었습니다. ${category}는 올바른 카테고리가 아닙니다.`
          )
        );
        return;
      }
      await this.processFile(parsedCategory.data, changeFilePath, slug);
    });
  }

  async #__withLock<T>(fn: () => Promise<T>): Promise<T> {
    let previousLock: Promise<void> = this.#__updateLock;
    let release: () => void;
    this.#__updateLock = new Promise<void>((resolve) => {
      release = resolve;
    });
    await previousLock;
    try {
      return await fn();
    } finally {
      release!();
    }
  }

  async getPostContent(
    category: PostCategory,
    slug: string
  ): Promise<string | null> {
    try {
      const filePath = path.join(ROOT_BLOG_PATH, category, `${slug}.mdx`);
      const content = await readMdxFile(filePath);
      if (!content) {
        console.error(`파일을 읽는 중 오류 발생: ${filePath}`);
        return null;
      }
      const parsed = parseFrontMatter(content);
      return parsed?.content || null;
    } catch (error) {
      console.error(`Error reading post content: ${error}`);
      return null;
    }
  }

  #__createPostKey(category: PostCategory, slug: string): PostKey {
    return `posts:${category}:${slug}`;
  }

  static async getInstance(): Promise<Blog> {
    if (Blog.instance && Blog.instance.isInitialized) {
      return Blog.instance;
    }

    Blog.initializationPromise = (async () => {
      try {
        if (!Blog.instance) {
          Blog.instance = new Blog();
        }

        if (!Blog.instance.isInitialized) {
          await Blog.instance.initialize();
          Blog.instance.isInitialized = true;
        }

        return Blog.instance;
      } catch (error) {
        Blog.initializationPromise = null;
        console.error("Blog 인스턴스 초기화 중 오류 발생:", error);
        throw error;
      }
    })();

    return Blog.initializationPromise;
  }

  async getPostsMetadataByCategory(category: PostCategory) {
    const targetPosts = this[category];
    return [...targetPosts.values()];
  }

  getPostMetadataBySlug(category: PostCategory, slug: string) {
    const postKey = this.#__createPostKey(category, slug);
    return this[category].get(postKey);
  }

  async initialize(): Promise<void> {
    const categories: PostCategory[] = ["algorithm", "code", "cs", "web"];

    const promisesOfTaskArrays = categories.map((category) =>
      this.processCategory(category)
    );
    const asyncIterableOfTaskArrays = toAsync(promisesOfTaskArrays);

    async function* flattenAsync<T>(
      iterable: AsyncIterable<T[] | undefined>
    ): AsyncIterable<T> {
      for await (const taskArray of iterable) {
        if (taskArray) {
          yield* taskArray;
        }
      }
    }

    const asyncIterableOfTasks = flattenAsync(asyncIterableOfTaskArrays);
    const allTasks = await fromAsync(asyncIterableOfTasks);

    await executeWithLimit(10, allTasks);

    this.sortedPosts.sort((a, b) => {
      return (
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
      );
    });
    console.log(chalk.blueBright("블로그 초기화 및 포스트 정렬 완료!"));
  }

  private async processCategory(
    category: PostCategory
  ): Promise<(() => Promise<void>)[] | undefined> {
    try {
      const categoryPath = path.join(ROOT_BLOG_PATH, category);
      const files = await readdir(categoryPath);

      const mdxFiles = files.filter((file) => file.endsWith(".mdx"));
      const fileReadPromises = mdxFiles.map((file) => {
        const slug = file.replace(".mdx", "");
        const filePath = path.join(categoryPath, file);
        return () => {
          return this.processFile(category, filePath, slug);
        };
      });

      console.log(
        chalk.greenBright(
          `카테고리 ${category}의 포스트를 성공적으로 처리했습니다.`
        )
      );
      return fileReadPromises;
    } catch (error) {
      console.error(`Error processing category ${category}:`, error);
    }
  }

  private async processFile(
    category: PostCategory,
    filePath: string,
    slug: string
  ): Promise<void> {
    try {
      const content = await readMdxFile(filePath);
      const parsed = parseFrontMatter(content);

      if (parsed) {
        const { frontmatter } = parsed;
        const postKey = this.#__createPostKey(category, slug);

        this[category].set(postKey, frontmatter);
        this.sortedPosts.push({ frontmatter, postKey });
      }
    } catch (error) {
      console.error(`파일 프로세싱 중 오류 발생 : ${filePath}:`, error);
    }
  }
}

declare global {
  var __BLOG_INSTANCE__: Blog | undefined;
}

const getBlogInstance = cache(async () => {
  if (global.__BLOG_INSTANCE__ && global.__BLOG_INSTANCE__.isInitialized) {
    return global.__BLOG_INSTANCE__;
  }

  global.__BLOG_INSTANCE__ = await Blog.getInstance();
  return global.__BLOG_INSTANCE__;
});

const blog = new Blog();

blog.initialize();

export default getBlogInstance;
