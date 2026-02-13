import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { orderId, email } = await req.json();

        if (!orderId || !email) {
            return NextResponse.json({ error: "Order ID and Email are required" }, { status: 400 });
        }

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                guestEmail: email
            },
            include: { items: { include: { product: true } } }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        // Serialize
        const serialized = {
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
        };

        return NextResponse.json({ order: serialized });
    } catch (error) {
        console.error("Tracking error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
