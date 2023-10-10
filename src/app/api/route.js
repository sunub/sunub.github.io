import Post from "@/utils/post/Post";
import { NextResponse } from "next/server";

const post = new Post();

export function GET() {
	const allPost = post.allTagPost;
	console.log(allPost);
	const posts = {
		allPost,
	};
	return NextResponse.json({ posts });
}

export async function POST(req) {
	const { message } = await req.json();
	console.log(message);
	const text = {
		message: "hello!",
	};
	return NextResponse.json({ text });
}
