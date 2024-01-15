import { Categories, FrontMatter } from "type";

const fs = require("fs");
const path = require("path");

type MDXFile = {
  metadata: FrontMatter;
  content: string;
};

type BlogContent = Map<Categories, MDXFile[]>;

function parseFrontmatter(fileContent: string): MDXFile {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.split("\n");
  let metadata: FrontMatter = {
    title: "",
    date: "",
    tags: [],
    summary: "",
    category: "",
    slug: "",
  };

  frontMatterLines.forEach((line) => {
    let [key, ...valueArr] = line.split(":");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
    metadata[key.trim() as keyof FrontMatter] = value;
  });

  return { metadata, content };
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

function getMDXData(dir: string) {
  let mdxFilesPath = getMDXFiles(dir);

  const MDXFileList = new Map();
  mdxFilesPath.forEach((files: string[], category: string) => {
    const mdxFiles: MDXFile[] = [];
    files.forEach((file) => {
      let { metadata, content } = readMDXFile(file);
      mdxFiles.push({ metadata, content });
    });
    MDXFileList.set(category, mdxFiles);
  });

  return MDXFileList;
}

function getBlogPost() {
  return getMDXData(path.join(process.cwd(), "posts"));
}

class Blog {
  posts: BlogContent;

  constructor() {
    this.posts = getBlogPost();
  }

  get category() {
    return [...this.posts.keys()];
  }

  get allPosts() {
    return [...this.posts.values()];
  }

  getPostByCategory(category: Categories) {
    return this.posts.get(category);
  }
}

export default Blog;
