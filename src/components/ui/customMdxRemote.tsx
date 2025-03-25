import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { Suspense } from "react";
import { PostArticleComponents } from "./PostArticleComponents";
import { ComponentSkeleton } from "../Skeletons";
import { Readable, Transform, TransformCallback, Writable } from "node:stream";

function createSourceStream(
  source: string,
  chunkSize: number = 1024
): Readable {
  let currentIndex = 0;
  return new Readable({
    read() {
      if (currentIndex >= source.length) {
        this.push(null);
      } else {
        const chunk = source.slice(currentIndex, currentIndex + chunkSize);
        currentIndex += chunkSize;
        this.push(chunk);
      }
    },
  });
}

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

class MarkdownTableTransform extends Transform {
  private bufferedData: string = "";
  private inTable: boolean = false;
  private tableLines: string[] = [];

  constructor(options?: any) {
    super(options);
  }

  _transform(
    chunk: Buffer | string,
    encoding: string,
    callback: TransformCallback
  ) {
    let data = chunk.toString();
    data = this.bufferedData + data;
    let lines = data.split("\n");

    if (!data.endsWith("\n")) {
      this.bufferedData = lines.pop() || "";
    } else {
      this.bufferedData = "";
    }

    for (let line of lines) {
      if (line.trim().startsWith("|")) {
        this.inTable = true;
        this.tableLines.push(line);
      } else {
        if (this.inTable) {
          const htmlTable = convertTableBlockToHTML(this.tableLines);
          this.push(htmlTable + "\n");
          this.inTable = false;
          this.tableLines = [];
        }
        this.push(line + "\n");
      }
    }
    callback();
  }

  _flush(callback: TransformCallback) {
    if (this.inTable && this.tableLines.length > 0) {
      const htmlTable = convertTableBlockToHTML(this.tableLines);
      this.push(htmlTable + "\n");
    }
    if (this.bufferedData) {
      this.push(this.bufferedData);
    }
    callback();
  }
}

async function transformSource(source: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let result = "";
    const readable = createSourceStream(source, 1024);
    const transformer = new MarkdownTableTransform();
    const writable = new Writable({
      write(chunk, encoding, callback) {
        result += chunk.toString();
        callback();
      },
    });
    writable.on("finish", () => resolve(result));
    readable.pipe(transformer).pipe(writable);
  });
}

const components = PostArticleComponents;
async function CustomMDXRemote(props: MDXRemoteProps) {
  const transformed = await transformSource(props.source as string);

  return (
    <Suspense fallback={<ComponentSkeleton />}>
      <MDXRemote
        source={transformed}
        components={{ ...components, ...(props.components || {}) }}
      />
    </Suspense>
  );
}

export default CustomMDXRemote;
