import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react";

// Placeholder Card Component (since we haven't created one yet)
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

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-medium text-obsidian">Dashboard</h2>
                <p className="text-obsidian/60">Overview of your store performance.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    title="Total Revenue"
                    value="₦45,231,890"
                    icon={DollarSign}
                    description="+20.1% from last month"
                />
                <DashboardCard
                    title="Orders"
                    value="+2350"
                    icon={ShoppingCart}
                    description="+180.1% from last month"
                />
                <DashboardCard
                    title="Products"
                    value="12"
                    icon={Package}
                    description="4 low stock alerts"
                />
                <DashboardCard
                    title="Active Customers"
                    value="+573"
                    icon={Users}
                    description="+201 since last hour"
                />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border border-beige/20 bg-white p-6 shadow-sm">
                    <h3 className="font-serif font-medium text-obsidian mb-4">Recent Sales</h3>
                    <div className="h-[200px] flex items-center justify-center text-obsidian/40 bg-cream/20 rounded-md border border-dashed border-beige/30">
                        Chart Placeholder
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border border-beige/20 bg-white p-6 shadow-sm">
                    <h3 className="font-serif font-medium text-obsidian mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className="h-9 w-9 rounded-full bg-beige/20 flex items-center justify-center">
                                    <Users className="h-4 w-4 text-obsidian/60" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-obsidian">New user registered</p>
                                    <p className="text-xs text-obsidian/50">2 minutes ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
