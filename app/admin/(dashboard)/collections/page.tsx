import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Plus, Search, Edit } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { DeleteCollectionButton } from "@/components/admin/delete-collection-button";

export const dynamic = 'force-dynamic';

export default async function AdminCollectionsPage() {
    // Cast to any to handle runtime property availability after schema change
    const collectionModel = (prisma as any).collection;

    if (!collectionModel) {
        console.error("Prisma 'collection' model is undefined at runtime.");
        return (
            <div className="p-8 text-center bg-red-50 rounded-lg border border-red-200">
                <h3 className="text-red-800 font-medium">Database Client Error</h3>
                <p className="text-red-600 text-sm mt-2">The 'collection' model is not recognized by the current database client. Please restart the dev server or wait for regeneration.</p>
            </div>
        );
    }

    const collections = await collectionModel.findMany({
        include: {
            _count: {
                select: { products: true }
            }
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-serif font-medium text-obsidian">Collections</h2>
                    <p className="text-obsidian/60">Manage your curated collections.</p>
                </div>
                <Link href="/admin/collections/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Add Collection
                    </Button>
                </Link>
            </div>

            <div className="rounded-md border border-beige/20 bg-white">
                <div className="p-4 border-b border-beige/10">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-obsidian/40" />
                        <input
                            placeholder="Search collections..."
                            className="w-full pl-9 h-9 rounded-md border border-beige/30 bg-cream/20 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-obsidian"
                        />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Products</TableHead>
                            <TableHead>Featured</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {collections.length === 0 ? (
                            <TableRow>
                                <TableCell className="text-center text-obsidian/50" colSpan={6}>
                                    No collections found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            collections.map((collection: any) => (
                                <TableRow key={collection.id}>
                                    <TableCell>
                                        <div className="relative h-12 w-12 overflow-hidden rounded-md bg-beige/20">
                                            {collection.image ? (
                                                <Image
                                                    src={collection.image}
                                                    alt={collection.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-[10px] text-obsidian/40 uppercase">No Img</div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium text-base">{collection.name}</TableCell>
                                    <TableCell className="text-obsidian/60 font-mono text-xs">{collection.slug}</TableCell>
                                    <TableCell>{collection._count.products} products</TableCell>
                                    <TableCell>
                                        {collection.isFeatured ? (
                                            <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                                                Featured
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600">
                                                Standard
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/collections/${collection.id}`}>
                                                <button className="p-2 hover:bg-beige/20 rounded-full text-obsidian/60 hover:text-obsidian">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                            </Link>
                                            <DeleteCollectionButton id={collection.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

// Simple Table Components (Reusing the style from products page)
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
    return <tr className="border-b border-beige/10 transition-colors hover:bg-beige/5">{children}</tr>
}

function TableHead({ children, className }: { children: React.ReactNode, className?: string }) {
    return <th className={`h-12 px-4 text-left align-middle font-medium text-obsidian/60 ${className}`}>{children}</th>
}

function TableCell({ children, className, colSpan }: { children: React.ReactNode, className?: string, colSpan?: number }) {
    return <td colSpan={colSpan} className={`p-4 align-middle text-obsidian ${className}`}>{children}</td>
}
