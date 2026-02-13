import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = process.env.AUTH_SECRET || "default_super_secret_key_change_me";
const key = new TextEncoder().encode(SECRET_KEY);
const COOKIE_NAME = "admin_session";

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function getAdminSession() {
    console.log("[Edge] getAdminSession called");
    const cookieStore = await cookies();
    const session = cookieStore.get(COOKIE_NAME)?.value;
    console.log(`[Edge] cookie found: ${!!session}`);
    if (!session) return null;
    try {
        const decrypted = await decrypt(session);
        console.log(`[Edge] session decrypted successfully. User: ${decrypted.user.email}`);
        return decrypted;
    } catch (error) {
        console.error("[Edge] session decryption failed:", error);
        return null;
    }
}

export async function updateAdminSession(request: NextRequest) {
    const session = request.cookies.get(COOKIE_NAME)?.value;
    if (!session) return null;

    try {
        // Refresh the session so it doesn't expire
        const parsed = await decrypt(session);
        parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        const res = NextResponse.next();
        res.cookies.set({
            name: COOKIE_NAME,
            value: await encrypt(parsed),
            httpOnly: true,
            expires: parsed.expires,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });
        return res;
    } catch (error) {
        return null; // Invalid session, let middleware handle redirect
    }
}
