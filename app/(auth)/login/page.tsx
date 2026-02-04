"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // TODO: Integrate Server Action for Login
        setTimeout(() => {
            setIsLoading(false);
            // alert("Login Logic Placeholder");
        }, 2000);
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif text-obsidian">Welcome Back</h1>
                <p className="text-sm text-obsidian/60">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Input
                        id="email"
                        placeholder="Email address"
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        required
                        className="bg-white border-beige/20 h-12"
                    />
                </div>
                <div className="space-y-2">
                    <Input
                        id="password"
                        placeholder="Password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="bg-white border-beige/20 h-12"
                    />
                </div>

                <div className="flex items-center justify-end">
                    <Link href="/forgot-password" className="text-xs text-obsidian/60 hover:text-obsidian underline-offset-4 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <Button disabled={isLoading} className="w-full h-12 bg-obsidian hover:bg-cocoa text-cream uppercase tracking-widest">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign In
                </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-obsidian/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-cream px-2 text-obsidian/40">Or</span>
                </div>
            </div>

            <div className="text-center text-sm">
                <span className="text-obsidian/60">Don&apos;t have an account? </span>
                <Link href="/signup" className="font-medium text-obsidian hover:underline underline-offset-4">
                    Create an account
                </Link>
            </div>
        </div>
    );
}
