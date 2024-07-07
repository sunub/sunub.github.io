import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/api") {
    return NextResponse.next({
      status: 200,
      headers: {
        "Cache-Control": "no-cache",
      },
    });
  }

  return NextResponse.next({
    status: 200,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
}
