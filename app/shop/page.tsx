import { getAllCategories, getProducts } from "@/lib/shop-actions";
import { ShopClient } from "@/components/shop/shop-client";

export const dynamic = 'force-dynamic';

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
    const { category } = await searchParams;

    // If we have a category, we need to map slug back to ID? 
    // Wait, getProducts takes slug, so that's fine.

    return (
        <ShopClient
            products={await getProducts(category)}
            categories={await getAllCategories()}
            currentCategory={category || 'all'}
        />
    );
}
