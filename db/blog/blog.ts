"use server";

import { z } from "zod";
import chalk from "chalk";
import path from "node:path";
import chokidar from "chokidar";
import { readdir, stat } from "fs/promises";
import { createReadStream } from "fs";
import matter from "gray-matter";
import {
  FrontMatter,
  FrontMatterSchema,
  PostCategorySchema,
} from "@/types/schema";
import { debounce } from "@/shared/utils/debounce";

const ROOT_BLOG_PATH = path.join(process.cwd(), "posts");

type PostData = {
  frontmatter: z.infer<typeof FrontMatterSchema>;
};

type PostCategory = z.infer<typeof PostCategorySchema>;
type PostKey = `posts:${PostCategory}:${string}`;
type PostContentKey = `posts:content:${PostCategory}:${string}`;

function validateFrontMatter(
  data: any
): data is z.infer<typeof FrontMatterSchema> {
  return FrontMatterSchema.safeParse(data).success;
}

class Blog {
  // worker 관련 코드는 모두 제거되었습니다.
  #__updateLock: Promise<void> = Promise.resolve();
  #__completedFiles: Set<string> = new Set();

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
    // 파일 변경을 감지하여 직접 processFile 호출
    const watcher = chokidar.watch(ROOT_BLOG_PATH, {
      persistent: true,
      ignoreInitial: true,
    });
    watcher.on("change", (changeFilePath) =>
      debounce(() => this.handleFileChange(changeFilePath), 100)
    );
  }

  private insertPostSorted(post: {
    postKey: string;
    frontmatter: z.infer<typeof FrontMatterSchema>;
  }) {
    const postDate = new Date(post.frontmatter.date).getTime();
    let low = 0,
      high = this.sortedPosts.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      const midDate = new Date(
        this.sortedPosts[mid].frontmatter.date
      ).getTime();

      if (postDate > midDate) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    this.sortedPosts.splice(low, 0, post);
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
      // 변경된 파일은 즉시 스트림을 통해 읽어 처리합니다.
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

  async #__storeResultByCategoryAndSlug(
    category: PostCategory,
    slug: string,
    frontmatter: z.infer<typeof FrontMatterSchema>
  ) {
    const postKey = this.#__createPostKey(category, slug);
    this[category].set(postKey, { ...frontmatter });

    const post = { frontmatter, postKey };
    this.insertPostSorted(post);
  }

  getPostMetadataBySlug(category: PostCategory, slug: string) {
    const postKey = this.#__createPostKey(category, slug);
    return this[category].get(postKey);
  }

  async initialize(): Promise<void> {
    // 각 카테고리에 대해 스트림으로 파일을 읽어 처리합니다.
    const categories: PostCategory[] = ["algorithm", "code", "cs", "web"];
    const promises = categories.map((category) =>
      this.processCategory(category)
    );
    await Promise.all(promises);
  }

  private async processCategory(category: PostCategory): Promise<void> {
    const categoryPath = path.join(ROOT_BLOG_PATH, category);
    await this.readDir(category, categoryPath);
  }

  private async readDir(
    category: PostCategory,
    dirPath: string
  ): Promise<void> {
    let files: string[];
    try {
      files = await readdir(dirPath);
    } catch (error: any) {
      console.error(`디렉토리 ${dirPath} 읽는 중 오류 발생: ${error.message}`);
      return;
    }

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      let fileStat;
      try {
        fileStat = await stat(fullPath);
      } catch (error: any) {
        console.error(`파일 상태 확인 실패 ${fullPath}: ${error.message}`);
        continue;
      }
      if (fileStat.isDirectory()) {
        await this.readDir(category, fullPath);
      } else {
        const slug = file.split(".")[0];
        await this.processFile(category, fullPath, slug);
      }
    }
  }

  private async processFile(
    category: PostCategory,
    fullPath: string,
    slug: string
  ): Promise<void> {
    const fileKey = `${category}-${slug}`;
    if (this.#__completedFiles.has(fileKey)) return;

    try {
      const readStream = createReadStream(fullPath, { encoding: "utf8" });
      let frontmatter: z.infer<typeof FrontMatterSchema> | null = null;
      // 파일의 첫 청크를 읽어 frontmatter 파싱 (gray-matter 사용)
      for await (const chunk of readStream) {
        if (chunk.startsWith("---")) {
          const { data } = matter(chunk);
          if (validateFrontMatter(data)) {
            frontmatter = data;
          }
          break;
        }
      }
      this.#__completedFiles.add(fileKey);
      if (frontmatter) {
        await this.#__storeResultByCategoryAndSlug(category, slug, frontmatter);
      }
    } catch (error) {
      console.error(`파일 처리 중 오류 ${fullPath}: ${error}`);
    }
  }

  async getPostsMetadataByCategory(category: PostCategory) {
    const targetPosts = this[category];
    return [...targetPosts.values()];
  }
}

declare global {
  var __BLOG_INSTANCE__: Blog | undefined;
}

const getBlogInstance = async () => {
  if (global.__BLOG_INSTANCE__ && global.__BLOG_INSTANCE__.isInitialized) {
    return global.__BLOG_INSTANCE__;
  }
  global.__BLOG_INSTANCE__ = await Blog.getInstance();
  return global.__BLOG_INSTANCE__;
};

export default getBlogInstance;
