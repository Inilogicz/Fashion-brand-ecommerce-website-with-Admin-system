import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [product, categories] = await Promise.all([
        prisma.product.findUnique({ where: { id } }),
        prisma.category.findMany({ orderBy: { name: "asc" } }),
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-medium text-obsidian">Edit Product</h2>
                <p className="text-obsidian/60">Update product details.</p>
            </div>

            <ProductForm categories={categories} product={product} />
        </div>
    );
}
