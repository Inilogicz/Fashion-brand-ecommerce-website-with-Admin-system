import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
        newUser: "/signup", // Redirect here if user needs to sign up? Or maybe just for new users
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith("/admin") && nextUrl.pathname !== "/admin/login";
            const isOnProtected = nextUrl.pathname.startsWith("/checkout") || nextUrl.pathname.startsWith("/account");

            if (isOnAdmin) {
                if (!isLoggedIn) {
                    // Redirect unauthenticated users to login page
                    return false;
                }

                return true; // Login check handled above, role check handled in middleware
            }

            if (isOnProtected) {
                if (!isLoggedIn) return false;
                return true;
            }

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
