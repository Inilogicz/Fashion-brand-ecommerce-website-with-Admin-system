import { Search } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

export default async function AdminCustomersPage() {
    const customers = await prisma.user.findMany({
        where: { role: "USER" },
        include: {
            _count: {
                select: { orders: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-medium text-obsidian">Customers</h2>
                    <p className="text-obsidian/60">View and manage your customer base.</p>
                </div>
            </div>

            <div className="rounded-md border border-beige/20 bg-white">
                <div className="p-4 border-b border-beige/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-obsidian/40" />
                        <input
                            placeholder="Search customers..."
                            className="w-full pl-9 h-9 rounded-md border border-beige/30 bg-cream/20 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian"
                        />
                    </div>
                </div>
                <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b [&_tr]:border-beige/10">
                            <tr className="border-b border-beige/10 transition-colors hover:bg-beige/5 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-obsidian/60">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-obsidian/60">Email</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-obsidian/60">Orders</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-obsidian/60">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {customers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-obsidian/50">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                customers.map((customer) => (
                                    <tr key={customer.id} className="border-b border-beige/10 transition-colors hover:bg-beige/5">
                                        <td className="p-4 align-middle font-medium text-obsidian">{customer.name || "N/A"}</td>
                                        <td className="p-4 align-middle text-obsidian">{customer.email}</td>
                                        <td className="p-4 align-middle text-obsidian">{customer._count.orders}</td>
                                        <td className="p-4 align-middle text-obsidian">{new Date(customer.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
