import { NextResponse } from "next/server";
import { createBlogPost } from "@/lib/redis";

export const dynamic = "force-static";

export async function GET(req: Request) {
  return NextResponse.json("HI");
}
export async function POST(req: Request) {
  const data = await req.json();

  const id = await createBlogPost(data);

  return NextResponse.json("HI");
}
