import { prisma } from "@/lib/db";
import { ProductForm } from "@/components/admin/product-form";

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-medium text-obsidian">Add New Product</h2>
                <p className="text-obsidian/60">Create a new product in your catalog.</p>
            </div>

            <ProductForm categories={categories} />
        </div>
    );
}
