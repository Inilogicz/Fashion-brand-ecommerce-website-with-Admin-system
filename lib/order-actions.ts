import { prisma } from "@/lib/db";
import { cache } from "react";

export const getOrderById = cache(async (orderId: string) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: { items: { include: { product: true } } }
        });

        if (!order) return null;

        // Serialize decimal/date
        return {
            ...order,
            total: Number(order.total),
            createdAt: order.createdAt.toISOString(),
            updatedAt: order.updatedAt.toISOString(),
            items: order.items.map(item => ({
                ...item,
                price: Number(item.price),
                product: {
                    ...item.product,
                    price: Number(item.product.price),
                    createdAt: item.product.createdAt.toISOString(),
                    updatedAt: item.product.updatedAt.toISOString(),
                }
            }))
        };
    } catch (error) {
        console.error("Failed to fetch order:", error);
        return null;
    }
});

export const trackOrder = async (orderId: string, email: string) => {
    try {
        // Try finding by full ID first, or "contains" if we want flexible search, but exact is safer for privacy
        const order = await prisma.order.findFirst({
            where: {
                id: orderId, // Strict ID match
                guestEmail: email
            },
            include: { items: { include: { product: true } } }
        });

        if (!order) return { error: "Order not found" };

        return {
            order: {
                ...order,
                total: Number(order.total),
                createdAt: order.createdAt.toISOString(),
                updatedAt: order.updatedAt.toISOString(),
                items: order.items.map(item => ({
                    ...item,
                    price: Number(item.price),
                    product: {
                        ...item.product,
                        price: Number(item.product.price),
                    }
                }))
            }
        };
    } catch (error) {
        return { error: "Failed to track order" };
    }
};
