"use client";

import { useActionState } from "react";
import { createCategory } from "@/lib/admin-actions"; // Ensure this matches export
import { Button } from "@/components/ui/button";

export function CategoryForm() {
    const initialState = { message: null, errors: {} };
    // @ts-ignore
    const [state, dispatch, isPending] = useActionState(createCategory, initialState);

    return (
        <form action={dispatch} className="space-y-4 rounded-md border border-neutral-200 bg-white p-4">
            <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                    id="name"
                    name="name"
                    required
                    className="flex h-10 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium">Description</label>
                <textarea
                    id="description"
                    name="description"
                    className="flex h-20 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm"
                />
            </div>
            {state?.message && <p className="text-sm text-red-500">{state.message}</p>}
            <Button type="submit" disabled={isPending}>
                {isPending ? "Adding..." : "Add Category"}
            </Button>
        </form>
    );
}
