import { getAdminSession } from "@/lib/admin-auth-edge";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./layout-client";

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAdminSession();

    if (!session) {
        redirect("/admin/login");
    }

    return (
        <AdminLayoutClient session={session}>
            {children}
        </AdminLayoutClient>
    );
}
