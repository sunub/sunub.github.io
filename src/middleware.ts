import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  return NextResponse.next({
    status: 200,
    headers: {
      "Cache-Control": "no-cache",
    },
  });
}
