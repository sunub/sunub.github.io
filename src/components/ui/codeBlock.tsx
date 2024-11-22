import React from "react";
import { codeToHtml } from "shiki";
import { CodeBlockWrapper } from "./codeBlock.style";

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
} as const;

type LanguageKey = keyof typeof languageMap;

async function CodeBlock({
  className,
  children,
  ...props
}: {
  className: string;
  children: React.ReactNode;
}) {
  const codeToString = React.Children.toArray(children)
    .filter((child) => typeof child === "string")
    .join("");

  try {
    const html = await codeToHtml(codeToString, {
      theme: "snazzy-light",
      lang: languageMap[className as LanguageKey] || "text",
    });
    return (
      <CodeBlockWrapper
        className="relative group"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch (error) {
    console.error(
      "Shiki를 사용하여 코드 하이라이팅을 변환하는 동안 오류가 발생했습니다.",
      error
    );
    return (
      <pre className={className}>
        <code>{codeToString}</code>
      </pre>
    );
  }
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-200 text-sm font-mono">
      {children}
    </code>
  );
}

export { CodeBlock, InlineCode };
