import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth-edge";
import { z } from "zod";

const collectionSchema = z.object({
    name: z.string().min(1),
    slug: z.string().min(1),
    description: z.string().optional(),
    image: z.string().optional(),
    isFeatured: z.boolean().default(false),
    productIds: z.array(z.string()).default([]),
});

export async function GET() {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const collections = await (prisma as any).collection.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                _count: {
                    select: { products: true }
                }
            }
        });

        return NextResponse.json(collections);
    } catch (error) {
        console.error("Failed to fetch collections:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = collectionSchema.parse(body);

        // Check if slug already exists
        const existing = await (prisma as any).collection.findUnique({
            where: { slug: validatedData.slug }
        });

        if (existing) {
            return NextResponse.json({ error: "Slug already exists" }, { status: 400 });
        }

        const collection = await (prisma as any).collection.create({
            data: {
                name: validatedData.name,
                slug: validatedData.slug,
                description: validatedData.description,
                image: validatedData.image,
                isFeatured: validatedData.isFeatured,
                products: {
                    connect: validatedData.productIds.map((id: string) => ({ id }))
                }
            }
        });

        return NextResponse.json(collection);
    } catch (error) {
        console.error("Failed to create collection:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
