"use client";

import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ShopClientProps {
    products: any[];
    categories: any[];
    currentCategory: string; // slug
}

export function ShopClient({ products, categories, currentCategory }: ShopClientProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-cream">
            {/* Header */}
            <div className="bg-cream pt-24 pb-12 px-6 border-b border-beige/20">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif text-obsidian mb-4">The Collection</h1>
                    <p className="text-obsidian/60 max-w-2xl mx-auto font-light text-lg">
                        Timeless pieces designed for longevity and effortless elegance.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Filters */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                    <div className="flex flex-wrap justify-center gap-2">
                        <Link href="/shop">
                            <button
                                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${currentCategory === 'all' || !currentCategory
                                        ? "bg-obsidian text-cream"
                                        : "bg-transparent text-obsidian/60 hover:text-obsidian border border-transparent hover:border-obsidian/10"
                                    }`}
                            >
                                All
                            </button>
                        </Link>
                        {categories.map((cat) => (
                            <Link key={cat.id} href={`/shop?category=${cat.slug}`}>
                                <button
                                    className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${currentCategory === cat.slug
                                            ? "bg-obsidian text-cream"
                                            : "bg-transparent text-obsidian/60 hover:text-obsidian border border-transparent hover:border-obsidian/10"
                                        }`}
                                >
                                    {cat.name}
                                </button>
                            </Link>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <Button variant="outline" size="sm" className="gap-2 rounded-full border-obsidian/20 text-obsidian/80">
                            <Filter className="h-4 w-4" /> Filters
                        </Button>
                        <Button variant="outline" size="sm" className="gap-2 rounded-full border-obsidian/20 text-obsidian/80">
                            <SlidersHorizontal className="h-4 w-4" /> Sort
                        </Button>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {products.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={{
                                ...product,
                                image: product.images?.[0] || "/assets/placeholder.jpg",
                                category: product.category?.name || "Collection"
                            }} />
                        </div>
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="text-center py-24 text-obsidian/40">
                        <p>No products found in this category.</p>
                        <Link href="/shop">
                            <Button variant="link" className="mt-4">Clear Filters</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
