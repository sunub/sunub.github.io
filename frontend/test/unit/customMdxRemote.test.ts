import { readdir, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { describe, expect, test } from "vitest";
import {
	convertTableBlockToHTML,
	transformMarkdownContent,
} from "@/components/ui/customMdxRemote";

const POSTS_ROOT = resolve(process.cwd(), "../posts");

async function collectPostFiles(dirPath: string): Promise<string[]> {
	const entries = await readdir(dirPath, { withFileTypes: true });
	const nestedPaths = await Promise.all(
		entries.map(async (entry) => {
			const entryPath = resolve(dirPath, entry.name);

			if (entry.isDirectory()) {
				return collectPostFiles(entryPath);
			}

			if (entry.isFile() && entry.name.endsWith(".mdx")) {
				return [entryPath];
			}

			return [];
		}),
	);

	return nestedPaths.flat().sort();
}

describe("convertTableBlockToHTML", () => {
	test("normalizes void html tags inside markdown table cells for MDX", () => {
		const html = convertTableBlockToHTML([
			"| 프로세스 | 프로세스가 제어하는 부분 |",
			"| -------- | ------------------------ |",
			"| 브라우저 프로세스 | 주소 표시줄을 제어한다. <br>권한이 필요한 부분도 처리한다. |",
		]);

		expect(html).toContain("<br />");
		expect(html).not.toContain("<br>");
	});

	test("escapes email-like angle brackets inside markdown table cells", () => {
		const html = convertTableBlockToHTML([
			"| 이름 | 이메일 |",
			"| ---- | ------ |",
			"| 김철수 | <kim@email.com> |",
		]);

		expect(html).toContain("&lt;kim@email.com&gt;");
		expect(html).not.toContain("<kim@email.com>");
	});
});

describe("transformMarkdownContent", () => {
	test("escapes comparison-style angle brackets in plain text", () => {
		const transformed = transformMarkdownContent(
			"3. 범위 조건(>, <, BETWEEN)에 사용되는 열은 마지막에 배치",
			"code",
		);

		expect(transformed).toContain("범위 조건(>, &lt;, BETWEEN)");
	});

	test("keeps markdown autolinks in plain text untouched", () => {
		const transformed = transformMarkdownContent(
			"Author: sunub <bsc5672@gmail.com>",
			"cs",
		);

		expect(transformed).toContain("<bsc5672@gmail.com>");
	});
});

describe("MDX regression", () => {
	test.each([
		"relational-database-indexing-and-join.mdx",
		"denormalization-vs-normalization-database.mdx",
	])("compiles %s after markdown transformation", async (fileName) => {
		const raw = await readFile(
			resolve(process.cwd(), "../posts/code", fileName),
			"utf8",
		);
		const { content } = matter(raw);
		const transformed = transformMarkdownContent(content, "code");

		await expect(
			compileMDX({
				source: transformed,
				options: {
					mdxOptions: {
						remarkPlugins: [remarkMath],
						rehypePlugins: [rehypeKatex],
					},
				},
			}),
		).resolves.toBeDefined();
	});

	test("compiles every post after markdown transformation", async () => {
		const postPaths = await collectPostFiles(POSTS_ROOT);
		const failures: string[] = [];

		for (const postPath of postPaths) {
			const raw = await readFile(postPath, "utf8");
			const { content, data } = matter(raw);
			const category =
				typeof data.category === "string" ? data.category : "code";
			const transformed = transformMarkdownContent(content, category);

			try {
				await compileMDX({
					source: transformed,
					options: {
						mdxOptions: {
							remarkPlugins: [remarkMath],
							rehypePlugins: [rehypeKatex],
						},
					},
				});
			} catch (error) {
				const reason =
					error instanceof Error ? error.message : JSON.stringify(error);
				failures.push(`${postPath}: ${reason}`);
			}
		}

		expect(failures).toEqual([]);
	});
});
