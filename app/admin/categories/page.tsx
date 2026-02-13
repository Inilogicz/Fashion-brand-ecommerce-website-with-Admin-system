import { prisma } from "@/lib/db";
import { CategoryForm } from "@/components/admin/category-form";
import { CategoryList } from "@/components/admin/category-list";

export const dynamic = 'force-dynamic';

export default async function CategoriesPage() {
    const categories = await prisma.category.findMany({
        orderBy: { name: "asc" },
        include: { _count: { select: { products: true } } }
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-medium text-obsidian">Categories</h2>
                <p className="text-obsidian/60">Manage product categories.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <h3 className="mb-4 text-xl font-medium">Add New Category</h3>
                    <CategoryForm />
                </div>
                <div>
                    <h3 className="mb-4 text-xl font-medium">Existing Categories</h3>
                    <CategoryList categories={categories} />
                </div>
            </div>
        </div>
    );
}
