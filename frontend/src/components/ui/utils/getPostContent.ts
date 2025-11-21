"use server";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { findUpDir } from "fx_utils";
import { cache } from "react";

export const getPostContent = cache(async (category: string, slug: string) => {
	const postsRootPath = (await findUpDir("posts")) ?? "";
	const filePath = path.join(postsRootPath, category, `${slug}.mdx`);
	const fileContent = await readFile(filePath, "utf8");
	const contentWithoutFrontmatter = fileContent.replace(/---[\s\S]*?---/, "");
	return contentWithoutFrontmatter;
});
