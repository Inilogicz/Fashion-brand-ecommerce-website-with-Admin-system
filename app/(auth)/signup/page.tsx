"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsLoading(true);

        // TODO: Integrate Server Action for Signup
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-serif text-obsidian">Create Account</h1>
                <p className="text-sm text-obsidian/60">Join to access exclusive collections</p>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        id="firstName"
                        placeholder="First Name"
                        type="text"
                        required
                        className="bg-white border-beige/20 h-12"
                    />
                    <Input
                        id="lastName"
                        placeholder="Last Name"
                        type="text"
                        required
                        className="bg-white border-beige/20 h-12"
                    />
                </div>
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
                        required
                        className="bg-white border-beige/20 h-12"
                    />
                    <p className="text-[10px] text-obsidian/40 px-1">Must be at least 8 characters.</p>
                </div>

                <Button disabled={isLoading} className="w-full h-12 bg-obsidian hover:bg-cocoa text-cream uppercase tracking-widest">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Join Dion Luxe
                </Button>
            </form>

            <div className="text-center text-sm">
                <span className="text-obsidian/60">Already have an account? </span>
                <Link href="/login" className="font-medium text-obsidian hover:underline underline-offset-4">
                    Sign In
                </Link>
            </div>
        </div>
    );
}
