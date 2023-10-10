import { FRONTMATTERS } from "@/utils/post/frontMatters";
import { NextResponse } from "next/server";

export async function GET() {
	const frontMatters = FRONTMATTERS;
	return NextResponse.json({ frontMatters });
}
