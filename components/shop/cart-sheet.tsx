"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function CartDrawer() {
    const { items, removeItem, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl border-l border-beige/20"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-beige/20 bg-cream">
                            <h2 className="text-lg font-serif text-obsidian flex items-center gap-2">
                                <ShoppingBag className="h-5 w-5" />
                                Your Bag
                            </h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="rounded-full p-2 text-obsidian/60 hover:bg-beige/20 hover:text-obsidian transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto px-6 py-4">
                            {items.length === 0 ? (
                                <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                                    <ShoppingBag className="h-12 w-12 text-obsidian/20" />
                                    <p className="text-lg font-medium text-obsidian/60">Your bag is empty.</p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4"
                                    >
                                        Continue Shopping
                                    </Button>
                                </div>
                            ) : (
                                <ul className="space-y-6">
                                    {items.map((item) => (
                                        <li key={`${item.id}-${item.size}`} className="flex gap-4">
                                            <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-beige/20 rounded-sm">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            <div className="flex flex-1 flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="text-base font-medium text-obsidian line-clamp-2">{item.name}</h3>
                                                        <button
                                                            onClick={() => removeItem(item.id, item.size)}
                                                            className="text-obsidian/40 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                    <p className="text-sm text-obsidian/60 mt-1">Size: {item.size}</p>
                                                    <p className="text-sm font-medium text-obsidian mt-1">₦{item.price.toLocaleString()}</p>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        className="h-6 w-6 flex items-center justify-center rounded-full border border-obsidian/20 text-obsidian/60 hover:border-obsidian hover:text-obsidian transition-colors"
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                    </button>
                                                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        className="h-6 w-6 flex items-center justify-center rounded-full border border-obsidian/20 text-obsidian/60 hover:border-obsidian hover:text-obsidian transition-colors"
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {items.length > 0 && (
                            <div className="border-t border-beige/20 bg-cream p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-base font-medium text-obsidian">Subtotal</span>
                                    <span className="text-lg font-serif font-bold text-obsidian">₦{cartTotal.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-obsidian/50 mb-6 text-center">Shipping and taxes calculated at checkout.</p>
                                <Button className="w-full py-6 text-base bg-obsidian hover:bg-cocoa uppercase tracking-widest text-cream">
                                    Checkout
                                </Button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
