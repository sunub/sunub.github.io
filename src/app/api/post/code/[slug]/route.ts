import matter from "gray-matter";
import { createReadStream } from "node:fs";
import { getPostPath } from "@/shared/utils/getPostPath";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const filePath = getPostPath("cs", slug);
  const readStream = createReadStream(filePath, { encoding: "utf-8" });

  const chunks: string[] = [];
  for await (const chunk of readStream) {
    chunks.push(chunk);
  }

  const content = chunks.join("").replace(/---[\s\S]*?---/, "");
  return new Response(JSON.stringify({ content }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
