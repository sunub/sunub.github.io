import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { createBlogPost } from "./redis";
import fs from "fs";
import { getFiles } from "./getFiles";
import { baseURL } from "./getBaseUrl";

const fileHeader: FileHeader = {
  "01_w": "w",
  "02_a": "a",
  "03_js": "j",
  "04_ts": "t",
};

const blogPost = new Map();

export default async function getPost(): Promise<Description[]> {
  const postFileData = getFiles();

  const htmls = [];
  const descriptions: Description[] = [];
  for (const [tag, files] of Object.entries(postFileData)) {
    for (const file of files) {
      const md = fs.readFileSync(file, "utf-8");
      const [description, content]: [Description, string] =
        divideDescriptionAndContent(md);

      const html = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content)
        .then((html) => String(html));

      htmls.push(html);
      description["content"] = html;

      descriptions.push(description);
      blogPost.has(tag)
        ? blogPost.set(tag, [...blogPost.get(tag), description])
        : blogPost.set(tag, [description]);
    }
  }

  return descriptions;
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
