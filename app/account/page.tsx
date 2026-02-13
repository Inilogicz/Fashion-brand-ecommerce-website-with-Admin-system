import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import { AccountView } from "@/components/account/account-view";

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login?callbackUrl=/account");
    }

    // Fetch latest user details
    const user = await prisma.user.findUnique({
        where: { email: session.user.email as string },
    });

    if (!user) {
        // Should not happen if session exists, but handle just in case
        return <div>User not found.</div>;
    }

    // Fetch orders
    // We fetch orders where userId matches OR guestEmail matches (if we want to link guest orders later, but primarily userId for now)
    const orders = await prisma.order.findMany({
        where: {
            OR: [
                { userId: user.id },
                { guestEmail: user.email }
            ]
        },
        include: {
            items: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // Transform orders for the view if necessary, or pass as is if interfaces match
    // excessive data serialization warning might happen if we pass dates directly to client component
    // so we might need to serialize dates or use a plain object
    const serializedOrders = orders.map(order => ({
        ...order,
        total: Number(order.total), // Decimal to number
        createdAt: order.createdAt, // serializing date might be needed but Next.js 15 might handle it better with superjson or similar, let's try passing Date objects. If it errors, we convert to string.
        items: order.items.map(item => ({
            ...item,
            price: Number(item.price)
        }))
    }));

    return (
        <AccountView user={user} orders={serializedOrders} />
    );
}
