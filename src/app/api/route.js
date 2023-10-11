import Post from "@/utils/post/Post";
import { NextResponse } from "next/server";

const post = new Post();

export function GET() {
	const allPost = post.allTagPost;
	const posts = {
		allPost,
	};
	return NextResponse.json({ posts });
}
