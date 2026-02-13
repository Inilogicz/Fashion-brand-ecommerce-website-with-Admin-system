import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/shop/product-actions";
import { getProductBySlug } from "@/lib/shop-actions";
import { ProductGallery } from "@/components/shop/product-gallery";

export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProductBySlug(slug);

    if (!product) {
        return notFound();
    }

    // Map DB product to the shape expected by UI/Actions
    // Note: DB has images[], UI mostly uses one image for main view currently
    const mainImage = product.images?.[0] || "/assets/placeholder.jpg";
    const price = Number(product.price);

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
                    <ProductGallery images={product.images} name={product.name} />

                    {/* Product Info (Right) */}
                    <div className="flex flex-col justify-center">
                        <span className="text-sm uppercase tracking-widest text-[#C2A891] mb-2">
                            {product.category?.name || "Collection"}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif text-obsidian mb-6">{product.name}</h1>
                        <p className="text-2xl font-light text-obsidian mb-8">₦{price.toLocaleString()}</p>

                        <div className="prose prose-stone prose-lg text-obsidian/70 font-light mb-10">
                            <p>{product.description}</p>
                        </div>

                        <ProductActions product={{
                            id: product.id,
                            slug: product.slug,
                            name: product.name,
                            price: price,
                            image: mainImage,
                            sizes: product.sizes
                        }} />

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
