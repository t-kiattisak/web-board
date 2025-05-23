import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { NextFetchEvent, NextRequest, NextResponse } from "next/server"

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req })
  const isAuthenticated = !!token

  if (req.nextUrl.pathname.startsWith("/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/login`,
    },
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return authMiddleware(req, event)
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|icons|public|login$|$|post/.*).*)",
  ],
}
