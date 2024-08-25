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

  if (
    pathname.startsWith("/_next/image") &&
    pathname.includes("/assets/hero-image__light-moon.avif")
  ) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "public, max-age=31536000");
    return response;
  }

  if (pathname.startsWith("/assets") && pathname.endsWith(".avif")) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "public, max-age=31536000");
    return response;
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
