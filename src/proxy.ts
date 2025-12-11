import { auth } from '@/auth';
import { AppRoutes } from '@/lib/routes';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isAuthRoute =
    nextUrl.pathname.startsWith(AppRoutes.auth.login) ||
    nextUrl.pathname.startsWith(AppRoutes.auth.register);

  const isPublicRoute = isAuthRoute;

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL(AppRoutes.app.root, nextUrl));
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(AppRoutes.auth.login, nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
