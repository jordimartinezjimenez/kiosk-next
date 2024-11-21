"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProduct(data: unknown, id: number) {
    const res = ProductSchema.safeParse(data)

    if (!res.success) {
        return {
            errors: res.error.issues
        }
    }

    await prisma.product.update({
        where: {
            id
        },
        data: res.data
    })
    revalidatePath("/admin/products")
}