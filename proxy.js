import { NextResponse } from "next/server";

// Pages that require login
const PROTECTED_ROUTES = ["/dashboard", "/profile", "/orders"];

// Pages that logged-in users shouldn't see
// If a logged-in user visits these, redirect them to dashboard.
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];

function matchesRoute(pathname, routes) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

// Middleware

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  const isProtected = matchesRoute(pathname, PROTECTED_ROUTES);
  const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES);

  // 1. Not logged in → trying to access a protected page → send to login
  if (isProtected && !accessToken) {
    const loginUrl = new URL("/login", request.url);
    // Preserve where they were trying to go so we can redirect back after login
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Logged in → trying to access login/register → send to dashboard
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 3. Everything else → let through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
