import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin-auth-edge";
import { z } from "zod";

const updateSchema = z.object({
    name: z.string().min(1).optional(),
    slug: z.string().min(1).optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    isFeatured: z.boolean().optional(),
    productIds: z.array(z.string()).optional(),
});

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: collectionId } = await params;
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const validatedData = updateSchema.parse(body);


        // Verify it exists
        const existing = await (prisma as any).collection.findUnique({
            where: { id: collectionId }
        });

        if (!existing) {
            return NextResponse.json({ error: "Collection not found" }, { status: 404 });
        }

        // Handle products relationship if provided
        const updateData: any = {
            name: validatedData.name,
            slug: validatedData.slug,
            description: validatedData.description,
            image: validatedData.image,
            isFeatured: validatedData.isFeatured,
        };

        if (validatedData.productIds) {
            updateData.products = {
                set: validatedData.productIds.map(id => ({ id }))
            };
        }

        const updatedCollection = await (prisma as any).collection.update({
            where: { id: collectionId },
            data: updateData
        });

        return NextResponse.json(updatedCollection);
    } catch (error) {
        console.error("Failed to update collection:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: "Invalid data", details: error.errors }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: collectionId } = await params;
    try {
        const session = await getAdminSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        await (prisma as any).collection.delete({
            where: { id: collectionId }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Failed to delete collection:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
