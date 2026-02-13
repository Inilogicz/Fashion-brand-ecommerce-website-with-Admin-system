import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const orderSchema = z.object({
    items: z.array(z.object({
        id: z.string(),
        quantity: z.number().min(1),
        price: z.number(),
        size: z.string().optional(),
    })),
    total: z.number(),
    email: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    phone: z.string(),
    address: z.string(),
    city: z.string(),
    zip: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = orderSchema.parse(body);

        // Verify total aligns with DB prices (optional but recommended for security)
        // For MVP, we'll trust the client total but in prod recalculate 

        // Verify all products exist
        const productIds = validatedData.items.map(i => i.id);
        const existingProducts = await prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true }
        });

        if (existingProducts.length !== productIds.length) {
            const existingIds = new Set(existingProducts.map(p => p.id));
            const missingIds = productIds.filter(id => !existingIds.has(id));
            console.error("Missing products:", missingIds);
            return NextResponse.json(
                { error: "One or more items in your cart are no longer available. Please clear your cart and try again." },
                { status: 400 }
            );
        }

        const order = await prisma.order.create({
            data: {
                total: validatedData.total,
                status: 'PENDING',
                paymentStatus: 'PENDING',
                guestEmail: validatedData.email,
                firstName: validatedData.firstName,
                lastName: validatedData.lastName,
                phone: validatedData.phone,
                address: validatedData.address,
                city: validatedData.city,
                zip: validatedData.zip,
                items: {
                    create: validatedData.items.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                    }))
                }
            }
        });

        return NextResponse.json({ orderId: order.id });
    } catch (error) {
        console.error("Order creation failed - Full Error:", error);
        if (error instanceof z.ZodError) {
            console.error("Validation Error:", error.errors);
        }
        return NextResponse.json(
            { error: "Failed to create order", details: String(error) }, // Return details to client for debugging
            { status: 500 }
        );
    }
}
