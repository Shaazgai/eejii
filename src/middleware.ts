import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/signin',
    error: '/signin',
    // newUser: '/signup',
  },
});

export const config = { matcher: ['/v', '/v/:path*'] };
