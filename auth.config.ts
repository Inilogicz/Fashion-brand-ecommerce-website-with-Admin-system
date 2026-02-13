import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
        newUser: "/signup", // Redirect here if user needs to sign up? Or maybe just for new users
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnProtected = nextUrl.pathname.startsWith("/checkout") || nextUrl.pathname.startsWith("/account");

            if (isOnProtected) {
                if (!isLoggedIn) return false;
                return true;
            }

            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id as string;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.role = token.role as any;
                session.user.id = (token.id || '') as string;
            }
            return session;
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
