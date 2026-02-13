"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const productSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.coerce.number().min(0),
    stock: z.coerce.number().min(0),
    categoryId: z.string().min(1),
    images: z.string(), // Comma separated URLs
    sizes: z.string().optional(), // Comma separated sizes
});

export async function createProduct(currentState: any, formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        categoryId: formData.get("categoryId"),
        images: formData.get("images"),
        sizes: formData.get("sizes"),
    };

    const validatedData = productSchema.safeParse(rawData);

    if (!validatedData.success) {
        return {
            message: "Validation Error",
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    const { name, description, price, stock, categoryId, images, sizes } = validatedData.data;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + "-" + Date.now();

    try {
        await prisma.product.create({
            data: {
                name,
                description,
                price,
                stock,
                categoryId,
                images: images.split(",").map((s) => s.trim()).filter((s) => s !== ""),
                sizes: sizes ? sizes.split(",").map((s) => s.trim()).filter((s) => s !== "") : [],
                slug,
            },
        });
    } catch (error) {
        return {
            message: "Database Error: Failed to create product.",
        };
    }

    revalidatePath("/admin/products");
    redirect("/admin/products");
}

export async function updateProduct(
    id: string,
    prevState: any,
    formData: FormData
) {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        categoryId: formData.get("categoryId"),
        images: formData.get("images"),
        sizes: formData.get("sizes"),
    };

    const validatedData = productSchema.safeParse(rawData);

    if (!validatedData.success) {
        return {
            message: "Validation Error",
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    const { name, description, price, stock, categoryId, images, sizes } = validatedData.data;

    try {
        await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                stock,
                categoryId,
                images: images.split(",").map((s) => s.trim()).filter((s) => s !== ""),
                sizes: sizes ? sizes.split(",").map((s) => s.trim()).filter((s) => s !== "") : [],
            },
        });
    } catch (error) {
        return {
            message: "Database Error: Failed to update product.",
        };
    }

    revalidatePath("/admin/products");
    revalidatePath(`/admin/products/${id}`);
    redirect("/admin/products");
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id },
        });
        revalidatePath("/admin/products");
        return { message: "Deleted Product" };
    } catch (error) {
        return { message: "Database Error: Failed to delete product." };
    }
}

export async function updateOrderStatus(id: string, status: string) {
    try {
        await prisma.order.update({
            where: { id },
            data: { status: status as any },
        });
        revalidatePath("/admin/orders");
        revalidatePath(`/admin/orders/${id}`);
        return { message: "Status Updated" };
    } catch (error) {
        return { message: "Database Error: Failed to update status." };
    }
}

const categorySchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
});

export async function createCategory(prevState: any, formData: FormData) {
    const rawData = {
        name: formData.get("name"),
        description: formData.get("description"),
    };

    const validatedData = categorySchema.safeParse(rawData);

    if (!validatedData.success) {
        return {
            message: "Validation Error",
            errors: validatedData.error.flatten().fieldErrors,
        };
    }

    const { name, description } = validatedData.data;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") + "-" + Date.now();

    try {
        await prisma.category.create({
            data: {
                name,
                description,
                slug,
            },
        });
    } catch (error) {
        return {
            message: "Database Error: Failed to create category.",
        };
    }

    revalidatePath("/admin/categories");
    revalidatePath("/admin/products/new");
    return { message: "Created Category" };
}

export async function deleteCategory(id: string) {
    try {
        await prisma.category.delete({
            where: { id },
        });
        revalidatePath("/admin/categories");
        revalidatePath("/admin/products/new");
        return { message: "Deleted Category" };
    } catch (error) {
        return { message: "Database Error: Failed to delete category. Ensure no products are linked." };
    }
}
