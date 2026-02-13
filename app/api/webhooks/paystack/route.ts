import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const secret = process.env.PAYSTACK_SECRET_KEY as string;
        const signature = req.headers.get("x-paystack-signature");
        const body = await req.json();

        if (!signature || !secret) {
            return NextResponse.json({ message: "Invalid signature or missing secret" }, { status: 400 });
        }

        const hash = crypto.createHmac("sha512", secret).update(JSON.stringify(body)).digest("hex");

        if (hash !== signature) {
            return NextResponse.json({ message: "Invalid signature" }, { status: 400 });
        }

        // Handle event
        const event = body.event;
        const data = body.data;

        if (event === "charge.success") {
            const reference = data.reference;

            // Extract order ID from metadata
            let orderId = data.metadata?.custom_fields?.find(
                (f: any) => f.variable_name === "order_id"
            )?.value;

            // Fallback: Check if we have an order with this reference (if verify was called already?)
            // Or if we need to find by email/amount? No, order_id is best.

            if (orderId) {
                await prisma.order.update({
                    where: { id: String(orderId) },
                    data: {
                        status: "PROCESSING",
                        paymentStatus: "PAID",
                        paymentRef: reference,
                    }
                });
                console.log(`Order ${orderId} updated via webhook`);
            } else {
                console.error("Webhook received but no order ID found in metadata");
            }
        }

        return NextResponse.json({ message: "Webhook received" }, { status: 200 });

    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
