export { default } from 'next-auth/middleware';

// Stop Middleware running on static files
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
