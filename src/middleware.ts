import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const AUTH_COOKIE_NAME = "admin_session";
const JWT_SECRET = process.env.JWT_SECRET || "modern-it-portfolio-secret-key-change-in-production-32bytes-min";
const secretKey = new TextEncoder().encode(JWT_SECRET);

async function isTokenValid(token?: string): Promise<boolean> {
  if (!token) return false;
  try {
    await jwtVerify(token, secretKey);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
    const authenticated = await isTokenValid(token);

    const isAuthRoute =
      pathname === "/admin/login" || pathname === "/admin/register";

    if (!authenticated && !isAuthRoute) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (authenticated && isAuthRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    if (authenticated && (pathname === "/admin" || pathname === "/admin/")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
