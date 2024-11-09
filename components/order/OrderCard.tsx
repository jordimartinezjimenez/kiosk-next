import { completeOrder } from "@/actions/complete-order-action"
import { OrderWithProducts } from "@/src/types"
import { formatCurrency } from "@/src/utils"

type OrderCardProps = {
    order: OrderWithProducts
}

export default function OrderCard({ order }: OrderCardProps) {

    return (
        <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:mt-0 lg:p-8 space-y-4 flex flex-col justify-between shadow-md"
        >
            <div>
                <p className='text-2xl font-medium text-gray-900'>Client: {order.name}</p>
                <p className='text-lg font-medium text-gray-900'>Ordered Products:</p>
                <dl className="mt-6 space-y-4">
                    {order.orderProducts.map(product => (
                        <div
                            key={product.productId}
                            className="flex items-center gap-2 border-t border-gray-200 pt-4"
                        >
                            <dt className="flex items-center text-sm text-gray-600">
                                <span className="font-black">( {product.quantity} )</span>
                            </dt>
                            <dd className="text-sm font-medium text-gray-900">{product.product.name}</dd>
                        </div>
                    ))}

                </dl>
            </div>
            <div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-base font-medium text-gray-900">Total to be paid: <span>{formatCurrency(order.total)}</span></p>
                </div>
                <form action={completeOrder}>
                    <input type="hidden" name="orderId" value={order.id} />
                    <input
                        type="submit"
                        className="rounded-ss-2xl rounded-ee-2xl bg-teal-600 hover:bg-teal-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                        value='Check Order Completed'
                    />
                </form>
            </div>

        </section>
    )
}