"use server";

import path from "path";
import { readFile } from "fs/promises";
import { cache } from "react";

export const getPostContent = cache(async (category: string, slug: string) => {
  const filePath = path.join(process.cwd(), "posts", category, `${slug}.mdx`);
  const fileContent = await readFile(filePath, "utf8");
  const contentWithoutFrontmatter = fileContent.replace(/---[\s\S]*?---/, "");
  return contentWithoutFrontmatter;
});
