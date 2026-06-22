import { NextResponse } from "next/server";

// Pages that require login
const PROTECTED_ROUTES = [
  "/dashboard",
  "/profile",
  "/orders",
  "/checkout",
  "/cart",
  "/wishlist",
];
const AUTH_ROUTES = ["/login", "/register", "/forgot-password"];
const ADMIN_RESTRICTED_ROUTES = [
  "/orders/my-orders",
  "/cart",
  "/checkout",
  "/wishlist",
];

// Pages that logged-in users shouldn't see
// If a logged-in user visits these, redirect them to dashboard.

function matchesRoute(pathname, routes) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
}

// Middleware

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const userRole = request.cookies.get("userRole")?.value;
  const isLoggedIn = !!userRole;

  const isProtected = matchesRoute(pathname, PROTECTED_ROUTES);
  const isAuthRoute = matchesRoute(pathname, AUTH_ROUTES);
  const isAdminRestricted = matchesRoute(pathname, ADMIN_RESTRICTED_ROUTES);

  // 1. Not logged in → trying to access a protected page → send to login
  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", request.url);
    // Preserve where they were trying to go so we can redirect back after login
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Logged in → trying to access login/register → send to dashboard
  if (isAuthRoute && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 4. Admin → trying to access user-only routes → send to dashboard
  if (isAdminRestricted && userRole === "admin") {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  // 3. Everything else → let through
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
