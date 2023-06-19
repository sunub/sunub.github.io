import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { getFiles } from "./getFiles";
import { baseURL } from "./getBaseUrl";

export default async function getPost(): Promise<Description[]> {
  const postFileData: Files = getFiles();
  const descriptions: Description[] = [];

  for (const [tag, files] of Object.entries(postFileData)) {
    for (const file of files) {
      const [description, content]: [Description, string] =
        divideDescriptionAndContent(file);

      const html = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(content)
        .then((html) => String(html));

      description["content"] = html;
      descriptions.push(description);
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
