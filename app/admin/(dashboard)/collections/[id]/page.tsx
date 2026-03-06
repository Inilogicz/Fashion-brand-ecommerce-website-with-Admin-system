import { prisma } from "@/lib/db";
import { CollectionForm } from "@/components/admin/collection-form";
import { notFound } from "next/navigation";

export default async function EditCollectionPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const [collection, products] = await Promise.all([
        prisma.collection.findUnique({
            where: { id },
            include: { products: true }
        }),
        prisma.product.findMany({
            orderBy: { createdAt: "desc" }
        })
    ]);

    if (!collection) {
        notFound();
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-medium text-obsidian">Edit Collection</h2>
                <p className="text-obsidian/60">Updating narrative: <span className="text-cocoa font-medium">{collection.name}</span></p>
            </div>

            <CollectionForm collection={collection} products={products} />
        </div>
    );
}
