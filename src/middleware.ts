import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: ['/', '/sign-in', '/api/webhooks/user', '/register/volunteer'],
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     * - public folder
     * - public folder
     */
    '/((?!static|.*\\..*|_next|favicon.ico).*)',
    '/api/webhooks/user',
  ],
};
