import React from "react";
import { codeToHtml } from "shiki";
import { CodeBlockWrapper, InlineCodeStyle } from "../style";
import { Clipboard } from "./Clipboard";

const languageMap = {
	"language-html": "html",
	"language-js": "javascript",
	"language-jsx": "jsx",
	"language-ts": "typescript",
	"language-tsx": "tsx",
	"language-sh": "bash",
	"language-md": "markdown",
	"language-yaml": "yaml",
	"language-json": "json",
	"language-css": "css",
	"language-c++": "cpp",
} as const;

type LanguageKey = keyof typeof languageMap;

interface ColdeBlockProps extends React.HTMLAttributes<HTMLElement> {
	className: string;
	children: React.ReactNode;
}

async function CodeBlock({ className, children, ...props }: ColdeBlockProps) {
	const codeToString = React.Children.toArray(children)
		.filter((child) => typeof child === "string")
		.join("");

	try {
		const html = await codeToHtml(codeToString, {
			themes: {
				light: "vitesse-light",
				dark: "tokyo-night",
			},
			lang: languageMap[className as LanguageKey] || "plaintext",
		});
		return (
			<CodeBlockWrapper>
				{/* biome-ignore  lint/security/noDangerouslySetInnerHtml: CodeBlock needs inject html code */}
				<div dangerouslySetInnerHTML={{ __html: html }} />
				<Clipboard text={codeToString} />
			</CodeBlockWrapper>
		);
	} catch (error) {
		console.error(
			"Shiki를 사용하여 코드 하이라이팅을 변환하는 동안 오류가 발생했습니다.",
			error,
		);
		return (
			<pre {...props}>
				<code>{codeToString}</code>
			</pre>
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
