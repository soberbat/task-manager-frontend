import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const cookie = request.cookies.get("connect.sid");
  const pathName = request.nextUrl.pathname;

  if (pathName.startsWith("/signup") || pathName.startsWith("/login")) {
    if (cookie) {
      const destinationUrl = new URL("/", new URL(request.url).origin);
      const response = NextResponse.redirect(destinationUrl);
      return response;
    }
  } else {
    if (!cookie) {
      const destinationUrl = new URL("/signup", new URL(request.url).origin);
      const response = NextResponse.redirect(destinationUrl);
      return response;
    }
  }
}

export const config = {
  matcher: ["/", "/signup", "/login"],
};
