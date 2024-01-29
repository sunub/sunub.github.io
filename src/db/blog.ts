import { Categories, FrontMatter } from "type";

const fs = require("fs");
const path = require("path");

type MDXFile = {
  metadata: FrontMatter;
  content: string;
  slug?: string;
  category?: string;
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

  const MDXFileList: Partial<MDXFile[]> = [];
  mdxFilesPath.forEach((files: string[], category: string) => {
    let mdxFiles: Partial<MDXFile> = {};
    files.forEach((file) => {
      let { metadata, content } = readMDXFile(file);
      const { slug } = metadata;
      mdxFiles = {
        metadata,
        content,
        slug,
        category,
      };
      MDXFileList.push(mdxFiles as MDXFile);
    });
  });

  return MDXFileList;
}

function getBlogPost(): MDXFile[] {
  const blogpost = getMDXData(path.join(process.cwd(), "posts")) as MDXFile[];
  return blogpost.sort((a, b) => {
    return (
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
  });
}

class Blog {
  static posts = getBlogPost();

  static getMetadata() {
    const metadata = Blog.posts.map((post) => post.metadata);
    return [...metadata];
  }

  static findByCategory(category: string) {
    const postsByCategory = Blog.posts.filter(
      (post) => post.category === category,
    );
    return [...postsByCategory];
  }

  static getPostByslug(slug: string) {
    const postsBySlug = Blog.posts.find((posts) => posts.slug === slug);
    return Object.assign({}, postsBySlug);
  }
}

export default Blog;
