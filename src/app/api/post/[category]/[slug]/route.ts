import "dotenv/config";
import path from "node:path";
import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import matter from "gray-matter";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ category: string; slug: string }> },
) {
  const { category, slug } = await params;

  try {
    const post = await fs.readFile(
      path.join(process.cwd(), "posts", `${category}/${slug}.mdx`),
      "utf-8",
    );
    const file = matter(post);
    return NextResponse.json(
      { content: file.content },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `${slug}와 관련된 포스트를 찾을 수 없습니다.` },
      { status: 404 },
    );
  }
}
