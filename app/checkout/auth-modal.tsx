"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";

export function AuthModal() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/40 backdrop-blur-sm p-4">
            <div className="bg-cream w-full max-w-md p-8 rounded-sm shadow-xl border border-beige/20 text-center animate-fade-in">
                <div className="flex justify-center mb-6">
                    <div className="h-16 w-16 bg-obsidian/5 rounded-full flex items-center justify-center">
                        <Lock className="h-8 w-8 text-obsidian/60" />
                    </div>
                </div>

                <h2 className="text-2xl font-serif text-obsidian mb-2">Account Required</h2>
                <p className="text-obsidian/60 mb-8">
                    To ensure a secure checkout experience, please sign in or create an account to continue.
                </p>

                <div className="space-y-4">
                    <Link href="/login?redirectTo=/checkout" className="block w-full">
                        <Button className="w-full py-6 bg-obsidian hover:bg-cocoa text-cream">
                            Sign In
                        </Button>
                    </Link>

                    <Link href="/signup?redirectTo=/checkout" className="block w-full">
                        <Button variant="outline" className="w-full py-6 border-obsidian/20 text-obsidian hover:border-obsidian hover:bg-transparent">
                            Create Account
                        </Button>
                    </Link>
                </div>

                <div className="mt-8 pt-6 border-t border-beige/10">
                    <Link href="/shop" className="text-sm text-obsidian/40 underline hover:text-obsidian transition-colors">
                        Return to Shop
                    </Link>
                </div>
            </div>
        </div>
    );
}
