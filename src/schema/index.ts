import { z } from "zod"

export const orderSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is required" }),
    total: z.number()
        .min(1, { message: "There are errors in your order" }),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})