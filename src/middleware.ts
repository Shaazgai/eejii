import { NextResponse } from 'next/server';

import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(request) {
    const token = request.nextauth.token;
    const userType = token?.userType;
    const url = new URL(request.url);

    let redirectPath;
    if (
      userType === 'USER_PARTNER' &&
      (url.pathname.startsWith('/s') || url.pathname.startsWith('/v'))
    ) {
      redirectPath = '/p';
    } else if (
      userType === 'USER_VOLUNTEER' &&
      (url.pathname.startsWith('/s') || url.pathname.startsWith('/p'))
    ) {
      redirectPath = '/v';
    } else if (
      userType === 'USER_SUPPORTER' &&
      (url.pathname.startsWith('/v') || url.pathname.startsWith('/p'))
    ) {
      redirectPath = '/s';
    }
    if (redirectPath) {
      const redirectURL = new URL(redirectPath, url.origin);
      return NextResponse.redirect(redirectURL.toString());
    }
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/auth/login',
      error: '/auth/login',
      // newUser: '/signup',
    },
  }
);

export const config = {
  matcher: ['/p', '/p/:path*', '/s', '/s/:path*', '/v', '/v/:path*'],
};
