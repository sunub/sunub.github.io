import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(req: Request) {
  return NextResponse.json("HI");
}

export async function PUT(req: Request) {
  return NextResponse.json({ data: "searchData" }, { status: 200 });
}
export async function POST(req: Request) {
  const body = await req.json();

  return new Response(body, { status: 200 });
}
