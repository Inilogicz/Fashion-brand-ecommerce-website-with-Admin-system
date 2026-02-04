"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const COLLECTIONS = [
    {
        id: "midnight-ops",
        title: "Midnight Ops",
        description: "A dark, tactical exploration of urban luxury. Featuring structured coats, utility detailing, and pure obsidian palettes.",
        image: "/assets/brand-campaign-1.jpg", // Placeholder
        href: "/shop?category=Outerwear" // Linking to shop filter for now
    },
    {
        id: "silk-route",
        title: "The Silk Route",
        description: "Flowing silhouettes and ethical silk. A soft rebellion against the rigid.",
        image: "/assets/brand-campaign-2.jpg", // Placeholder
        href: "/shop?category=Dresses"
    },
    {
        id: "essential-form",
        title: "Essential Form",
        description: "The foundations of a modern wardrobe. Perfect knits, tailored trousers, and timeless accessories.",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
        href: "/shop?category=Bottoms"
    }
];

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-cream">
            {/* Header */}
            <div className="pt-24 pb-16 px-6 border-b border-beige/20 text-center">
                <h1 className="text-4xl md:text-6xl font-serif text-obsidian mb-6">Curated Collections</h1>
                <p className="text-obsidian/60 max-w-xl mx-auto font-light text-lg">
                    Distinct narratives woven into every garment.
                    Explore our seasonal edits.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 space-y-24">
                {COLLECTIONS.map((collection, index) => (
                    <div key={collection.id} className={`flex flex-col gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                        {/* Image Side */}
                        <div className="w-full lg:w-1/2">
                            <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige/20">
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left lg:px-12">
                            <span className="text-sm uppercase tracking-widest text-[#C2A891] mb-4 block">Collection 00{index + 1}</span>
                            <h2 className="text-4xl md:text-5xl font-serif text-obsidian mb-6">{collection.title}</h2>
                            <p className="text-lg font-light text-obsidian/70 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                                {collection.description}
                            </p>
                            <Link href={collection.href}>
                                <Button className="gap-2 px-8 py-6 text-base tracking-widest bg-transparent border border-obsidian text-obsidian hover:bg-obsidian hover:text-white transition-colors duration-300">
                                    View Collection <ArrowRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom CTA */}
            <div className="py-24 px-6 text-center border-t border-beige/20 bg-[#F9F7F2]">
                <h2 className="text-3xl font-serif text-obsidian mb-6">Looking for something specific?</h2>
                <Link href="/shop">
                    <Button className="bg-cocoa text-cream hover:bg-cocoa/90 px-10 py-4 h-auto text-lg">
                        View Compete Catalog
                    </Button>
                </Link>
            </div>
        </div>
    );
}
