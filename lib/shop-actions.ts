import { prisma } from "@/lib/db";
import { cache } from "react";

// Helper to serialize product for client
function serializeProduct(product: any) {
    if (!product) return null;
    return {
        ...product,
        price: Number(product.price),
        createdAt: product.createdAt?.toISOString(),
        updatedAt: product.updatedAt?.toISOString(),
        // Handle relations if needed, e.g. category dates
        category: product.category ? {
            ...product.category,
            createdAt: product.category.createdAt?.toISOString(),
            updatedAt: product.category.updatedAt?.toISOString(),
        } : null
    };
}

export const getFeaturedProducts = cache(async () => {
    try {
        const products = await prisma.product.findMany({
            where: { isFeatured: true },
            take: 3,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        });
        return products.map(serializeProduct);
    } catch (error) {
        console.error("Failed to fetch featured products:", error);
        return [];
    }
});

export const getCollections = cache(async () => {
    try {
        const collections = await (prisma as any).collection.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });
        return collections.map((col: any) => ({
            ...col,
            createdAt: col.createdAt?.toISOString(),
            updatedAt: col.updatedAt?.toISOString(),
        }));
    } catch (error) {
        console.error("Failed to fetch collections:", error);
        return [];
    }
});

export const getAllCategories = cache(async () => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
        return categories.map(cat => ({
            ...cat,
            createdAt: cat.createdAt?.toISOString(),
            updatedAt: cat.updatedAt?.toISOString(),
        }));
    } catch (error) {
        return [];
    }
});

export const getProducts = cache(async (categorySlug?: string, collectionSlug?: string) => {
    try {
        const where: any = {};

        if (categorySlug && categorySlug !== 'all') {
            where.category = { slug: categorySlug };
        }

        if (collectionSlug) {
            where.collections = {
                some: { slug: collectionSlug }
            };
        }

        const products = await prisma.product.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        });
        return products.map(serializeProduct);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
});

export const getCollectionBySlug = cache(async (slug: string) => {
    try {
        const collection = await (prisma as any).collection.findUnique({
            where: { slug }
        });
        if (!collection) return null;
        return {
            ...collection,
            createdAt: collection.createdAt?.toISOString(),
            updatedAt: collection.updatedAt?.toISOString(),
        };
    } catch (error) {
        console.error("Failed to fetch collection:", error);
        return null;
    }
});

export const getProductBySlug = cache(async (slug: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: { slug },
            include: { category: true }
        });
        return serializeProduct(product);
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
});
