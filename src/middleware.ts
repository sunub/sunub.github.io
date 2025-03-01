import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // 이전 URL을 새 구조로 리디렉션
  if (url.pathname.match(/^\/blog\/[^\/]+$/)) {
    const slug = url.pathname.split("/").pop();
    return NextResponse.redirect(new URL(`/post/web/${slug}`, request.url));
  }

  const userAgent = request.headers.get("user-agent") || "";

  if (userAgent.includes("Googlebot") || userAgent.includes("bingbot")) {
    const response = NextResponse.next();
    response.headers.set(
      "X-Robots-Tag",
      "all, max-snippet:-1, max-image-preview:large"
    );
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
