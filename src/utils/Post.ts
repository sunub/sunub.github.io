import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype, { all } from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { marked } from "marked";
import fs from "fs";
import path from "path";

const fileHeader: FileHeader = {
  "01_w": "w",
  "02_a": "a",
  "03_js": "j",
  "04_ts": "t",
};
let postData = new Map();

export async function getPost(): Promise<Map<string, Description[]>> {
  const blogpost: Map<string, Description[]> = new Map();
  const postFileData: Files = getFiles();
  const descriptions: Description[] = [];

  for (const [tag, files] of Object.entries(postFileData)) {
    for (const file of files) {
      const [description, content]: [Description, string] =
        divideDescriptionAndContent(file);

      const category = description.category!;
      const options = {
        mangle: false,
        headerIds: false,
      };
      marked.use(options);
      const html = marked(content);

      blogpost.has(category)
        ? blogpost.set(category, [...blogpost.get(category)!, description])
        : blogpost.set(category, [description]);

      description["content"] = html;
      descriptions.push(description);
    }

    blogpost.set("all", descriptions);
  }

  postData = new Map(blogpost);
  return blogpost;
}

export function getFiles(): Files {
  let filePath = "posts/";
  const folders: Folders = fs.readdirSync(filePath, "utf-8");
  let postFileData: Files = {};
  for (const folder of folders) {
    const tag: Tag = fileHeader[folder];
    postFileData[tag] = readPostFiles(filePath + folder, []);
  }
  return postFileData;
}

function readPostFiles(folderPath: string, paths: string[]): string[] {
  const folders = fs.readdirSync(folderPath, "utf-8");

  for (const file of folders) {
    const filePath = path.join(folderPath, file);
    const extension = path.extname(filePath).toLowerCase();
    if (extension === ".md") {
      const file = fs.readFileSync(filePath, "utf-8");
      paths.push(file);
    }
  }
  return paths;
}

export function findPostByCategoryAndSlug(
  category: string,
  slug: string[],
  blogpost: Map<string, Description[]>
) {
  const allPost: Description[] = blogpost.get(category)!;

  if (Array.isArray(allPost)) {
    const post = allPost.filter((post) => {
      if (slug[0] === post.slug) {
        return post;
      }
    });

    return post;
  }

  return [];
}

function divideDescriptionAndContent(text: string): [Description, string] {
  const pattern = /---\n([\s\S]*?)\n---/;
  const match = text.match(pattern);

  const description: Description = {};
  if (match) {
    const extractedText = match[1];
    const lines = extractedText.split("\n");
    for (const line of lines) {
      const [key, value] = line.split(":").map((text) => text.trim());
      description[key] = value;
    }
  }

  const content = text.split("---").slice(2).join("").trim();

  return [description, content];
}
