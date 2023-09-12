import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
    // newUser: '/signup',
  },
});

export const config = { matcher: ['/v', '/v/:path*'] };
