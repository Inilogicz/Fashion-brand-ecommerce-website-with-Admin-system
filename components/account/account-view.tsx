"use client";

import { Button } from "@/components/ui/button";
import { Package, User, MapPin, LogOut } from "lucide-react";
import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Order {
    id: string;
    total: number;
    status: string;
    items: any[];
    createdAt: Date;
}

interface UserData {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    country?: string | null;
}

interface AccountViewProps {
    user: UserData;
    orders: Order[];
}

export function AccountView({ user, orders }: AccountViewProps) {
    const [activeTab, setActiveTab] = useState("orders");

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
        }).format(amount);
    };

    return (
        <div className="min-h-screen bg-[#F9F7F2] pt-24 pb-12 px-6 lg:px-12">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-serif text-obsidian mb-8">My Account</h1>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-2">
                        <div className="bg-white p-6 border border-beige/20 shadow-sm rounded-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="h-10 w-10 bg-obsidian/5 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-obsidian" />
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium text-obsidian truncate">{user.name || "User"}</p>
                                    <p className="text-xs text-obsidian/60 truncate">{user.email}</p>
                                </div>
                            </div>

                            <nav className="space-y-1">
                                <button
                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-sm transition-colors ${activeTab === "orders" ? "bg-obsidian text-cream" : "text-obsidian/60 hover:bg-obsidian/5"}`}
                                >
                                    <Package className="h-4 w-4" /> Orders
                                </button>
                                <button
                                    onClick={() => setActiveTab("profile")}
                                    className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-sm transition-colors ${activeTab === "profile" ? "bg-obsidian text-cream" : "text-obsidian/60 hover:bg-obsidian/5"}`}
                                >
                                    <User className="h-4 w-4" /> Profile Details
                                </button>
                                <button
                                    onClick={() => signOut({ callbackUrl: "/" })}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                                >
                                    <LogOut className="h-4 w-4" /> Sign Out
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === "orders" && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-xl font-medium text-obsidian">Order History</h2>
                                <div className="space-y-4">
                                    {orders.length === 0 ? (
                                        <div className="text-center py-12 bg-white border border-beige/20 rounded-sm">
                                            <Package className="h-12 w-12 text-obsidian/20 mx-auto mb-4" />
                                            <p className="text-obsidian/60 mb-4">You haven't placed any orders yet.</p>
                                            <Button asChild>
                                                <Link href="/shop">Start Shopping</Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        orders.map((order) => (
                                            <div key={order.id} className="bg-white border border-beige/20 p-6 flex flex-col md:flex-row justify-between md:items-center gap-4 hover:border-obsidian/20 transition-colors">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="font-medium text-obsidian">{order.id}</span>
                                                        <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full ${order.status === "DELIVERED" ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-obsidian/60">Placed on {formatDate(order.createdAt)}</p>
                                                </div>
                                                <div className="flex items-center justify-between md:justify-end gap-8 w-full md:w-auto">
                                                    <div className="text-right">
                                                        <p className="font-medium text-obsidian">{formatCurrency(Number(order.total))}</p>
                                                        <p className="text-xs text-obsidian/60">{order.items.length} items</p>
                                                    </div>
                                                    <Button variant="outline" size="sm">View Details</Button>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "profile" && (
                            <div className="space-y-6 animate-fade-in">
                                <h2 className="text-xl font-medium text-obsidian">Profile Details</h2>
                                <div className="bg-white border border-beige/20 p-6 space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-obsidian/40 mb-1 block">Full Name</label>
                                            <p className="text-obsidian font-medium">{user.name || "Not set"}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-obsidian/40 mb-1 block">Email</label>
                                            <p className="text-obsidian font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-obsidian/40 mb-1 block">Phone</label>
                                            <p className="text-obsidian font-medium">{user.phone || "Not set"}</p>
                                        </div>
                                    </div>
                                </div>

                                <h2 className="text-xl font-medium text-obsidian pt-4">Saved Addresses</h2>
                                <div className="bg-white border border-beige/20 p-6 flex items-start gap-4">
                                    <MapPin className="h-5 w-5 text-obsidian/60 mt-1" />
                                    <div>
                                        <p className="text-obsidian font-medium">Default Address</p>
                                        <p className="text-sm text-obsidian/60">{user.address || "No address saved"}</p>
                                        <p className="text-sm text-obsidian/60">
                                            {[user.city, user.country].filter(Boolean).join(", ")}
                                        </p>
                                    </div>
                                    {/* <Button variant="ghost" size="sm" className="ml-auto text-obsidian/60">Edit</Button> */}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
