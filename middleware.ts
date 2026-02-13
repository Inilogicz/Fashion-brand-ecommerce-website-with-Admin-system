import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import { updateAdminSession } from "./lib/admin-auth-edge";
import { jwtVerify } from "jose";

const { auth } = NextAuth(authConfig);

const SECRET_KEY = process.env.AUTH_SECRET || "default_super_secret_key_change_me";
const key = new TextEncoder().encode(SECRET_KEY);

async function verifyAdminSession(request: NextRequest) {
    const session = request.cookies.get("admin_session")?.value;
    if (!session) return null;
    try {
        const { payload } = await jwtVerify(session, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export default auth(async (req) => {
    const { nextUrl } = req;

    // Admin Route Protection
    if (nextUrl.pathname.startsWith('/admin')) {
        const adminSession = await verifyAdminSession(req);
        const isLoginPage = nextUrl.pathname === '/admin/login';

        if (isLoginPage) {
            if (adminSession) {
                return NextResponse.redirect(new URL('/admin', nextUrl));
            }
            return NextResponse.next();
        }

        if (!adminSession) {
            const loginUrl = new URL('/admin/login', nextUrl);
            loginUrl.searchParams.set('callbackUrl', nextUrl.href);
            return NextResponse.redirect(loginUrl);
        }

        return await updateAdminSession(req)!;
    }

    // Existing User Auth Logic (simplified as Admin is now separate)
    const isLoggedIn = !!req.auth;
    const isAuthRoute = nextUrl.pathname === '/login' || nextUrl.pathname === '/signup';
    const isProtectedRoute = nextUrl.pathname.startsWith('/checkout') || nextUrl.pathname.startsWith('/account');

    if (isAuthRoute) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL('/', nextUrl));
        }
        return NextResponse.next();
    }

    if (isProtectedRoute) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/login', nextUrl));
        }
    }

    return NextResponse.next();
});

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
