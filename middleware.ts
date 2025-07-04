// export const config = {
//   matcher: ['/home/:path*'], // not /
// }
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn =
    request.cookies.get('next-auth.session-token') ||
    request.cookies.get('__Secure-next-auth.session-token')

  const isAuthPage = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'

  // If not logged in and not on login/register => redirect to /register
  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL('/register', request.url))
  }

  // If logged in and accessing login/register => redirect to home
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/home/:path*', '/movie/:path*', '/favorites', '/login', '/register'],
}
