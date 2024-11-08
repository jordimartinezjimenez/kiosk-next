"use client"

import { useStore } from "@/src/store"
import { Product } from "@prisma/client"

type AddProductButtonProps = {
    product: Product
}

export default function AddProductButton({ product }: AddProductButtonProps) {
    const addToOrder = useStore(state => state.addToOrder)
    return (
        <button
            type="button"
            className="rounded-ss-2xl rounded-ee-2xl bg-teal-600 hover:bg-teal-800 transition-colors text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            onClick={() => addToOrder(product)}
        >
            Add to order
        </button>
    )
}
