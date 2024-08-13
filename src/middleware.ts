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

  const response = NextResponse.next({
    status: 200,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
  response.headers.delete("x-powerd-by");
  return response;
}
