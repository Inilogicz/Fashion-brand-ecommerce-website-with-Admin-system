"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackOrder } from "@/lib/order-actions";
import { Loader2, Package, Search } from "lucide-react";
import { useState } from "react";

export default function TrackOrderPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");

    const handleTrack = async (formData: FormData) => {
        setIsLoading(true);
        setError("");
        setResult(null);

        const orderId = formData.get("orderId") as string;
        const email = formData.get("email") as string;

        // Since trackOrder is a server action (if marked 'use server' in file), we can call it. 
        // Wait, I didn't mark lib/order-actions.ts with 'use server'. 
        // I need to fix that or make a real server action file.
        // For now, let's assume I'll add 'use server' to the file or just use API route.
        // Actually, let's just make an API route for tracking specifically: /api/orders/track

        // Revised: simpler to fetch from client.
        try {
            const res = await fetch("/api/orders/track", {
                method: "POST",
                body: JSON.stringify({ orderId, email }),
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to find order");

            setResult(data.order);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-cream py-24 px-6">
            <div className="max-w-xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif text-obsidian mb-4">Track Your Order</h1>
                    <p className="text-obsidian/60 font-light">Enter your order ID and email to check the status of your shipment.</p>
                </div>

                <div className="bg-white p-8 rounded-sm border border-beige/20 shadow-sm mb-12">
                    <form action={handleTrack} className="space-y-6">
                        <div>
                            <label className="text-sm font-medium text-obsidian mb-2 block">Order ID</label>
                            <Input name="orderId" placeholder="e.g. cml..." required className="bg-transparent" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-obsidian mb-2 block">Email Address</label>
                            <Input name="email" type="email" placeholder="email@example.com" required className="bg-transparent" />
                        </div>
                        <Button type="submit" disabled={isLoading} className="w-full bg-obsidian text-cream hover:bg-cocoa h-12">
                            {isLoading ? <Loader2 className="animate-spin h-4 w-4" /> : "Track Order"}
                        </Button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
                </div>

                {result && (
                    <div className="bg-white p-8 rounded-sm border border-green-900/10 shadow-sm animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-900" />
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h3 className="text-xl font-serif text-obsidian mb-1">Order Status</h3>
                                <p className="text-sm text-obsidian/60">Last updated: {new Date(result.updatedAt).toLocaleDateString()}</p>
                            </div>
                            <span className="bg-green-100 text-green-900 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                                {result.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 bg-beige/20 rounded-full flex items-center justify-center">
                                <Package className="h-6 w-6 text-obsidian/60" />
                            </div>
                            <div>
                                <p className="text-sm font-medium">Estimated Delivery</p>
                                <p className="text-sm text-obsidian/60">3-5 Business Days</p>
                            </div>
                        </div>

                        <div className="border-t border-beige/10 pt-6">
                            <h4 className="text-sm font-medium mb-4">Items</h4>
                            {result.items.map((item: any) => (
                                <div key={item.id} className="flex justify-between text-sm mb-2 text-obsidian/70">
                                    <span>{item.quantity}x {item.product.name}</span>
                                    <span>₦{item.price.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
