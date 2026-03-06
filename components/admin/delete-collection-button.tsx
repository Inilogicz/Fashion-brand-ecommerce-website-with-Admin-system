"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast"; // missing dependency

export function DeleteCollectionButton({ id }: { id: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onDelete = async () => {
        if (!confirm("Are you sure you want to delete this collection?")) return;

        try {
            setIsLoading(true);
            const res = await fetch(`/api/admin/collections/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                // toast.success("Collection deleted");
                router.refresh();
            } else {
                // toast.error("Failed to delete collection");
                const data = await res.json();
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            disabled={isLoading}
            onClick={onDelete}
            className="p-2 hover:bg-red-50 rounded-full text-red-500/60 hover:text-red-500 transition-colors disabled:opacity-50"
        >
            <Trash className="h-4 w-4" />
        </button>
    );
}
