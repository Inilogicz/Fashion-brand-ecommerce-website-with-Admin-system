import { Button } from "@/components/ui/button";
import { Plus, Search, MoreHorizontal, Edit, Trash } from "lucide-react";

const PRODUCTS = [
    { id: 1, name: "Obsidian Trench Coat", price: "₦850,000", stock: 12, category: "Outerwear", status: "Active" },
    { id: 2, name: "Silk Essence Dress", price: "₦450,000", stock: 25, category: "Dresses", status: "Active" },
    { id: 3, name: "Minimalist Leather Tote", price: "₦320,000", stock: 8, category: "Accessories", status: "Active" },
    { id: 4, name: "Cashmere Turtleneck", price: "₦290,000", stock: 0, category: "Knitwear", status: "Out of Stock" },
];

export default function AdminProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-medium text-obsidian">Products</h2>
                    <p className="text-obsidian/60">Manage your product catalog.</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Product
                </Button>
            </div>

            <div className="rounded-md border border-beige/20 bg-white">
                <div className="p-4 border-b border-beige/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-obsidian/40" />
                        <input
                            placeholder="Search products..."
                            className="w-full pl-9 h-9 rounded-md border border-beige/30 bg-cream/20 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian"
                        />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {PRODUCTS.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${product.status === "Active" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                        }`}>
                                        {product.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 hover:bg-beige/20 rounded-full text-obsidian/60 hover:text-obsidian">
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button className="p-2 hover:bg-red-50 rounded-full text-obsidian/60 hover:text-red-600">
                                            <Trash className="h-4 w-4" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

// Simple Table Components (Inline for now)
function Table({ children }: { children: React.ReactNode }) {
    return <div className="w-full overflow-auto"><table className="w-full caption-bottom text-sm">{children}</table></div>
}

function TableHeader({ children }: { children: React.ReactNode }) {
    return <thead className="[&_tr]:border-b [&_tr]:border-beige/10">{children}</thead>
}

function TableBody({ children }: { children: React.ReactNode }) {
    return <tbody className="[&_tr:last-child]:border-0">{children}</tbody>
}

function TableRow({ children }: { children: React.ReactNode }) {
    return <tr className="border-b border-beige/10 transition-colors hover:bg-beige/5 data-[state=selected]:bg-muted">{children}</tr>
}

function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
    return <th className={`h-12 px-4 text-left align-middle font-medium text-obsidian/60 [&:has([role=checkbox])]:pr-0 ${className}`}>{children}</th>
}

function TableCell({ children, className }: { children: React.ReactNode, className?: string }) {
    return <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 text-obsidian ${className}`}>{children}</td>
}
