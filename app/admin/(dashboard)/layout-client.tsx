"use client";

import { AdminHeader, AdminSidebar } from "@/components/admin/admin-layout-client";
import { useState } from "react";

export default function AdminLayoutClient({
    children,
    session,
}: {
    children: React.ReactNode;
    session: any;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-cream overflow-hidden">
            {/* Sidebar Component */}
            <AdminSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

            {/* Main Content */}
            <div className="flex flex-1 flex-col min-w-0">
                <AdminHeader onMenuClick={() => setIsSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto focus:outline-none">
                    <div className="p-4 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
