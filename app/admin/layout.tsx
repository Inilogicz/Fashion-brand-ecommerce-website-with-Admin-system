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

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const navigation = [
        { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: Package },
        { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
        { name: "Customers", href: "/admin/customers", icon: Users },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare }, // Added as per user request
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-cream">
            {/* Sidebar */}
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
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto p-4 border-t border-beige/20">
                    <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="flex h-16 items-center border-b border-beige/20 bg-cream px-6">
                    <h1 className="text-lg font-medium text-obsidian">
                        {navigation.find((n) => n.href === pathname)?.name || "Dashboard"}
                    </h1>
                </header>
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
