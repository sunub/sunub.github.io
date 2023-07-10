let category = "all";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json(JSON.stringify(category));
}

export async function POST(req: Request) {
	const changedCateory = await req.json();
	category = changedCateory;
	return NextResponse.json(JSON.stringify(category));
}
