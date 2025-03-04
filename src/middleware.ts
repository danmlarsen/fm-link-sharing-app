import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (
    token &&
    (request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register"))
  ) {
    return NextResponse.redirect(new URL("/links", request.url));
  }

  const decodedToken = decodeJwt(token);

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/links", "/profile", "/login", "/register", "/logout"],
};
