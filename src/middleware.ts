import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const cookie = request.cookies.get("connect.sid");

  // if (!cookie) {
  //   const destinationUrl = new URL("/employee", new URL(request.url).origin);
  //   const response = NextResponse.redirect(destinationUrl);
  //   return response;
  // }
}

export const config = {
  matcher: "/",
};
