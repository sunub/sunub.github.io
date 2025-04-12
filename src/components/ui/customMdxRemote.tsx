import { MDXRemote } from "next-mdx-remote/rsc";
import React, { Suspense, cache } from "react";
import { PostArticleComponents } from "./PostArticleComponents";
import { ComponentSkeleton } from "../Skeletons";
import { PostCategory } from "@/types/schema";
import { getPostContent } from "./utils/getPostContent";

function convertTableBlockToHTML(tableLines: string[]): string {
  if (tableLines.length < 2) return tableLines.join("\n");

  const headers = tableLines[0]
    .trim()
    .split("|")
    .map((header) => header.trim())
    .filter((header) => header.length > 0);
  const rows = tableLines.slice(2).map((line) =>
    line
      .trim()
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0)
  );

  const thead = `<thead><tr>${headers
    .map((header) => `<th>${header}</th>`)
    .join("")}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map(
      (row) =>
        `<tr>${row
          .map(
            (cell) => `<td className="p-4 text-[.95rem] border-b">${cell}</td>`
          )
          .join("")}</tr>`
    )
    .join("")}</tbody>`;
  return `<table cellPadding="0" cellSpacing="0">${thead}${tbody}</table>`;
}

const transformMarkdownTables = cache((content: string): string => {
  const lines = content.split("\n");
  const result = [];

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
      result.push(lines[i]);
      i++;
    }
  }
  return result.join("\n");
});

async function CustomMDXRemote({
  category,
  slug,
}: {
  category: PostCategory;
  slug: string;
}) {
  const baseUrl =
    process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BASE_URL
      : "http://localhost:3000";
  try {
    const content = await getPostContent(category, slug);
    const transformedContent = transformMarkdownTables(content);

    return (
      <MDXRemote
        source={transformedContent}
        components={PostArticleComponents}
      />
    );
  } catch (error) {
    console.error("MDX 콘텐츠를 불러오는 중 오류가 발생했습니다:", error);
    return (
      <div className="text-red-500 p-4 border border-red-300 rounded">
        <h3>콘텐츠를 불러올 수 없습니다</h3>
        <p>죄송합니다. 요청하신 콘텐츠를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }
}

export default async function MDXWrapper({
  category,
  slug,
}: {
  category: PostCategory;
  slug: string;
}) {
  return <CustomMDXRemote category={category} slug={slug} />;
}
