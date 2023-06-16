import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { baseURL } from "@/lib/getBaseUrl";
import fs from "fs";
import path from "path";
import { getFiles } from "./getFiles";

const fileHeader: FileHeader = {
  "01_w": "w",
  "02_a": "a",
  "03_js": "j",
  "04_ts": "t",
};

const postContent = new Map();
const postDescription = new Map();

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
      descriptions.push(description);
      postContent.has(tag)
        ? postContent.set(tag, [...postContent.get(tag), html])
        : postContent.set(tag, [html]);

      postDescription.has(tag)
        ? postDescription.set(tag, [...postDescription.get(tag), description])
        : postDescription.set(tag, [description]);
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
