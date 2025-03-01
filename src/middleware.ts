import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { decodeJwt } from "jose";

export async function middleware(request: NextRequest) {
  console.log("MIDDLWWARE: ", request.url);

  if (request.method === "POST") {
    return NextResponse.next();
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("firebaseAuthToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/links", request.url));
  }

  const decodedToken = decodeJwt(token);

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
