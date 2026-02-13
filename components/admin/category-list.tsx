"use client";

import { deleteCategory } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export function CategoryList({ categories }: { categories: any[] }) {
    return (
        <div className="space-y-2">
            {categories.length === 0 ? (
                <p className="text-sm text-neutral-500">No categories found.</p>
            ) : (
                categories.map((category) => (
                    <CategoryItem key={category.id} category={category} />
                ))
            )}
        </div>
    );
}

function CategoryItem({ category }: { category: any }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => {
        if (confirm("Are you sure? This cannot be undone.")) {
            startTransition(async () => {
                await deleteCategory(category.id);
            });
        }
    };

    return (
        <div className="flex items-center justify-between rounded-md border border-neutral-200 bg-white p-3">
            <div>
                <p className="font-medium">{category.name}</p>
                <p className="text-xs text-neutral-500">{category._count?.products || 0} products</p>
            </div>
            <Button
                variant="ghost"
                size="icon"
                onClick={handleDelete}
                disabled={isPending}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    );
}
