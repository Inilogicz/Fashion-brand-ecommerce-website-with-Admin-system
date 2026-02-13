"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { ArrowLeft, Lock, CreditCard, ShoppingBag, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "@/hooks/use-paystack";

import { AuthModal } from "@/app/checkout/auth-modal";

export default function CheckoutInner({ user }: { user?: any }) {
    const { items, cartTotal, clearCart } = useCart();
    const router = useRouter();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [orderId, setOrderId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        email: user?.email || "",
        firstName: user?.name?.split(" ")[0] || "",
        lastName: user?.name?.split(" ").slice(1).join(" ") || "",
        address: user?.address || "",
        city: user?.city || "",
        zip: user?.zip || "",
        phone: user?.phone || "",
    });

    if (!user) {
        return <AuthModal />;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContinueToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const createOrder = async () => {
        setIsLoading(true);
        setError("");

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map(item => ({
                        id: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        size: item.size
                    })),
                    total: cartTotal,
                    ...formData
                }),
            });

            if (!res.ok) throw new Error("Failed to create order");

            const data = await res.json();
            setOrderId(data.orderId);
            // No return needed, useEffect will handle payment trigger
        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    // Paystack Config
    const config = {
        reference: (new Date()).getTime().toString(),
        email: formData.email,
        amount: cartTotal * 100, // Paystack uses kobo
        metadata: {
            custom_fields: [
                {
                    display_name: "Order ID",
                    variable_name: "order_id",
                    value: orderId || "", // Ensure string
                },
                {
                    display_name: "Customer Name",
                    variable_name: "customer_name",
                    value: `${formData.firstName} ${formData.lastName}`,
                },
            ]
        },
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
    };

    const initializePayment = usePaystackPayment({
        ...config,
        publicKey: config.publicKey // Ensure prop name matches
    });

    const onSuccess = (reference: any) => {
        // Verify payment on server (optional for MVP, usually required)
        // For now, redirect to success
        console.log("Payment successful, reference:", reference);
        clearCart();
        const successUrl = `/checkout/success/${orderId}?reference=${reference.reference}`;
        console.log("Redirecting to:", successUrl);
        router.push(successUrl);
        // Fallback if router doesn't work immediately (rare but possible in some contexts)
        setTimeout(() => {
            window.location.href = successUrl;
        }, 1000);
    };

    const onClose = () => {
        setIsLoading(false);
        alert("Payment cancelled.");
    };

    // Auto-trigger payment when orderId is set
    useEffect(() => {
        if (orderId && initializePayment) {
            initializePayment({ onSuccess, onClose });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId, initializePayment]);

    if (items.length === 0 && !orderId) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-serif text-obsidian mb-4">Your bag is empty</h1>
                <Link href="/shop">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-cream lg:grid lg:grid-cols-2 lg:overflow-hidden">
            {/* Left Column: Form */}
            <div className="px-6 py-12 lg:px-16 lg:overflow-y-auto max-h-screen">
                <div className="max-w-lg mx-auto">
                    <div className="mb-8">
                        <Link href="/shop" className="inline-flex items-center text-sm text-obsidian/60 hover:text-obsidian transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Return to Shop
                        </Link>
                    </div>

                    <h1 className="text-3xl font-serif text-obsidian mb-8">Checkout</h1>

                    <div className="flex items-center gap-2 mb-8 text-sm">
                        <span className={step >= 1 ? "text-obsidian font-medium" : "text-obsidian/40"}>Shipping</span>
                        <span className="text-obsidian/20">/</span>
                        <span className={step >= 2 ? "text-obsidian font-medium" : "text-obsidian/40"}>Payment</span>
                    </div>

                    {step === 1 && (
                        <form onSubmit={handleContinueToPayment} className="space-y-6 animate-fade-in">
                            <div>
                                <h2 className="text-lg font-medium text-obsidian mb-4">Contact Information</h2>
                                <Input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>

                            <div>
                                <h2 className="text-lg font-medium text-obsidian mb-4">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        required
                                        name="firstName"
                                        placeholder="First name"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        required
                                        name="lastName"
                                        placeholder="Last name"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        required
                                        name="address"
                                        placeholder="Address"
                                        className="col-span-2"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        required
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        required
                                        name="zip"
                                        placeholder="ZIP / Postal code"
                                        value={formData.zip}
                                        onChange={handleChange}
                                    />
                                    <Input
                                        required
                                        name="phone"
                                        placeholder="Phone number"
                                        className="col-span-2"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full py-6 mt-4">
                                Continue to Payment
                            </Button>
                        </form>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="bg-white p-4 rounded-sm border border-beige/20 text-sm">
                                <div className="flex justify-between py-2 border-b border-beige/10">
                                    <span className="text-obsidian/60">Contact</span>
                                    <span className="text-obsidian">{formData.email}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-beige/10">
                                    <span className="text-obsidian/60">Ship to</span>
                                    <span className="text-obsidian">{formData.address}, {formData.city}</span>
                                </div>
                                <div className="flex justify-between py-2">
                                    <span className="text-obsidian/60">Method</span>
                                    <span className="text-obsidian">Standard Shipping (Free)</span>
                                </div>
                            </div>


                            <div>
                                <h2 className="text-lg font-medium text-obsidian mb-4">Payment</h2>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-4 rounded-sm text-sm mb-4 border border-red-100">
                                        {error}
                                    </div>
                                )}

                                <p className="text-sm text-obsidian/60 mb-4 flex items-center gap-2">
                                    <Lock className="h-3 w-3" /> All transactions are secure and encrypted.
                                </p>

                                <div className="border border-obsidian/20 rounded-sm p-4 bg-white/50">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="font-medium text-obsidian">Paystack</span>
                                        <CreditCard className="h-5 w-5 text-obsidian/60" />
                                    </div>
                                    <p className="text-sm text-obsidian/60 mb-4">
                                        You will be redirected to Paystack to complete your purchase securely.
                                    </p>

                                    {!orderId ? (
                                        <Button
                                            onClick={createOrder}
                                            className="w-full py-6 bg-green-900 hover:bg-green-800 text-white"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                `Pay ₦${cartTotal.toLocaleString()}`
                                            )}
                                        </Button>
                                    ) : (
                                        <div className="w-full">
                                            {/* Button is now fallback or hidden, but keeping as manual retry */}
                                            <Button
                                                onClick={() => initializePayment({ onSuccess, onClose })}
                                                className="w-full py-4 bg-green-900 hover:bg-green-800 text-white font-medium rounded-md transition-colors"
                                            >
                                                Pay Now
                                            </Button>
                                            <p className="text-xs text-center mt-2 text-obsidian/40">Redirecting to payment...</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button onClick={() => { setStep(1); setOrderId(null); }} className="text-sm text-obsidian/60 underline hover:text-obsidian">
                                Back to shipping
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="bg-[#F9F7F2] px-6 py-12 lg:px-16 border-l border-beige/20 hidden lg:block lg:overflow-y-auto max-h-screen">
                <div className="max-w-md">
                    <div className="space-y-6 mb-8">
                        {items.map((item) => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                                <div className="relative h-16 w-16 bg-white border border-beige/20 rounded-sm overflow-hidden shrink-0">
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-obsidian/80 text-white text-[10px] flex items-center justify-center rounded-full">
                                        {item.quantity}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-obsidian text-sm">{item.name}</h4>
                                    <p className="text-xs text-obsidian/60">{item.size}</p>
                                </div>
                                <p className="text-sm font-medium text-obsidian">₦{(item.price * item.quantity).toLocaleString()}</p>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-beige/20 pt-6 space-y-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-obsidian/60">Subtotal</span>
                            <span className="font-medium text-obsidian">₦{cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-obsidian/60">Shipping</span>
                            <span className="font-medium text-obsidian">Free</span>
                        </div>
                    </div>

                    <div className="border-t border-beige/20 pt-6 mt-6 flex justify-between items-center">
                        <span className="text-lg font-serif text-obsidian">Total</span>
                        <div className="text-right">
                            <span className="text-xs text-obsidian/40 block">NGN</span>
                            <span className="text-2xl font-serif font-bold text-obsidian">₦{cartTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Order Summary Toggle */}
            <div className="lg:hidden bg-[#F9F7F2] p-6 border-b border-beige/20 order-first">
                <div className="flex justify-between items-center">
                    <span className="font-serif text-obsidian flex items-center gap-2">
                        <ShoppingBag className="h-4 w-4" /> Order Summary
                    </span>
                    <span className="font-bold text-obsidian">₦{cartTotal.toLocaleString()}</span>
                </div>
            </div>
        </div>
    );
}
