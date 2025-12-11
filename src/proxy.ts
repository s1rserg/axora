import createMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { AppRoutes } from '@/lib/routes';
import { routing } from '@/i18n';

const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAuthRoute =
    nextUrl.pathname.includes(AppRoutes.auth.login) ||
    nextUrl.pathname.includes(AppRoutes.auth.register);

  const isPublicRoute = isAuthRoute;

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(AppRoutes.app.root, nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(AppRoutes.auth.login, nextUrl));
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
