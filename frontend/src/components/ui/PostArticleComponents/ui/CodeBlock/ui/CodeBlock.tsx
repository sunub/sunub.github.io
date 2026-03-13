import React from "react";
import * as shiki from "shiki";
import {
	CodeBlockContent,
	CodeBlockFilename,
	CodeBlockHeader,
	CodeBlockWrapper,
	InlineCodeStyle,
} from "../style";
import { Clipboard } from "./Clipboard";

const languageMap = {
	"language-html": "html",
	"language-js": "javascript",
	"language-javascript": "javascript",
	"language-jsx": "jsx",
	"language-ts": "typescript",
	"language-typescript": "typescript",
	"language-tsx": "tsx",
	"language-sh": "bash",
	"language-bash": "bash",
	"language-md": "markdown",
	"language-yaml": "yaml",
	"language-json": "json",
	"language-css": "css",
	"language-sql": "sql",
	"language-c": "c",
	"language-c++": "cpp",
	"language-text": "plaintext",
	"language-plaintext": "plaintext",
	"language-plantext": "plaintext",
} as const;

const languageLabelMap = {
	html: "HTML",
	javascript: "JAVASCRIPT",
	jsx: "JSX",
	typescript: "TYPESCRIPT",
	tsx: "TSX",
	bash: "BASH",
	markdown: "MARKDOWN",
	yaml: "YAML",
	json: "JSON",
	css: "CSS",
	sql: "SQL",
	c: "C",
	cpp: "C++",
	plaintext: "PLAINTEXT",
} as const;

const highlighterPromise = shiki.createHighlighter({
	themes: ["vitesse-light", "tokyo-night"],
	langs: [
		"html",
		"javascript",
		"jsx",
		"typescript",
		"tsx",
		"bash",
		"markdown",
		"yaml",
		"json",
		"css",
		"sql",
		"c",
		"cpp",
		"plaintext",
	],
});

type LanguageKey = keyof typeof languageMap;
type SupportedLanguage = (typeof languageMap)[LanguageKey] | "plaintext";

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
	className?: string;
	children: React.ReactNode;
}

function extractCodeText(children: React.ReactNode): string {
	return React.Children.toArray(children)
		.map((child) => {
			if (typeof child === "string") return child;

			if (
				React.isValidElement<{ children?: React.ReactNode }>(child) &&
				child.props?.children
			) {
				return React.Children.toArray(child.props.children)
					.map((nestedChild) =>
						typeof nestedChild === "string" ? nestedChild : "",
					)
					.join("");
			}

			return "";
		})
		.join("");
}

function resolveLanguage(className?: string): SupportedLanguage {
	if (!className) {
		return "plaintext";
	}

	const normalizedClassName = className.trim().toLowerCase();
	return languageMap[normalizedClassName as LanguageKey] || "plaintext";
}

async function CodeBlock({ className, children, ...props }: CodeBlockProps) {
	const codeToString = extractCodeText(children);
	const language = resolveLanguage(className);
	const languageLabel = languageLabelMap[language] || "PLAINTEXT";

	try {
		const highlighter = await highlighterPromise;
		const html = highlighter.codeToHtml(codeToString, {
			themes: {
				light: "vitesse-light",
				dark: "tokyo-night",
			},
			lang: language,
		});

		return (
			<CodeBlockWrapper {...props}>
				<CodeBlockHeader>
					<CodeBlockFilename>{languageLabel}</CodeBlockFilename>
					<Clipboard text={codeToString} />
				</CodeBlockHeader>

				<CodeBlockContent>
					{/* biome-ignore lint/security/noDangerouslySetInnerHtml: CodeBlock needs inject html code */}
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</CodeBlockContent>
			</CodeBlockWrapper>
		);
	} catch (error) {
		console.error(
			"Shiki를 사용하여 코드 하이라이팅을 변환하는 동안 오류가 발생했습니다.",
			error,
		);

		return (
			<CodeBlockWrapper {...props}>
				<CodeBlockHeader>
					<CodeBlockFilename>{languageLabel}</CodeBlockFilename>
					<Clipboard text={codeToString} />
				</CodeBlockHeader>

				<CodeBlockContent>
					<pre>
						<code>{codeToString}</code>
					</pre>
				</CodeBlockContent>
			</CodeBlockWrapper>
		);
	}
}

interface InlineCodeProps extends React.HTMLAttributes<HTMLElement> {
	children: React.ReactNode;
}

function InlineCode({ children, ...props }: InlineCodeProps) {
	return <InlineCodeStyle {...props}>{children}</InlineCodeStyle>;
}

export { CodeBlock, InlineCode };
