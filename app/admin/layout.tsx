import { auth } from "@/auth";
import { AdminHeader, AdminSidebar } from "@/components/admin/admin-layout-client";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user || session.user.role !== "ADMIN") {
        // Double check: if logged in but not admin, redirect to home.
        // If not logged in at all, middleware should have caught it, but safe to redirect.
        redirect("/");
    }

    return (
        <div className="flex h-screen bg-cream">
            {/* Sidebar Client Component */}
            <AdminSidebar />  {/* Need to ensure this component handles signout correctly */}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <AdminHeader />
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
