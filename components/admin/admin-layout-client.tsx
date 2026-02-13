"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    MessageSquare,
    Settings,
    LogOut
} from "lucide-react";
import { signOutAction } from "@/lib/auth-actions";

export function AdminSidebar() {
    const pathname = usePathname();

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Categories", href: "/admin/categories", icon: Package }, // Reusing Package icon or maybe List
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <>
            <aside className="w-64 border-r border-beige/20 bg-cream">
                <div className="flex h-16 items-center px-6 border-b border-beige/20">
                    <span className="text-xl font-serif font-bold text-obsidian">Dion Admin</span>
                </div>

                <nav className="flex flex-col gap-1 p-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-beige/20 text-obsidian"
                                        : "text-obsidian/60 hover:bg-beige/10 hover:text-obsidian"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                <span className="flex-1">{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto p-4 border-t border-beige/20">
                    <form action={() => signOutAction()}>
                        <button
                            type="submit"
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
}

export function AdminHeader() {
    const pathname = usePathname();
    const navigation = [
        { name: "Dashboard", href: "/admin" },
        { name: "Products", href: "/admin/products" },
        { name: "Categories", href: "/admin/categories" },
        { name: "Orders", href: "/admin/orders" },
        { name: "Customers", href: "/admin/customers" },
        { name: "Messages", href: "/admin/messages" },
        { name: "Settings", href: "/admin/settings" },
    ];

    // Simple matching or reuse navigation array from sidebar if extracted to constant
    const currentName = navigation.find((n) => n.href === pathname || (pathname.startsWith(n.href) && n.href !== "/admin"))?.name || "Dashboard";

    return (
        <header className="flex h-16 items-center border-b border-beige/20 bg-cream px-6">
            <h1 className="text-lg font-medium text-obsidian">
                {currentName}
            </h1>
        </header>
    );
}
