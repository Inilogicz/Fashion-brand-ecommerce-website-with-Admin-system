"use client";

import { deleteProduct } from "@/lib/admin-actions";
import { Trash } from "lucide-react";
import { useTransition } from "react";

export function DeleteProductButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <button
            onClick={() => {
                if (confirm("Are you sure you want to delete this product?")) {
                    startTransition(async () => {
                        await deleteProduct(id);
                    });
                }
            }}
            disabled={isPending}
            className="p-2 hover:bg-red-50 rounded-full text-obsidian/60 hover:text-red-600 disabled:opacity-50"
            title="Delete Product"
        >
            <Trash className="h-4 w-4" />
        </button>
    );
}
