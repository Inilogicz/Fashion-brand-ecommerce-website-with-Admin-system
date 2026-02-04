"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

import { useCart } from "@/context/cart-context";

export function Navbar() {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartCount, setIsCartOpen } = useCart();

    const links = [
        { href: "/shop", label: "Shop" },
        { href: "/collections", label: "Collections" },
        { href: "/story", label: "Story" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-beige/20 bg-cream/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-12">
                {/* Mobile Menu Trigger */}
                <button
                    className="lg:hidden"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6 text-obsidian" />
                    ) : (
                        <Menu className="h-6 w-6 text-obsidian" />
                    )}
                </button>

                {/* Logo */}
                <div className="flex-1 text-center lg:text-left">
                    <Link href="/" className="inline-block">
                        {/* Using mix-blend-multiply assuming the logo is black on white/cream */}
                        <img
                            src="/assets/logo-full.jpg"
                            alt="Dion Luxe"
                            className="h-12 w-auto object-contain mix-blend-multiply"
                        />
                    </Link>
                </div>

                {/* Desktop Links */}
                <div className="hidden lg:flex lg:gap-8">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-cocoa",
                                pathname === link.href ? "text-obsidian" : "text-obsidian/60"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex flex-1 justify-end gap-4">
                    <button className="relative" onClick={() => setIsCartOpen(true)}>
                        <ShoppingBag className="h-5 w-5 text-obsidian" />
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cocoa text-[10px] text-white">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 h-[calc(100vh-4rem)] w-full bg-cream px-6 py-8 lg:hidden">
                    <div className="flex flex-col gap-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-lg font-medium text-obsidian"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
