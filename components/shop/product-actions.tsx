"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
// import { toast } from "sonner"; 
// Actually I don't have sonner installed. I'll just open the cart.

interface ProductActionsProps {
    product: {
        id: string;
        slug: string;
        name: string;
        price: number;
        image: string;
        sizes: string[];
    };
}

export function ProductActions({ product }: ProductActionsProps) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const { addItem } = useCart();

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert("Please select a size."); // Simple alert for now
            return;
        }

        addItem({
            id: product.id,
            slug: product.slug,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            size: selectedSize,
        });
    };

    return (
        <>
            {/* Size Selector */}
            <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-obsidian">Select Size</span>
                    <button className="text-xs text-obsidian/60 underline hover:text-obsidian">Size Guide</button>
                </div>
                <div className="flex gap-3">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`h-12 w-12 flex items-center justify-center border transition-all rounded-sm ${selectedSize === size
                                ? "border-obsidian bg-obsidian text-white"
                                : "border-obsidian/20 text-obsidian hover:border-obsidian"
                                }`}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mb-12">
                <Button
                    onClick={handleAddToCart}
                    className="w-full py-7 text-lg uppercase tracking-widest bg-obsidian hover:bg-cocoa text-cream rounded-none"
                    disabled={!selectedSize}
                >
                    {selectedSize ? `Add to Cart — ₦${product.price.toLocaleString()}` : "Select a Size"}
                </Button>
            </div>
        </>
    );
}
