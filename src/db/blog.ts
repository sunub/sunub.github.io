"use server";

import { FrontMatter } from "type";
import fs from "fs";
import path from "path";
import { singleton } from "@/utils/singleton";

type MDXFile = {
  frontmatter: FrontMatter;
  content: string;
  slug?: string;
  category?: string;
};

interface BlogContent {
  blogpost: MDXFile[];
  mostUsedTags: any[];
}

function parseFrontmatter(fileContent: string): MDXFile {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.split("\n");
  let frontmatter: any = {};

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(":");
    let value = valueArr.join(": ").trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      const tags = value
        .replace(/^\[(.*)\]$/, "$1")
        .split(",")
        .map((str) => str.trim());
      frontmatter[key.trim() as keyof FrontMatter] = tags;
    } else {
      value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
      frontmatter[key.trim() as keyof FrontMatter] = value;
    }
  });

  return { frontmatter, content };
}

function readMDXFile(filePath: string) {
  let rawContent = fs.readFileSync(filePath, "utf8");
  return parseFrontmatter(rawContent);
}

function browseMDXFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fileList = browseMDXFiles(filePath, fileList);
    } else if (path.extname(file) === ".mdx") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

function getMDXFiles(dir: string) {
  const files = fs.readdirSync(dir);

  const MDXFilePaths = new Map();
  files.forEach((file: string) => {
    const mdxFiles = browseMDXFiles(path.join(dir, file));
    MDXFilePaths.set(file, mdxFiles);
  });

  return MDXFilePaths;
}

function getMDXData(dir: string): BlogContent {
  let mdxFilesPath = getMDXFiles(dir);
  const tags = new Map();

  const MDXFileList: Partial<MDXFile[]> = [];
  mdxFilesPath.forEach((files: string[], category: string) => {
    let mdxFiles: Partial<MDXFile> = {};
    files.forEach((file) => {
      let { frontmatter, content } = readMDXFile(file);
      const { slug } = frontmatter;
      mdxFiles = {
        frontmatter,
        content,
        slug,
        category,
      };
      const usedTags = mdxFiles.frontmatter?.tags as string[];
      for (const tag of usedTags) {
        tags.has(tag) ? tags.set(tag, tags.get(tag) + 1) : tags.set(tag, 1);
      }
      MDXFileList.push(mdxFiles as MDXFile);
    });
  });

  const mostUsedTags = Array.from(tags)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return {
    blogpost: MDXFileList as MDXFile[],
    mostUsedTags,
  };
}

function getBlogPost(): BlogContent {
  const { blogpost, mostUsedTags } = getMDXData(
    path.join(process.cwd(), "posts"),
  );

  blogpost.sort((a, b) => {
    return (
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
    );
  });

  return {
    blogpost,
    mostUsedTags,
  };
}

class BlogData {
  #_allPost: BlogContent;
  constructor() {
    this.#_allPost = getBlogPost();
  }

  async getContentHeaders(content: string) {
    let headers = content
      .split("\n")
      .filter((line) => line.startsWith("#"))
      .map((str) => str.split(" "));
    return headers;
  }

  async allWebPost() {
    return this.#_allPost.blogpost.filter((post) => post.category === "web");
  }

  async allAlgorithmPost() {
    return this.#_allPost.blogpost.filter(
      (post) => post.category === "algorithm",
    );
  }

  async allCSPost() {
    return this.#_allPost.blogpost.filter((post) => post.category === "cs");
    // return this.#_allPost.blogpost.filter((post) => post.category === "cs");
  }

  async allCodePost() {
    return this.#_allPost.blogpost.filter((post) => post.category === "code");
  }

  async allBlogPost(): Promise<MDXFile[]> {
    return this.#_allPost.blogpost;
  }

  async getRecentlyPublished() {
    const recentlyPublished = this.#_allPost.blogpost.slice(0, 10);
    return recentlyPublished;
  }

  async getMostUsedTags() {
    return this.#_allPost.mostUsedTags;
  }
}

const getBlog = async () => {
  return singleton("blogpost", () => new BlogData());
};

export type { MDXFile, BlogContent };

export default getBlog;
