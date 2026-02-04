"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";
import { ArrowLeft, Check, Lock, CreditCard, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, cartTotal, clearCart } = useCart();
    const [step, setStep] = useState(1); // 1: Info, 2: Payment, 3: Success
    const [isLoading, setIsLoading] = useState(false);

    // Mock Form State
    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zip: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleContinueToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(2);
    };

    const handlePayment = async () => {
        setIsLoading(true);
        // Simulate Paystack processing
        setTimeout(() => {
            setIsLoading(false);
            setStep(3);
            clearCart();
        }, 2000);
    };

    if (items.length === 0 && step !== 3) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-2xl font-serif text-obsidian mb-4">Your bag is empty</h1>
                <Link href="/shop">
                    <Button>Return to Shop</Button>
                </Link>
            </div>
        );
    }

    if (step === 3) {
        return (
            <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6 text-center">
                <div className="h-16 w-16 bg-green-900 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-serif text-obsidian mb-2">Order Confirmed</h1>
                <p className="text-obsidian/60 mb-8 max-w-md">
                    Thank you, {formData.firstName}. We've received your order and will send a confirmation email to {formData.email} shortly.
                </p>
                <Link href="/shop">
                    <Button>Continue Shopping</Button>
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
                                    <Button
                                        onClick={handlePayment}
                                        className="w-full py-6 bg-green-900 hover:bg-green-800 text-white"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Processing..." : `Pay ₦${cartTotal.toLocaleString()}`}
                                    </Button>
                                </div>
                            </div>

                            <button onClick={() => setStep(1)} className="text-sm text-obsidian/60 underline hover:text-obsidian">
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

            {/* Mobile Order Summary Toggle (simplified for minimal MVP, usually collapsible) */}
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
