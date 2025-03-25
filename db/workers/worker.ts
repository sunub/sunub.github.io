"use server";

import { parentPort, workerData } from "worker_threads";
import path from "path";
import { readdir, stat } from "fs/promises";
import { createReadStream } from "fs";
import matter from "gray-matter";
import { z } from "zod";

export type PostCategory = z.infer<typeof PostCategorySchema>;
export const ROOT_BLOG_PATH = path.join(process.cwd(), "posts");
export const DAY_IN_SECONDS = 86400;

type PostMetadata = z.infer<typeof FrontMatterSchema>;

type WorkerMessage = {
  type: "data" | "fileComplete" | "done" | "error" | "change";
  chunk: string;
  content?: string;
  slug: string;
  frontmatter: PostMetadata;
};

const PostCategorySchema = z.union([
  z.literal("web"),
  z.literal("algorithm"),
  z.literal("cs"),
  z.literal("code"),
]);

const FrontMatterSchema = z.object({
  title: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  summary: z.string(),
  slug: z.string(),
  category: PostCategorySchema,
  completed: z.boolean(),
});

const FRONTMATTER_REGEX = /^---\n([\s\S]*?)\n---\n([\s\S]*)/;
function validateFrontMatter(
  data: any
): data is z.infer<typeof FrontMatterSchema> {
  return FrontMatterSchema.safeParse(data).success;
}

async function processFile(fullPath: string, file: string) {
  if (!parentPort) return;
  try {
    let frontmatter: z.infer<typeof FrontMatterSchema> | null = null;
    const slug = file.split(".")[0];
    const readStream = createReadStream(fullPath, { encoding: "utf-8" });
    for await (const chunk of readStream) {
      if (!frontmatter && FRONTMATTER_REGEX.test(chunk)) {
        const { data, content } = matter(chunk);
        if (validateFrontMatter(data)) frontmatter = data;

        parentPort.postMessage({
          type: "data",
          slug,
          frontmatter,
          content,
        });
      } else {
        parentPort.postMessage({
          type: "data",
          slug,
          content: chunk,
        });
      }
    }
    parentPort.postMessage({
      type: "fileComplete",
      slug,
    });
  } catch (error) {
    parentPort.postMessage({
      type: "error",
      message: `${file} 파일을 읽는 중 오류가 발생했습니다.`,
    });
  }
}

async function readDir(dirPath: string) {
  let files: string[];
  try {
    files = await readdir(dirPath);
  } catch (error: any) {
    console.error(
      `${dirPath} 디렉토리를 읽는 중 오류가 발생했습니다: ${error.message}`
    );
    return;
  }

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    let fileStat;
    try {
      fileStat = await stat(fullPath);
    } catch (error: any) {
      parentPort?.postMessage({
        type: "error",
        message: `파일 상태 확인 실패: ${fullPath} - ${error.message}`,
      });
      continue;
    }
    if (fileStat.isDirectory()) {
      await readDir(fullPath);
    } else {
      await processFile(fullPath, file);
    }
  }
}

async function readFile(filePath: string, slug: string) {
  if (!parentPort) return;
  try {
    const readStream = createReadStream(filePath, { encoding: "utf-8" });
    let frontmatter: z.infer<typeof FrontMatterSchema> | null = null;
    for await (const chunk of readStream) {
      if (!frontmatter && FRONTMATTER_REGEX.test(chunk)) {
        const { data, content: fileContent } = matter(chunk);
        if (validateFrontMatter(data)) frontmatter = data;
        parentPort.postMessage({
          type: "data",
          frontmatter,
          content: fileContent,
          slug,
        });
      } else {
        parentPort.postMessage({
          type: "data",
          content: chunk,
          slug,
        });
      }
    }

    parentPort.postMessage({
      type: "fileComplete",
      slug,
    });
  } catch (error) {
    console.error(`파일을 읽는 중 오류가 발생했습니다: ${filePath}`);
    parentPort.postMessage({
      type: "error",
      message: `${filePath} 파일을 읽는 중 오류가 발생했습니다.`,
    });
  } finally {
    parentPort.postMessage({
      type: "done",
      content: workerData.tag,
    });
  }
}

export async function readFileProcess() {
  const rootDir = path.join(ROOT_BLOG_PATH, workerData.tag as PostCategory);
  parentPort?.on("message", (message: WorkerMessage) => {
    switch (message.type) {
      case "change":
        if (!message.content) break;
        readFile(message.content, message.slug);
        break;
    }
  });

  return readDir(rootDir);
}
