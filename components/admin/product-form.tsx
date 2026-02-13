"use client";

import { useState, useActionState } from "react";
import { createProduct, updateProduct } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ImageUpload } from "./image-upload";

export function ProductForm({ categories, product }: { categories: any[], product?: any }) {
    const initialState = { message: "", errors: {} };
    const actionFn = product ? updateProduct.bind(null, product.id) : createProduct;
    const [state, action, isPending] = useActionState(actionFn, initialState);

    // Initialize images state from product or empty array
    const [images, setImages] = useState<string[]>(product?.images || []);

    return (
        <form action={action} className="space-y-6 bg-white p-6 rounded-md border border-beige/20 shadow-sm max-w-2xl">
            <div className="space-y-2">
                <label className="text-sm font-medium text-obsidian">Product Name</label>
                <Input name="name" defaultValue={product?.name || ""} placeholder="E.g. Silk Scarf" required />
                {state?.errors?.name && <p className="text-red-500 text-xs">{state.errors.name}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-obsidian">Description</label>
                <textarea
                    name="description"
                    defaultValue={product?.description || ""}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Product description..."
                    required
                />
                {state?.errors?.description && <p className="text-red-500 text-xs">{state.errors.description}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-obsidian">Price (₦)</label>
                    <Input name="price" type="number" step="0.01" defaultValue={product ? Number(product.price) : ""} placeholder="0.00" required />
                    {state?.errors?.price && <p className="text-red-500 text-xs">{state.errors.price}</p>}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-obsidian">Stock</label>
                    <Input name="stock" type="number" defaultValue={product?.stock || "0"} placeholder="0" required />
                    {state?.errors?.stock && <p className="text-red-500 text-xs">{state.errors.stock}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-obsidian">Sizes (Comma separated)</label>
                <Input name="sizes" defaultValue={product?.sizes?.join(", ") || ""} placeholder="S, M, L, XL" />
                <p className="text-xs text-obsidian/50">Enter default sizes available.</p>
                {state?.errors?.sizes && <p className="text-red-500 text-xs">{state.errors.sizes}</p>}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-obsidian">Category</label>
                <select
                    name="categoryId"
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                    required
                    defaultValue={product?.categoryId || ""}
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {state?.errors?.categoryId && <p className="text-red-500 text-xs">{state.errors.categoryId}</p>}
            </div>

            <div className="space-y-4">
                <label className="text-sm font-medium text-obsidian">Images</label>
                <div className="bg-beige/10 p-4 rounded-md border border-beige/20">
                    <ImageUpload
                        value={images}
                        onChange={(newImages) => setImages(newImages)}
                        onRemove={(urlToRemove) => setImages(images.filter((url) => url !== urlToRemove))}
                    />
                    {/* Hidden input to pass data to server action */}
                    <input type="hidden" name="images" value={images.join(",")} />
                </div>
                {state?.errors?.images && <p className="text-red-500 text-xs">{state.errors.images}</p>}
            </div>

            {state?.message && (
                <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">
                    {state.message}
                </div>
            )}

            <div className="flex justify-end gap-4 pt-4">
                <Link href="/admin/products">
                    <Button variant="outline" type="button">Cancel</Button>
                </Link>
                <Button type="submit" disabled={isPending}>
                    {isPending ? (product ? "Updating..." : "Creating...") : (product ? "Update Product" : "Create Product")}
                </Button>
            </div>
        </form>
    );
}
