"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function completeOrder(formData: FormData) {
    const data = {
        orderId: formData.get("orderId")
    }

    const res = OrderIdSchema.safeParse(data)

    if (res.success) {
        try {
            await prisma.order.update({
                where: {
                    id: res.data.orderId
                },
                data: {
                    status: true,
                    orderReadyAt: new Date(Date.now())
                }
            })
            revalidatePath("/admin/orders")
        } catch (error) {
            console.error(error)
        }
    }
}