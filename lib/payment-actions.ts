"use server";

import { prisma } from "@/lib/db";

export async function verifyPayment(reference: string) {
    if (!reference) return { error: "No reference provided" };

    try {
        const secret = process.env.PAYSTACK_SECRET_KEY;
        // console.log("Verifying payment:", reference);

        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${secret}`
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            console.error("Paystack verification failed:", await response.text());
            return { error: "Payment verification failed" };
        }

        const json = await response.json();

        // console.log("Paystack response:", JSON.stringify(json, null, 2));

        if (json.status && json.data.status === "success") {
            // Extract order ID from metadata
            let orderId = json.data.metadata?.custom_fields?.find(
                (f: any) => f.variable_name === "order_id"
            )?.value;

            // Fallback: If orderId is not in metadata, try to find by reference (if we saved it before, but we likely verify first)
            // Or if we assume the user is redirected to the correct page, we can update the order passed in args?
            // Safer to use metadata or pass orderId explicitly to verify function.

            if (orderId) {
                // Ensure orderId is string
                orderId = String(orderId);

                await prisma.order.update({
                    where: { id: orderId },
                    data: {
                        status: "PROCESSING",
                        paymentStatus: "PAID",
                        paymentRef: reference
                    }
                });
                return { success: true, orderId };
            } else {
                return { error: "Order ID not found in transaction metadata" };
            }
        }

        return { error: "Payment was not successful" };
    } catch (error) {
        console.error("Payment verification error:", error);
        return { error: "Internal server error during verification" };
    }
}
