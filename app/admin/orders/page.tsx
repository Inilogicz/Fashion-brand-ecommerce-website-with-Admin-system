import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

// Helper to format currency
const formatPrice = (amount: number | string) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(Number(amount));
};

export default async function AdminOrdersPage() {
    const orders = await prisma.order.findMany({
        include: {
            user: true,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-medium text-obsidian">Orders</h2>
                    <p className="text-obsidian/60">View and manage customer orders.</p>
                </div>
            </div>

            <div className="rounded-md border border-beige/20 bg-white">
                <div className="p-4 border-b border-beige/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-obsidian/40" />
                        <input
                            placeholder="Search orders..."
                            className="w-full pl-9 h-9 rounded-md border border-beige/30 bg-cream/20 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian"
                        />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center text-obsidian/50" colSpan={7}>
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id.slice(-6).toUpperCase()}</TableCell>
                                    <TableCell>
                                        <div>
                                            <p className="font-medium">{order.user?.name || (order.firstName ? `${order.firstName} ${order.lastName}` : "Guest")}</p>
                                            <p className="text-xs text-obsidian/50">{order.user?.email || order.guestEmail}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{formatPrice(order.total.toString())}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.status === "DELIVERED" ? "bg-green-50 text-green-700" :
                                            order.status === "CANCELLED" ? "bg-red-50 text-red-700" :
                                                order.status === "SHIPPED" ? "bg-blue-50 text-blue-700" :
                                                    "bg-yellow-50 text-yellow-700"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.paymentStatus === "PAID" ? "bg-green-50 text-green-700" :
                                            order.paymentStatus === "FAILED" ? "bg-red-50 text-red-700" :
                                                "bg-yellow-50 text-yellow-700"
                                            }`}>
                                            {order.paymentStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/orders/${order.id}`}>
                                            <Button variant="ghost" size="icon">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

// Reusing Table Components (Should imply they are global or imported, but defining here for speed in this context)
function Table({ children }: { children: React.ReactNode }) {
    return <div className="w-full overflow-auto"><table className="w-full caption-bottom text-sm">{children}</table></div>
}

function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="[&_tr]:border-b [&_tr]:border-beige/10">{children}</thead>
}

function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
}

function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="border-b border-beige/10 transition-colors hover:bg-beige/5 data-[state=selected]:bg-muted">{children}</tr>
}

function TableHead({ children, className }: { children: React.ReactNode, className?: string, colSpan?: number }) {
    return <th colSpan={className?.includes("colSpan") ? undefined : undefined} className={`h-12 px-4 text-left align-middle font-medium text-obsidian/60 [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>
}

function TableCell({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) {
    return <td colSpan={colSpan} className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 text-obsidian ${className}`}>{children}</td>
}
