"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { encrypt } from "./admin-auth-edge";

const COOKIE_NAME = "admin_session";

export async function loginAdmin(prevState: string | undefined, formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const redirectTo = formData.get("redirectTo") as string | undefined;

    if (!email || !password) {
        return "Please provide both email and password.";
    }

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || user.role !== "ADMIN") {
            return "Invalid credentials.";
        }

        if (!user.password) {
            return "Invalid credentials.";
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return "Invalid credentials.";
        }

        // Create the session
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const session = await encrypt({ user: { id: user.id, email: user.email, name: user.name, role: user.role }, expires });

        // Save the session in a cookie
        (await cookies()).set(COOKIE_NAME, session, { expires, httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });

    } catch (error) {
        console.error("Admin Login Error:", error);
        return "Something went wrong.";
    }

    redirect(redirectTo || "/admin");
}

export async function logoutAdmin() {
    // Destroy the session
    (await cookies()).set(COOKIE_NAME, "", { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/" });
    redirect("/admin/login");
}
