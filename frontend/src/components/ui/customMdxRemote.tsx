import { MDXRemote } from 'next-mdx-remote/rsc';
import React, { Suspense, cache } from 'react';
import { PostArticleComponents } from './PostArticleComponents';
import { ComponentSkeleton } from '../Skeletons';

function convertTableBlockToHTML(tableLines: string[]): string {
  if (tableLines.length < 2) return tableLines.join('\n');

  const headers = tableLines[0]
    .trim()
    .split('|')
    .map(header => header.trim())
    .filter(header => header.length > 0);
  const rows = tableLines.slice(2).map(line =>
    line
      .trim()
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0)
  );

  const thead = `<thead><tr>${headers.map(header => `<th>${header}</th>`).join('')}</tr></thead>`;
  const tbody = `<tbody>${rows
    .map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`)
    .join('')}</tbody>`;
  return `<table cellPadding="0" cellSpacing="0">${thead}${tbody}</table>`;
}

const transformMarkdownTables = cache((content: string): string => {
  const lines = content.split('\n');
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
    } else if (lines[i].trim().startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
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
  return result.join('\n');
});

export default async function MDXWrapper({ content }: { content: string }) {
  const transformedContent = transformMarkdownTables(content);
  return <MDXRemote source={transformedContent} components={PostArticleComponents} />;
}
