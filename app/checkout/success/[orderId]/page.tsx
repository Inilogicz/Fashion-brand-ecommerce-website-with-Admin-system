import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/ui/copy-button";
import { getOrderById } from "@/lib/order-actions";
import { Check, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { verifyPayment } from "@/lib/payment-actions";

export default async function OrderSuccessPage({ params, searchParams }: { params: Promise<{ orderId: string }>, searchParams: Promise<{ reference?: string }> }) {
    const { orderId } = await params;
    const { reference } = await searchParams;

    // Verify payment if reference exists
    if (reference) {
        await verifyPayment(reference);
    }

    const order = await getOrderById(orderId);

    if (!order) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center animate-fade-in">
            <div className="h-20 w-20 bg-green-900 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-green-900/20">
                <Check className="h-10 w-10 text-white" />
            </div>

            <span className="text-xs font-bold tracking-widest text-obsidian/40 uppercase mb-4">Order Confirmed</span>
            <h1 className="text-4xl font-serif text-obsidian mb-4">Thank you, {order.firstName}.</h1>

            <div className="text-obsidian/60 mb-8 max-w-md text-lg font-light flex flex-col items-center gap-2">
                <span>We've received your order</span>
                <CopyButton value={order.id} className="font-mono text-xs h-auto py-2 px-4 shadow-sm w-full max-w-[280px] break-all" />
                <span>and sent a confirmation email to {order.guestEmail}.</span>
            </div>

            <div className="bg-white p-6 rounded-sm border border-beige/20 w-full max-w-md mb-8 text-left">
                <h3 className="text-sm font-medium text-obsidian mb-4 border-b border-beige/10 pb-2">Order Details</h3>
                <div className="space-y-4">
                    {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                            <span className="text-obsidian/70">{item.product.name} <span className="text-xs">x{item.quantity}</span></span>
                            <span className="font-medium text-obsidian">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    ))}
                    <div className="border-t border-beige/10 pt-2 flex justify-between font-medium text-obsidian mt-2">
                        <span>Total</span>
                        <span>₦{order.total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <Link href="/shop">
                    <Button variant="default" className="bg-obsidian text-cream hover:bg-cocoa h-12 px-8">
                        Continue Shopping
                    </Button>
                </Link>
                <Link href="/track-order">
                    <Button variant="outline" className="h-12 px-8 border-obsidian/20 text-obsidian hover:border-obsidian">
                        Track Order
                    </Button>
                </Link>
            </div>
        </div>
    );
}
