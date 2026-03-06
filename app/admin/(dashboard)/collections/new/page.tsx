import { prisma } from "@/lib/db";
import { CollectionForm } from "@/components/admin/collection-form";

export default async function NewCollectionPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: "desc" }
    });

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-3xl font-serif font-medium text-obsidian">New Collection</h2>
                <p className="text-obsidian/60">Define a new narrative for your store.</p>
            </div>

            <CollectionForm products={products} />
        </div>
    );
}
