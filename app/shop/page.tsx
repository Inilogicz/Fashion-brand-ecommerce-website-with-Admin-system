"use client";

import { useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";

// Mock Data
const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "Obsidian Trench Coat",
        price: 850,
        category: "Outerwear",
        slug: "obsidian-trench-coat",
        image: "/assets/brand-campaign-1.jpg", // Using asset as placeholder
    },
    {
        id: "2",
        name: "Silk Essence Dress",
        price: 450,
        category: "Dresses",
        slug: "silk-essence-dress",
        image: "/assets/brand-campaign-2.jpg",
    },
    {
        id: "3",
        name: "Minimalist Leather Tote",
        price: 320,
        category: "Accessories",
        slug: "minimalist-leather-tote",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "4",
        name: "Cashmere Turtleneck",
        price: 290,
        category: "Knitwear",
        slug: "cashmere-turtleneck",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "5",
        name: "Tailored Wool Trousers",
        price: 350,
        category: "Bottoms",
        slug: "tailored-wool-trousers",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: "6",
        name: "Signature Derby Shoes",
        price: 550,
        category: "Footwear",
        slug: "signature-derby-shoes",
        image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?q=80&w=1000&auto=format&fit=crop",
    }
];

const CATEGORIES = ["All", "Outerwear", "Dresses", "Knitwear", "Bottoms", "Accessories", "Footwear"];

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredProducts = selectedCategory === "All"
        ? MOCK_PRODUCTS
        : MOCK_PRODUCTS.filter(p => p.category === selectedCategory);

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
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-sm px-4 py-2 rounded-full transition-all duration-300 ${selectedCategory === cat
                                        ? "bg-obsidian text-cream"
                                        : "bg-transparent text-obsidian/60 hover:text-obsidian border border-transparent hover:border-obsidian/10"
                                    }`}
                            >
                                {cat}
                            </button>
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
                    {filteredProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-24 text-obsidian/40">
                        <p>No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
