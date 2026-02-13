"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    slug: string;
}

interface ProductCardProps {
    product: Product;
    priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
    return (
        <Link href={`/product/${product.slug}`} className="group block h-full">
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige/20">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className={cn(
                        "object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                        priority ? "opacity-100" : "opacity-0 transition-opacity duration-500" // Simple placeholder handling
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                    onLoad={(event) => {
                        const img = event.target as HTMLImageElement;
                        img.classList.remove("opacity-0");
                    }}
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/5" />

                {/* Quick Add (Optional - maybe just visual for now) */}
                <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white/90 p-3 text-center transition-transform duration-300 group-hover:translate-y-0 backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-widest text-obsidian font-medium">View Details</span>
                </div>
            </div>

            <div className="mt-4 flex flex-col items-center text-center">
                <h3 className="text-md font-medium text-obsidian font-serif tracking-tight">{product.name}</h3>
                <p className="mt-1 text-sm text-obsidian/60">₦{product.price.toLocaleString()}</p>
            </div>
        </Link>
    );
}
