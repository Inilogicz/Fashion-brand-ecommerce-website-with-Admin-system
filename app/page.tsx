"use client";

import { Hero } from "@/components/shop/hero";
import { ProductCard } from "@/components/shop/product-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

// Mock Data for Home Page (Subset)
const FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Obsidian Trench Coat",
    price: 850,
    category: "Outerwear",
    slug: "obsidian-trench-coat",
    image: "/assets/brand-campaign-1.jpg",
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
];

const COLLECTIONS = [
  {
    title: "Midnight Ops",
    image: "/assets/brand-campaign-1.jpg",
    href: "/collections",
  },
  {
    title: "The Silk Route",
    image: "/assets/brand-campaign-2.jpg",
    href: "/collections",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-cream selection:bg-cocoa selection:text-cream">
      <Hero />

      {/* New Arrivals Section */}
      <section className="py-32 bg-cream relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center justify-center mb-16 text-center"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-cocoa mb-4 block">Essentials</span>
            <h2 className="text-4xl md:text-5xl font-serif text-obsidian mb-6">New Arrivals</h2>
            <div className="h-px w-24 bg-obsidian/10" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURED_PRODUCTS.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/shop">
              <Button variant="outline" className="px-10 py-6 border-obsidian/20 hover:border-obsidian text-obsidian gap-2">
                View All Arrivals <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections / Marqueeish Layout */}
      <section className="py-24 bg-[#F9F7F2] border-y border-beige/20">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-[0.2em] text-cocoa mb-4 block">Campaign</span>
              <h2 className="text-5xl md:text-6xl font-serif text-obsidian mb-8 leading-tight">
                The Modern <br /> Uniform
              </h2>
              <p className="text-lg font-light text-obsidian/70 mb-8 max-w-md leading-relaxed">
                Elevated staples for the contemporary lifestyle.
                Merging utility with uncompromising luxury.
              </p>
              <Link href="/collections">
                <Button className="bg-obsidian text-cream px-8 py-6 uppercase tracking-widest text-xs hover:bg-cocoa">
                  Explore Campaign
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative aspect-[3/4] bg-beige/20 overflow-hidden mt-12"
              >
                <Image src={COLLECTIONS[0].image} alt="Collection 1" fill className="object-cover transition-transform duration-700 hover:scale-105" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="relative aspect-[3/4] bg-beige/20 overflow-hidden mb-12"
              >
                <Image src={COLLECTIONS[1].image} alt="Collection 2" fill className="object-cover transition-transform duration-700 hover:scale-105" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy / Story Teaser */}
      <section className="py-32 bg-obsidian text-cream relative overflow-hidden">
        {/* Background pattern or subtle texture could go here */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Star className="h-8 w-8 text-cocoa mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              "Luxury is not about price. <br /> It's about value."
            </h2>
            <p className="text-lg md:text-xl font-light text-cream/60 max-w-2xl mx-auto mb-12">
              We believe in creating pieces that last. Designs that transcend seasons.
              Quality that speaks for itself without shouting.
            </p>
            <Link href="/story" className="inline-block border-b border-cream/30 pb-1 text-sm uppercase tracking-widest hover:border-cream hover:text-white transition-all">
              Read Our Story
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
