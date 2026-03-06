"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    ExternalLink,
    Store
} from "lucide-react";
import { logoutAdmin } from "@/lib/admin-auth";

const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Categories", href: "/admin/categories", icon: Package },
    { name: "Collections", href: "/admin/collections", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar({ isOpen, setIsOpen }: { isOpen?: boolean; setIsOpen?: (open: boolean) => void }) {
    const pathname = usePathname();

    const SidebarContent = (
        <div className="flex flex-col h-full">
            <div className="flex h-16 items-center px-6 border-b border-beige/20 bg-cream">
                <span className="text-xl font-serif font-bold text-obsidian tracking-tight">DION <span className="text-cocoa">ADMIN</span></span>
            </div>

            <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen?.(false)}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                                isActive
                                    ? "bg-obsidian text-cream shadow-md"
                                    : "text-obsidian/60 hover:bg-beige/20 hover:text-obsidian"
                            )}
                        >
                            <item.icon className={cn("h-4 w-4", isActive ? "text-cream" : "")} />
                            <span className="flex-1">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-beige/20 flex flex-col gap-2">
                <Link
                    href="/"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-obsidian/60 hover:bg-beige/10 hover:text-obsidian transition-colors"
                >
                    <Store className="h-4 w-4" />
                    View Storefront
                </Link>
                <form action={async () => {
                    await logoutAdmin();
                }}>
                    <button
                        type="submit"
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </form>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 border-r border-beige/20 bg-cream h-screen sticky top-0">
                {SidebarContent}
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsOpen?.(false)}
                />
            )}

            {/* Mobile Sidebar Content */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-cream shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {SidebarContent}
            </aside>
        </>
    );
}

export function AdminHeader({ onMenuClick }: { onMenuClick?: () => void }) {
    const pathname = usePathname();

    // Simple matching
    const currentName = navigation.find((n) => n.href === pathname || (pathname.startsWith(n.href) && n.href !== "/admin"))?.name || "Dashboard";

    return (
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-beige/20 bg-cream/95 backdrop-blur-md px-4 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 -ml-2 rounded-md lg:hidden text-obsidian/60 hover:text-obsidian hover:bg-beige/10 transition-colors"
                    aria-label="Open sidebar"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <h1 className="text-xl font-serif font-medium text-obsidian">
                    {currentName}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end mr-2">
                    <span className="text-sm font-medium text-obsidian">Administrator</span>
                    <span className="text-[10px] text-obsidian/40 uppercase tracking-widest">Global Support</span>
                </div>
                <div className="h-9 w-9 rounded-full bg-obsidian flex items-center justify-center text-cream font-medium text-sm">
                    AD
                </div>
            </div>
        </header>
    );
}
