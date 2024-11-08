"use client"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { formatCurrency } from "@/src/utils"
import { useMemo } from "react"
import { createOrder } from "@/actions/create-order-action"
import { orderSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function OrderSummary() {

    const order = useStore(state => state.order)
    const clearOrder = useStore(state => state.clearOrder)
    const total = useMemo(() => order.reduce((total, item) => total + item.subtotal, 0), [order])
    const handleCreateOrder = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            total,
            order
        }

        const res = orderSchema.safeParse(data)
        if (!res.success) {
            res.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        const response = await createOrder(data)
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        toast.success("Order placed successfully")
        clearOrder()
    }

    return (
        <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
            <h1 className="text-4xl text-center font-black">My Order</h1>
            {order.length === 0 ? (
                <p className="text-center mt-10">Your order is empty</p>
            ) : (
                <div className="mt-5">
                    {order.map(item => (
                        <ProductDetails
                            key={item.id}
                            item={item}
                        />
                    ))}
                    <p className="text-2xl mt-20 text-center">Total: <span className="font-bold">{formatCurrency(total)}</span></p>
                    <form
                        action={handleCreateOrder}
                        className="w-full mt-10 space-y-5"
                    >
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="bg-white border border-gray-100 rounded p-2 w-full"
                            name="name"
                        />
                        <input
                            type="submit"
                            className="py-2 rounded uppercase text-white bg-black w-full text-center font-bold cursor-pointer"
                            value={"Place Order"}
                        />
                    </form>
                </div>
            )}
        </aside>
    )
}
