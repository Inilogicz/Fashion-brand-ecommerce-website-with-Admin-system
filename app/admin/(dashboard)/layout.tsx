import { getAdminSession } from "@/lib/admin-auth-edge";
import { AdminHeader, AdminSidebar } from "@/components/admin/admin-layout-client";
import { redirect } from "next/navigation";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAdminSession();

    if (!session) {
        // console.log("Layout: No session found");
        redirect("/admin/login");
    } else {
        // console.log(`Layout: Session found for ${session.user.email}`);
    }

    return (
        <div className="flex h-screen bg-cream">
            {/* Sidebar Client Component */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {!session && <div className="bg-red-500 text-white p-2 text-center">DEBUG: Layout says NO SESSION</div>}
                <AdminHeader />
                <div className="p-6">
                    {children}
                </div>
            </main>
        </div>
    );
}
