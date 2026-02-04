"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // TODO: Integrate Server Action
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1500);
    }

    if (isSent) {
        return (
            <div className="text-center space-y-6 animate-fade-in">
                <div className="flex justify-center flex-col items-center">
                    <CheckCircle2 className="h-12 w-12 text-green-800 mb-4" />
                    <h1 className="text-2xl font-serif text-obsidian">Check your email</h1>
                </div>
                <p className="text-sm text-obsidian/60">
                    We have sent a password reset link to your email address.
                </p>
                <div className="pt-4">
                    <Link href="/login">
                        <Button variant="outline" className="w-full h-12 border-obsidian text-obsidian hover:bg-obsidian hover:text-white">
                            Back to Login
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif text-obsidian">Reset Password</h1>
                <p className="text-sm text-obsidian/60">Enter your email to receive a reset link</p>
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

                <Button disabled={isLoading} className="w-full h-12 bg-obsidian hover:bg-cocoa text-cream uppercase tracking-widest">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Reset Link
                </Button>
            </form>

            <div className="text-center text-sm pt-4">
                <Link href="/login" className="text-obsidian/60 hover:text-obsidian hover:underline underline-offset-4 flex items-center justify-center gap-1">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
