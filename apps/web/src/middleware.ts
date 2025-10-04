import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Check if the request URL contains localhost
  const isLocalhost = request.url.includes('localhost');

  if (isLocalhost) {
    // Set isDevMode cookie if we're on localhost
    response.cookies.set('isDevMode', 'true', {
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
      sameSite: 'lax',
    });
  } else {
    // Remove isDevMode cookie if not on localhost
    response.cookies.delete('isDevMode');
  }

  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
