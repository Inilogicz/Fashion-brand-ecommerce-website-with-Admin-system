"use client";

import { useState, useActionState } from "react";
import { createCollection, updateCollection } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ImageUpload } from "./image-upload";
import { Check, X } from "lucide-react";

export function CollectionForm({ products, collection }: { products: any[], collection?: any }) {
    const initialState = { message: "", errors: {} };
    const actionFn = collection ? updateCollection.bind(null, collection.id) : createCollection;
    const [state, action, isPending] = useActionState(actionFn, initialState);

    // Initialize state from collection or empty values
    const [imageUrl, setImageUrl] = useState<string>(collection?.image || "");
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>(
        collection?.products?.map((p: any) => p.id) || []
    );

    const toggleProduct = (productId: string) => {
        if (selectedProductIds.includes(productId)) {
            setSelectedProductIds(selectedProductIds.filter(id => id !== productId));
        } else {
            setSelectedProductIds([...selectedProductIds, productId]);
        }
    };

    return (
        <form action={action} className="space-y-8 bg-white p-8 rounded-xl border border-beige/20 shadow-sm max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Side: Basic Info */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-obsidian">Collection Name</label>
                        <Input
                            name="name"
                            defaultValue={collection?.name || ""}
                            placeholder="E.g. Midnight Ops"
                            className="bg-cream/20 border-beige/30 focus:border-obsidian transition-colors"
                            required
                        />
                        {state?.errors?.name && <p className="text-red-500 text-xs mt-1">{state.errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-obsidian">Description</label>
                        <textarea
                            name="description"
                            defaultValue={collection?.description || ""}
                            className="flex min-h-[120px] w-full rounded-md border border-beige/30 bg-cream/20 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian transition-all"
                            placeholder="Detail the narrative of this collection..."
                        />
                        {state?.errors?.description && <p className="text-red-500 text-xs mt-1">{state.errors.description}</p>}
                    </div>

                    <div className="flex items-center gap-3 bg-beige/10 p-4 rounded-lg border border-beige/20">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            id="isFeatured"
                            defaultChecked={collection?.isFeatured}
                            className="h-4 w-4 rounded border-beige/30 text-obsidian focus:ring-obsidian"
                        />
                        <label htmlFor="isFeatured" className="text-sm font-medium text-obsidian cursor-pointer select-none">
                            Feature this collection on the homepage
                        </label>
                    </div>
                </div>

                {/* Right Side: Image and Meta */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-obsidian">Cover Image</label>
                        <div className="bg-beige/10 p-4 rounded-lg border border-beige/20 min-h-[200px] flex items-center justify-center">
                            <ImageUpload
                                value={imageUrl ? [imageUrl] : []}
                                onChange={(urls) => setImageUrl(urls[0] || "")}
                                onRemove={() => setImageUrl("")}
                            />
                            {/* Hidden input to pass data to server action */}
                            <input type="hidden" name="image" value={imageUrl} />
                        </div>
                        <p className="text-[10px] text-obsidian/40 uppercase tracking-widest mt-2">Recommended: 1200x1600px portrait</p>
                    </div>
                </div>
            </div>

            {/* Product Selection */}
            <div className="space-y-4 pt-4 border-t border-beige/10">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-obsidian">Select Products ({selectedProductIds.length})</label>
                    <p className="text-xs text-obsidian/50 italic">Click products to add or remove them from this collection</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[400px] overflow-y-auto p-2 bg-cream/20 rounded-lg border border-beige/10">
                    {products.map((product) => {
                        const isSelected = selectedProductIds.includes(product.id);
                        return (
                            <button
                                key={product.id}
                                type="button"
                                onClick={() => toggleProduct(product.id)}
                                className={`group relative aspect-[3/4] rounded-md overflow-hidden border-2 transition-all duration-300 ${isSelected
                                        ? "border-cocoa ring-2 ring-cocoa/20"
                                        : "border-transparent grayscale hover:grayscale-0 hover:border-beige/50"
                                    }`}
                            >
                                {product.images?.[0] ? (
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-beige/20 flex items-center justify-center text-[10px] text-obsidian/40 uppercase">No Img</div>
                                )}
                                <div className={`absolute inset-0 bg-black/40 transition-opacity flex items-center justify-center ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-10'}`}>
                                    {isSelected ? <Check className="text-white h-8 w-8" /> : null}
                                </div>
                                <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm p-2 text-left">
                                    <p className="text-[10px] font-bold text-obsidian truncate">{product.name}</p>
                                    <p className="text-[8px] text-obsidian/60 tracking-wider">₦{Number(product.price).toLocaleString()}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
                {/* Hidden input for selected products */}
                <input type="hidden" name="productIds" value={selectedProductIds.join(",")} />
            </div>

            {state?.message && (
                <div className={`p-4 rounded-xl text-sm border ${state.message.includes("Error") ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100"}`}>
                    {state.message}
                </div>
            )}

            <div className="flex justify-end gap-4 pt-6 border-t border-beige/10">
                <Link href="/admin/collections">
                    <Button variant="outline" type="button" className="px-8 border-beige/30 hover:bg-beige/10">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isPending} className="bg-obsidian text-cream hover:bg-cocoa px-10 transition-colors">
                    {isPending ? (collection ? "Updating..." : "Creating...") : (collection ? "Update Collection" : "Create Collection")}
                </Button>
            </div>
        </form>
    );
}
