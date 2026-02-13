"use client";

import { updateOrderStatus } from "@/lib/admin-actions";
import { useTransition } from "react";

export function OrderStatusSelect({ id, currentStatus }: { id: string, currentStatus: string }) {
    const [isPending, startTransition] = useTransition();

    return (
        <select
            defaultValue={currentStatus}
            disabled={isPending}
            onChange={(e) => {
                startTransition(async () => {
                    await updateOrderStatus(id, e.target.value);
                });
            }}
            className="rounded-md border border-beige/30 bg-white px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian"
        >
            <option value="PENDING">Pending</option>
            <option value="PROCESSING">Processing</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="CANCELLED">Cancelled</option>
        </select>
    );
}
