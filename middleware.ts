import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/" ||
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname === "/auth/newUser" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next")
  ) {
    return NextResponse.next();
  }

  if (req.auth?.user && !req.auth.user.username) {
    console.log("Redirecting to new user page because username is not set");
    const newUrl = new URL("/auth/newUser", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  if (req.auth?.user) {
    return NextResponse.next();
  }

  const newUrl = new URL("/", req.nextUrl.origin);
  return NextResponse.redirect(newUrl);
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
export const runtime = "nodejs";
