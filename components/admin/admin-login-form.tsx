"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { loginAdmin } from "@/lib/admin-auth";

export default function AdminLoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || "/admin";
    const [errorMessage, formAction, isPending] = useActionState(
        loginAdmin,
        undefined
    );

    return (
        <form action={formAction} className="space-y-4 animate-fade-in">
            <input type="hidden" name="redirectTo" value={callbackUrl} />
            <div>
                <label className="text-xs font-bold tracking-widest uppercase text-obsidian/60 mb-1 block" htmlFor="email">
                    Email
                </label>
                <input
                    className="flex h-10 w-full rounded-sm border border-beige/20 bg-white px-3 py-2 text-sm placeholder:text-obsidian/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    required
                />
            </div>
            <div>
                <label className="text-xs font-bold tracking-widest uppercase text-obsidian/60 mb-1 block" htmlFor="password">
                    Password
                </label>
                <input
                    className="flex h-10 w-full rounded-sm border border-beige/20 bg-white px-3 py-2 text-sm placeholder:text-obsidian/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                    id="password"
                    type="password"
                    name="password"
                    required
                    minLength={6}
                />
            </div>
            <div className="flex items-center justify-end">
                <Button className="w-full bg-obsidian text-cream hover:bg-cocoa" disabled={isPending}>
                    {isPending ? "Logging in..." : "Log in"}
                </Button>
            </div>
            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <p className="text-sm text-red-500 w-full text-center">{errorMessage}</p>
                )}
            </div>
        </form>
    );
}
