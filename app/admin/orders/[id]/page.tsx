import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { OrderStatusSelect } from "@/components/admin/order-status-select";

export const dynamic = 'force-dynamic';

const formatPrice = (amount: number | string) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(Number(amount));
};

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            user: true,
            items: {
                include: {
                    product: true,
                },
            },
        },
    });

    if (!order) notFound();

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-medium text-obsidian">Order Details</h2>
                <p className="text-obsidian/60">Order ID: {order.id}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                {/* Order Info */}
                <div className="space-y-6">
                    <div className="rounded-md border border-beige/20 bg-white p-6 shadow-sm">
                        <h3 className="font-serif font-medium text-obsidian mb-4">Summary</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-obsidian/60">Date Placed</span>
                                <span className="text-obsidian">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-obsidian/60">Total Amount</span>
                                <span className="font-medium text-obsidian">{formatPrice(order.total.toString())}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-obsidian/60">Status</span>
                                <OrderStatusSelect id={order.id} currentStatus={order.status} />
                            </div>
                            <div className="flex justify-between">
                                <span className="text-obsidian/60">Payment Status</span>
                                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${order.paymentStatus === "PAID" ? "bg-green-50 text-green-700" :
                                    order.paymentStatus === "FAILED" ? "bg-red-50 text-red-700" :
                                        "bg-yellow-50 text-yellow-700"
                                    }`}>
                                    {order.paymentStatus}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-md border border-beige/20 bg-white p-6 shadow-sm">
                        <h3 className="font-serif font-medium text-obsidian mb-4">Customer Info</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-obsidian/60">Name</span>
                                <span className="text-obsidian">{order.user?.name || (order.firstName ? `${order.firstName} ${order.lastName}` : "Guest")}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-obsidian/60">Email</span>
                                <span className="text-obsidian">{order.user?.email || order.guestEmail}</span>
                            </div>
                            {/* Assuming address is stored somewhere, maybe user profile or shipping address json in order? using user address for now if available */}
                            {order.user?.address && (
                                <div className="flex justify-between">
                                    <span className="text-obsidian/60">Address</span>
                                    <span className="text-obsidian text-right">{order.user.address}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Items */}
                <div className="rounded-md border border-beige/20 bg-white p-6 shadow-sm h-fit">
                    <h3 className="font-serif font-medium text-obsidian mb-4">Items</h3>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between border-b border-beige/10 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    {/* Placeholder image or actual product image if available */}
                                    <div className="h-12 w-12 rounded-md bg-beige/20 flex-shrink-0" />
                                    <div>
                                        <p className="text-sm font-medium text-obsidian">{item.product.name}</p>
                                        <p className="text-xs text-obsidian/50">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-obsidian">{formatPrice(item.price.toString())}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
