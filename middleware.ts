import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const user = req.auth?.user;

    const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth');
    const isAuthRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/signup' || nextUrl.pathname === '/auth/login' || nextUrl.pathname === '/auth/signup' || nextUrl.pathname === '/admin/login';
    const isAdminRoute = nextUrl.pathname.startsWith('/admin') && nextUrl.pathname !== '/admin/login';

    if (isApiAuthRoute) {
        return NextResponse.next();
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            // Redirect to dashboard or home if already logged in
            // Adjust redirection based on role?
            if (user?.role === 'ADMIN') {
                return NextResponse.redirect(new URL('/admin', nextUrl));
            }
            if (nextUrl.pathname === '/admin/login') {
                // If logged in, redirect to admin dashboard. 
                // The Admin Layout will handle role verification and kick back non-admins.
                return NextResponse.redirect(new URL('/admin', nextUrl));
            }
            return NextResponse.redirect(new URL('/', nextUrl));
        }
        return NextResponse.next();
    }

    if (isAdminRoute) {
        if (!isLoggedIn) {
            const loginUrl = new URL('/admin/login', nextUrl);
            loginUrl.searchParams.set('callbackUrl', nextUrl.href);
            return NextResponse.redirect(loginUrl);
        }
        // Role verification moved to Admin Layout because req.auth.user.role 
        // is not reliably available in Edge Middleware context.
    }

    return NextResponse.next();
});

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
