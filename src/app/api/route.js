import Post from "@/utils/post/Post";
import { NextResponse } from "next/server";

export async function GET() {
	const post = new Post();
	const allPost = post.allTagPost;
	return NextResponse.json({ posts: allPost });
}
