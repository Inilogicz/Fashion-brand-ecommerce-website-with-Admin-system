import { getAllCategories, getProducts, getCollectionBySlug } from "@/lib/shop-actions";
import { ShopClient } from "@/components/shop/shop-client";

export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string; collection?: string }> }) {
    const { category, collection: collectionSlug } = await searchParams;

    const [products, categories, currentCollection] = await Promise.all([
        getProducts(category, collectionSlug),
        getAllCategories(),
        collectionSlug ? getCollectionBySlug(collectionSlug) : Promise.resolve(null)
    ]);

    return (
        <ShopClient
            products={products}
            categories={categories}
            currentCategory={category || 'all'}
            currentCollection={currentCollection}
        />
    );
}
