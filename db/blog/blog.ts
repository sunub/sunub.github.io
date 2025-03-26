"use server";

import { z } from "zod";
import chalk from "chalk";
import path from "node:path";
import chokidar from "chokidar";
import { Worker } from "node:worker_threads";
import {
  FrontMatter,
  FrontMatterSchema,
  PostCategorySchema,
} from "@/types/schema";
import { debounce } from "@/shared/utils/debounce";
import matter from "gray-matter";

type WorkerList = {
  path: string;
  tag: PostCategory;
};

type PostData = {
  frontmatter: z.infer<typeof FrontMatterSchema>;
  content: string[];
};

type PostMetadata = z.infer<typeof FrontMatterSchema>;

type WorkerMessage = {
  type: "data" | "fileComplete" | "done" | "error" | "change";
  chunk: string;
  content?: string;
  slug: string;
  frontmatter: PostMetadata;
};

type PostCategory = z.infer<typeof PostCategorySchema>;
const ROOT_BLOG_PATH = path.join(process.cwd(), "posts");

type PostKey = `posts:${PostCategory}:${string}`;
type PostContentKey = `posts:content:${PostCategory}:${string}`;

const workerIdList: WorkerList[] = [
  {
    path: path.resolve(process.cwd(), "./dist/db/workers/algorithm.worker.js"),
    tag: "algorithm",
  },
  {
    path: path.resolve(process.cwd(), "./dist/db/workers/code.worker.js"),
    tag: "code",
  },
  {
    path: path.resolve(process.cwd(), "./dist/db/workers/cs.worker.js"),
    tag: "cs",
  },
  {
    path: path.resolve(process.cwd(), "./dist/db/workers/web.worker.js"),
    tag: "web",
  },
];

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n([\s\S]*)/;
function validateFrontMatter(
  data: any
): data is z.infer<typeof FrontMatterSchema> {
  return FrontMatterSchema.safeParse(data).success;
}

class Blog {
  #__workers: Map<PostCategory, Worker> = new Map();
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

  private insertPostSorted(post: {
    cacheKey: string;
    frontmatter: z.infer<typeof FrontMatterSchema>;
    content: string[];
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

  getPostContent(category: PostCategory, slug: string): string[] {
    const postKey = this.#__createPostContentKey(category, slug);
    return this.blogContents.get(postKey) || [];
  }

  async handleFileChange(changeFilePath: string) {
    this.#__withLock(async () => {
      const splitedPath = changeFilePath.split("/");
      let [category, slug] = splitedPath.slice(-2);
      slug = slug.split(".")[0];
      const parsedCategory = PostCategorySchema.safeParse(category);
      if (!parsedCategory.success) {
        console.error(
          chalk.redBright(
            `카테고리가 잘못되었습니다. ${category}는 올바른 카테고리가 아닙니다.`
          )
        );
        return;
      }
      const worker = this.#__workers.get(parsedCategory.data);
      worker?.postMessage({
        type: "change",
        content: changeFilePath,
        slug,
      });
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

  #__createCacheKey(category: PostCategory, slug: string): string {
    return `cache:${category}:${slug}`;
  }

  #__createPostKey(category: PostCategory, slug: string): PostKey {
    return `posts:${category}:${slug}`;
  }

  #__createPostContentKey(
    category: PostCategory,
    slug: string
  ): PostContentKey {
    return `posts:content:${category}:${slug}`;
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
    frontmatter: z.infer<typeof FrontMatterSchema>,
    content: string[]
  ) {
    const cacheKey = this.#__createCacheKey(category, slug);
    const postKey = this.#__createPostKey(category, slug);
    const PostContentKey = this.#__createPostContentKey(category, slug);

    this[category].set(postKey, { ...frontmatter });
    this.blogContents.set(PostContentKey, content);

    const post = { frontmatter, content, cacheKey };
    this.insertPostSorted(post);
  }

  getPostMetadataBySlug(category: PostCategory, slug: string) {
    const postKey = this.#__createPostKey(category, slug);
    return this[category].get(postKey);
  }

  async initialize(): Promise<void> {
    const workerPromises = workerIdList.map(({ path, tag }) => {
      return new Promise<void>((resolve, reject) => {
        let frontmatter: z.infer<typeof FrontMatterSchema> | null = null;
        let content: string[] = [];
        const worker = new Worker(path, {
          workerData: { tag },
        });
        this.#__workers.set(tag, worker);

        worker.postMessage(tag);
        worker.on("message", (message: WorkerMessage) => {
          switch (message.type) {
            case "data":
              const { chunk } = message;
              if (!frontmatter && FRONTMATTER_REGEX.test(chunk)) {
                const { data, content: fileContent } = matter(chunk);
                if (validateFrontMatter(data)) frontmatter = data;
                content.push(fileContent);
              } else {
                content.push(chunk);
              }
              break;
            case "fileComplete":
              if (frontmatter && content.length) {
                this.#__storeResultByCategoryAndSlug(
                  tag,
                  message.slug,
                  frontmatter,
                  content
                );
              }
              frontmatter = null;
              content = [];
              break;
            case "done":
              console.log(
                chalk.greenBright(
                  `${message.content} 작업이 모두 완료 되었습니다.`
                )
              );
              resolve();
              break;
            case "error":
              console.error(message.content);
              break;
          }
        });

        worker.on("error", (error) => {
          console.error(`Worker error for tag ${tag}:`, error);
          reject(error);
        });

        worker.on("exit", (code) => {
          if (code !== 0) {
            const errMsg = `Worker for tag ${tag} stopped with exit code ${code}`;
            console.error(errMsg);
            reject(new Error(errMsg));
          }
        });
      });
    });
    await Promise.all(workerPromises);
  }

  async getPostsMetadataByCategory(category: PostCategory) {
    const targetPosts = this[category];
    return [...targetPosts.values()];
  }
}

const getBlogInstance = async () => {
  return Blog.getInstance();
};

export default getBlogInstance;
