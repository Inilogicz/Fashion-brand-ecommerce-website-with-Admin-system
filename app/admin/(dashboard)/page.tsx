import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";
import { prisma } from "@/lib/db";

export const dynamic = 'force-dynamic';

// Helper to format currency if not available in utils
const formatPrice = (amount: number | string) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
    }).format(Number(amount));
};

function DashboardCard({ title, value, icon: Icon, description }: any) {
    return (
        <div className="rounded-xl border border-beige/20 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium text-obsidian/70">{title}</h3>
                <Icon className="h-4 w-4 text-obsidian/70" />
            </div>
            <div className="pt-4">
                <div className="text-2xl font-bold text-obsidian">{value}</div>
                <p className="text-xs text-obsidian/50 mt-1">{description}</p>
            </div>
        </div>
    );
}

export default async function AdminDashboardPage() {
    const [
        totalRevenueResult,
        totalOrders,
        totalProducts,
        totalCustomers,
        recentSales,
        recentUsers
    ] = await Promise.all([
        prisma.order.aggregate({
            where: { paymentStatus: "PAID" },
            _sum: { total: true },
        }),
        prisma.order.count(),
        prisma.product.count(),
        prisma.user.count({
            where: { role: "USER" },
        }),
        prisma.order.findMany({
            where: { paymentStatus: "PAID" },
            orderBy: { createdAt: "desc" },
            take: 5,
            include: { user: true },
        }),
        prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            take: 5,
        })
    ]);

    const totalRevenue = totalRevenueResult._sum.total || 0;

    return (
        <div className="space-y-6 lg:space-y-10">
            <div>
                <h2 className="text-2xl lg:text-3xl font-serif font-medium text-obsidian tracking-tight">Dion Luxe Attelier Dashboard</h2>
                <p className="text-sm lg:text-base text-obsidian/60">Overview of your store performance.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    title="Total Revenue"
                    value={formatPrice(totalRevenue.toString())}
                    icon={DollarSign}
                    description="Lifetime revenue"
                />
                <DashboardCard
                    title="Orders"
                    value={totalOrders}
                    icon={ShoppingCart}
                    description="Total orders placed"
                />
                <DashboardCard
                    title="Products"
                    value={totalProducts}
                    icon={Package}
                    description="Active products"
                />
                <DashboardCard
                    title="Customers"
                    value={totalCustomers}
                    icon={Users}
                    description="Registered users"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-7">
                <div className="lg:col-span-4 rounded-xl border border-beige/20 bg-white p-6 shadow-sm">
                    <h3 className="font-serif font-medium text-obsidian mb-6 text-lg">Recent Sales</h3>
                    <div className="space-y-6">
                        {recentSales.length === 0 ? (
                            <p className="text-sm text-obsidian/50">No recent sales.</p>
                        ) : (
                            recentSales.map((order) => (
                                <div key={order.id} className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-green-50 flex items-center justify-center">
                                            <DollarSign className="h-5 w-5 text-green-700" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-obsidian truncate">
                                                {order.user?.name || (order.firstName ? `${order.firstName} ${order.lastName}` : "Guest")}
                                            </p>
                                            <p className="text-xs text-obsidian/50 truncate">{order.user?.email || order.guestEmail}</p>
                                        </div>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-bold text-obsidian">{formatPrice(order.total.toString())}</p>
                                        <p className="text-[10px] uppercase tracking-wider text-obsidian/40 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className="lg:col-span-3 rounded-xl border border-beige/20 bg-white p-6 shadow-sm">
                    <h3 className="font-serif font-medium text-obsidian mb-6 text-lg">Recent Activity</h3>
                    <div className="space-y-6">
                        {recentUsers.length === 0 ? (
                            <p className="text-sm text-obsidian/50">No recent activity.</p>
                        ) : (
                            recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center gap-4">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-beige/20 flex items-center justify-center">
                                        <Users className="h-5 w-5 text-obsidian/60" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-obsidian truncate">{user.name || "New User"}</p>
                                        <p className="text-xs text-obsidian/50 truncate">Joined {new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
