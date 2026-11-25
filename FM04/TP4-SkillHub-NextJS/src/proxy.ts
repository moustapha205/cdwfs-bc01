import { NextResponse, type NextRequest } from "next/server";

export function proxy(requete: NextRequest) {
  if (!requete.cookies.has("session")) {
    return NextResponse.redirect(new URL("/connexion", requete.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/mon-espace/:path*"] };
