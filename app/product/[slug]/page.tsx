import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/shop/product-actions";

// Mock Data (duplicated from shop for now, ideally in a lib or DB)
const MOCK_PRODUCTS = [
    {
        id: "1",
        name: "Obsidian Trench Coat",
        price: 850,
        category: "Outerwear",
        slug: "obsidian-trench-coat",
        image: "/assets/brand-campaign-1.jpg",
        description: "A masterclass in tailoring. The Obsidian Trench Coat is crafted from premium Italian wool blend, featuring a structured silhouette that commands attention while remaining effortlessly understated. Finished with horn buttons and a silk lining.",
        sizes: ["S", "M", "L", "XL"],
    },
    {
        id: "2",
        name: "Silk Essence Dress",
        price: 450,
        category: "Dresses",
        slug: "silk-essence-dress",
        image: "/assets/brand-campaign-2.jpg",
        description: "Fluidity in motion. This pure silk slip dress drapes elegantly against the body, offering a lustrous sheen and unparalleled comfort. Designed for evening soirées or elevated daywear.",
        sizes: ["XS", "S", "M", "L"],
    },
    {
        id: "3",
        name: "Minimalist Leather Tote",
        price: 320,
        category: "Accessories",
        slug: "minimalist-leather-tote",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=1000&auto=format&fit=crop",
        description: "Function meets form. Crafted from full-grain vegetable-tanned leather, this tote features a spacious interior and minimal hardware. It develops a unique patina over time.",
        sizes: ["One Size"],
    },
    // ... add others if needed, for now just handling cases to not crash
];

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = MOCK_PRODUCTS.find((p) => p.slug === slug);

    if (!product) {
        // Fallback for demo purposes if not in map
        if (slug) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-cream">
                    <div className="text-center">
                        <h1 className="text-2xl font-serif text-obsidian mb-4">Product Not Found</h1>
                        <p className="mb-6 text-obsidian/60">We couldn't find the product you're looking for.</p>
                        <Link href="/shop">
                            <Button>Back to Shop</Button>
                        </Link>
                    </div>
                </div>
            )
        }
        return notFound();
    }

    return (
        <div className="min-h-screen bg-cream pt-10 pb-24">
            <div className="container mx-auto px-6">

                {/* Breadcrumb / Back */}
                <div className="mb-12">
                    <Link href="/shop" className="inline-flex items-center text-sm text-obsidian/60 hover:text-obsidian transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Collection
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Image Gallery (Left) */}
                    <div className="space-y-4">
                        <div className="relative aspect-[3/4] w-full overflow-hidden bg-beige/20 rounded-sm">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        {/* Thumbnail grid would go here */}
                    </div>

                    {/* Product Info (Right) */}
                    <div className="flex flex-col justify-center">
                        <span className="text-sm uppercase tracking-widest text-[#C2A891] mb-2">{product.category}</span>
                        <h1 className="text-4xl md:text-5xl font-serif text-obsidian mb-6">{product.name}</h1>
                        <p className="text-2xl font-light text-obsidian mb-8">₦{product.price.toLocaleString()}</p>

                        <div className="prose prose-stone prose-lg text-obsidian/70 font-light mb-10">
                            <p>{product.description}</p>
                        </div>

                        <ProductActions product={product} />

                        {/* Value Props */}
                        <div className="grid grid-cols-2 gap-6 pt-8 border-t border-beige/30">
                            <div className="flex items-start gap-4">
                                <Truck className="h-6 w-6 text-cocoa" />
                                <div>
                                    <h4 className="font-medium text-obsidian text-sm">Free Global Shipping</h4>
                                    <p className="text-xs text-obsidian/60 mt-1">On all orders over ₦50,000</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <ShieldCheck className="h-6 w-6 text-cocoa" />
                                <div>
                                    <h4 className="font-medium text-obsidian text-sm">Secure Payment</h4>
                                    <p className="text-xs text-obsidian/60 mt-1">Encrypted transactions</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
