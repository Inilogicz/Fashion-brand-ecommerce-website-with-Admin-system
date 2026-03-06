import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getCollections } from "@/lib/shop-actions";

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
    const collections = await getCollections();

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
                {collections.length === 0 ? (
                    <div className="py-24 text-center">
                        <p className="text-obsidian/40 italic">New collections coming soon.</p>
                        <Link href="/shop" className="text-cocoa hover:underline mt-4 inline-block tracking-widest text-sm uppercase">Explore all products</Link>
                    </div>
                ) : (
                    collections.map((collection: any, index: number) => (
                        <div key={collection.id} className={`flex flex-col gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
                            {/* Image Side */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige/20 shadow-xl">
                                    {collection.image ? (
                                        <Image
                                            src={collection.image}
                                            alt={collection.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 hover:scale-105"
                                            sizes="(max-width: 1024px) 100vw, 50vw"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-obsidian/20 font-serif text-2xl uppercase tracking-tighter">
                                            {collection.name}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content Side */}
                            <div className="w-full lg:w-1/2 text-center lg:text-left lg:px-12">
                                <span className="text-sm uppercase tracking-widest text-[#C2A891] mb-4 block">Collection 00{index + 1}</span>
                                <h2 className="text-4xl md:text-5xl font-serif text-obsidian mb-6">{collection.name}</h2>
                                <p className="text-lg font-light text-obsidian/70 mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                                    {collection.description || "Experimental narratives and silhouettes designed for the contemporary explorer."}
                                </p>
                                <Link href={`/shop?collection=${collection.slug}`}>
                                    <Button className="gap-2 px-8 py-6 text-base tracking-widest bg-transparent border border-obsidian text-obsidian hover:bg-obsidian hover:text-white transition-colors duration-300">
                                        View Collection <ArrowRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Bottom CTA */}
            <div className="py-24 px-6 text-center border-t border-beige/20 bg-[#F9F7F2]">
                <h2 className="text-3xl font-serif text-obsidian mb-6">Looking for something specific?</h2>
                <Link href="/shop">
                    <Button className="bg-cocoa text-cream hover:bg-cocoa/90 px-10 py-4 h-auto text-lg">
                        View Complete Catalog
                    </Button>
                </Link>
            </div>
        </div>
    );
}
