import { Button } from "@/components/ui/button";
import { Search, Eye } from "lucide-react";

const ORDERS = [
    { id: "ORD-001", customer: "Alice Smith", date: "Oct 24, 2023", total: "₦1,350,000", status: "Paid", fulfillment: "Fulfilled" },
    { id: "ORD-002", customer: "Bob Jones", date: "Oct 24, 2023", total: "₦450,000", status: "Paid", fulfillment: "Processing" },
    { id: "ORD-003", customer: "Charlie Brown", date: "Oct 23, 2023", total: "₦920,000", status: "Pending", fulfillment: "Unfulfilled" },
    { id: "ORD-004", customer: "Diana Prince", date: "Oct 21, 2023", total: "₦2,100,000", status: "Paid", fulfillment: "Fulfilled" },
];

export default function AdminOrdersPage() {
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
                            <TableHead>Payment</TableHead>
                            <TableHead>Fulfillment</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ORDERS.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell className="font-medium">{order.id}</TableCell>
                                <TableCell>{order.customer}</TableCell>
                                <TableCell>{order.date}</TableCell>
                                <TableCell>{order.total}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.status === "Paid" ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
                                        }`}>
                                        {order.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.fulfillment === "Fulfilled" ? "bg-blue-50 text-blue-700" :
                                        order.fulfillment === "Processing" ? "bg-yellow-50 text-yellow-700" : "bg-gray-100 text-gray-700"
                                        }`}>
                                        {order.fulfillment}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
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

function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
    return <th className={`h-12 px-4 text-left align-middle font-medium text-obsidian/60 [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>
}

function TableCell({ children, className }: { children: React.ReactNode, className?: string }) {
    return <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 text-obsidian ${className}`}>{children}</td>
}
