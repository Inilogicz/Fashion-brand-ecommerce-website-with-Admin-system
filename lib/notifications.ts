import { resend } from "./resend";

export async function sendOrderConfirmationEmail(email: string, orderId: string, total: number) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is missing. Email not sent.");
        return;
    }

    try {
        await resend.emails.send({
            from: 'Dion Luxe <orders@dionluxe.com>', // User needs to verify domain
            to: email,
            subject: `Order Confirmation #${orderId}`,
            html: `<p>Thank you for your order! Total: ₦${total}</p>` // Placeholder for React Email template
        });
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

export async function sendAdminOrderNotification(orderId: string, total: number) {
    if (!process.env.RESEND_API_KEY) return;

    // Send to admin email (configure in env)
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@dionluxe.com';

    try {
        await resend.emails.send({
            from: 'Dion Luxe <system@dionluxe.com>',
            to: adminEmail,
            subject: `[New Order] #${orderId} - ₦${total}`,
            html: `<p>New order received.</p>`
        });
    } catch (error) {
        console.error("Failed to send admin notification:", error);
    }
}
