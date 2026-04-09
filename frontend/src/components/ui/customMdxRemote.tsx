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
const HTML_COMMENT_PATTERN = /^<!--[\s\S]*-->$/;
const JSX_FRAGMENT_PATTERN = /^<\/?>$/;
const HTML_CLOSING_TAG_PATTERN = /^<\/[A-Za-z][A-Za-z0-9:-]*\s*>$/;
const HTML_OPENING_TAG_PATTERN =
	/^<[A-Za-z][A-Za-z0-9:-]*(?:\s+(?:[^"'<>`{}]|"[^"]*"|'[^']*'|\{[^{}]*\})*)?\s*\/?>$/;
const MDX_AUTOLINK_PATTERN =
	/^<(?:[A-Za-z][A-Za-z0-9+.-]{1,31}:[^\s<>]+|[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+)>$/;

function normalizeMdxInlineHtml(content: string): string {
	return content.replace(HTML_VOID_TAG_PATTERN, (tag) => {
		if (/\/\s*>$/.test(tag)) {
			return tag;
		}

		return tag.replace(/>$/, " />");
	});
}

type NormalizeMdxTextOptions = {
	preserveAutolinks?: boolean;
};

function isSafeMdxHtmlLikeToken(
	token: string,
	{ preserveAutolinks = true }: NormalizeMdxTextOptions,
): boolean {
	if (
		HTML_COMMENT_PATTERN.test(token) ||
		JSX_FRAGMENT_PATTERN.test(token) ||
		HTML_CLOSING_TAG_PATTERN.test(token) ||
		HTML_OPENING_TAG_PATTERN.test(token)
	) {
		return true;
	}

	return preserveAutolinks && MDX_AUTOLINK_PATTERN.test(token);
}

function escapeMdxHtmlLikeToken(token: string): string {
	return `&lt;${token.slice(1, -1)}&gt;`;
}

function normalizeMdxTextSegment(
	content: string,
	options?: NormalizeMdxTextOptions,
): string {
	let result = "";
	let cursor = 0;

	while (cursor < content.length) {
		const start = content.indexOf("<", cursor);
		if (start === -1) {
			return `${result}${content.slice(cursor)}`;
		}

		result += content.slice(cursor, start);

		const nextCharacter = content[start + 1];
		if (!nextCharacter || !/[A-Za-z!/?]/.test(nextCharacter)) {
			result += "&lt;";
			cursor = start + 1;
			continue;
		}

		const end = content.indexOf(">", start + 1);
		if (end === -1) {
			result += "&lt;";
			cursor = start + 1;
			continue;
		}

		const candidate = content.slice(start, end + 1);
		if (isSafeMdxHtmlLikeToken(candidate, options ?? {})) {
			result += normalizeMdxInlineHtml(candidate);
		} else {
			result += escapeMdxHtmlLikeToken(candidate);
		}

		cursor = end + 1;
	}

	return result;
}

export function normalizeMdxTextContent(
	content: string,
	options?: NormalizeMdxTextOptions,
): string {
	let result = "";
	let cursor = 0;

	while (cursor < content.length) {
		const codeSpanStart = content.indexOf("`", cursor);
		if (codeSpanStart === -1) {
			return `${result}${normalizeMdxTextSegment(content.slice(cursor), options)}`;
		}

		result += normalizeMdxTextSegment(
			content.slice(cursor, codeSpanStart),
			options,
		);

		let backtickCount = 1;
		while (content[codeSpanStart + backtickCount] === "`") {
			backtickCount += 1;
		}

		const delimiter = "`".repeat(backtickCount);
		const codeSpanEnd = content.indexOf(
			delimiter,
			codeSpanStart + backtickCount,
		);

		if (codeSpanEnd === -1) {
			return `${result}${content.slice(codeSpanStart)}`;
		}

		result += content.slice(codeSpanStart, codeSpanEnd + backtickCount);
		cursor = codeSpanEnd + backtickCount;
	}

	return result;
}

export function convertTableBlockToHTML(tableLines: string[]): string {
	if (tableLines.length < 2) return tableLines.join("\n");

	const headers = tableLines[0]
		.trim()
		.split("|")
		.map((header) =>
			normalizeMdxTextContent(header.trim(), { preserveAutolinks: false }),
		)
		.filter((header) => header.length > 0);
	const rows = tableLines.slice(2).map((line) =>
		line
			.trim()
			.split("|")
			.map((cell) =>
				normalizeMdxTextContent(cell.trim(), { preserveAutolinks: false }),
			)
			.filter((cell) => cell.length > 0),
	);

	const thead = `<thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>`;
	const tbody = `<tbody>${rows
		.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`)
		.join("")}</tbody>`;
	return `<table cellPadding="0" cellSpacing="0">${thead}${tbody}</table>`;
}

export function transformMarkdownContent(
	content: string,
	category: string,
): string {
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
			const lineWithImages = transformObsidianImageEmbeds(
				lines[i],
				postImageContext,
			);
			result.push(normalizeMdxTextContent(lineWithImages));
			i++;
		}
	}

	return result.join("\n");
}

const getTransformedMarkdownContent = cache(
	(content: string, category: string) => {
		return transformMarkdownContent(content, category);
	},
);

export default async function MDXWrapper({
	content,
	postImageContext,
}: {
	content: string;
	postImageContext: PostImageContext;
}) {
	const transformedContent = getTransformedMarkdownContent(
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
