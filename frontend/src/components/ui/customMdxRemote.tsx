import { MDXRemote } from "next-mdx-remote/rsc";
import { cache } from "react";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { PostArticleComponents } from "./PostArticleComponents";
import {
	type PostImageContext,
	transformObsidianImageEmbeds,
} from "./PostArticleComponents/ui/PostImage/model/imageSource";

const HTML_VOID_TAG_PATTERN =
	/<\s*(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)(\s[^<>]*?)?>/gi;

function normalizeMdxInlineHtml(content: string): string {
	return content.replace(HTML_VOID_TAG_PATTERN, (tag) => {
		if (/\/\s*>$/.test(tag)) {
			return tag;
		}

		return tag.replace(/>$/, " />");
	});
}

export function convertTableBlockToHTML(tableLines: string[]): string {
	if (tableLines.length < 2) return tableLines.join("\n");

	const headers = tableLines[0]
		.trim()
		.split("|")
		.map((header) => normalizeMdxInlineHtml(header.trim()))
		.filter((header) => header.length > 0);
	const rows = tableLines.slice(2).map((line) =>
		line
			.trim()
			.split("|")
			.map((cell) => normalizeMdxInlineHtml(cell.trim()))
			.filter((cell) => cell.length > 0),
	);

	const thead = `<thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>`;
	const tbody = `<tbody>${rows
		.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
		.join("")}</tbody>`;
	return `<table cellPadding="0" cellSpacing="0">${thead}${tbody}</table>`;
}

const transformMarkdownContent = cache(
	(content: string, category: string): string => {
		const lines = content.split("\n");
		const result = [];
		const postImageContext: PostImageContext = { category };

		let i = 0;
		while (i < lines.length) {
			const codeBlockRegexp = /^(`{3,}|~{3,})([a-zA-Z0-9+-]*)?/g;
			if (codeBlockRegexp.test(lines[i])) {
				result.push(lines[i]);
				i++;
				while (i < lines.length && !codeBlockRegexp.test(lines[i])) {
					result.push(lines[i]);
					i++;
				}
				if (i < lines.length) {
					result.push(lines[i]);
					i++;
				}
			} else if (lines[i].trim().startsWith("|")) {
				const tableLines = [];
				while (i < lines.length && lines[i].trim().startsWith("|")) {
					tableLines.push(lines[i]);
					i++;
				}
				const htmlTable = convertTableBlockToHTML(tableLines);
				result.push(htmlTable);
			} else {
				result.push(transformObsidianImageEmbeds(lines[i], postImageContext));
				i++;
			}
		}
		return result.join("\n");
	},
);

export default async function MDXWrapper({
	content,
	postImageContext,
}: {
	content: string;
	postImageContext: PostImageContext;
}) {
	const transformedContent = transformMarkdownContent(
		content,
		postImageContext.category,
	);
	return (
		<MDXRemote
			source={transformedContent}
			components={PostArticleComponents}
			options={{
				mdxOptions: {
					remarkPlugins: [remarkMath],
					rehypePlugins: [rehypeKatex],
				},
			}}
		/>
	);
}
