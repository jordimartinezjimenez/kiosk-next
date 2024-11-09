import { Product, Order, OrderProducts } from "@prisma/client"

export type OrderItem = Pick<Product, "id" | "name" | "price"> & {
    quantity: number
    subtotal: number
}

export type LinkType = {
    url: string
    text: string
    blank: boolean
}

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}