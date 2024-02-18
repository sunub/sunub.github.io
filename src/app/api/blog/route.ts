import Blog from "@/db/blog";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { slug } = await req.json();
  const blogPost = Blog.getPostByslug(slug);
  return NextResponse.json({ ...blogPost });
}
