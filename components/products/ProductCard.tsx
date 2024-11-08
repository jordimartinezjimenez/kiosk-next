import { formatCurrency } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="border bg-white rounded-lg overflow-hidden">
            <Image
                src={`/products/${product.image}.jpg`}
                alt={`Product Image - ${product.name}`}
                width={400}
                height={500}
            />
            <div className="p-5">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>
                <button
                    type="button"
                    className="rounded-ss-2xl rounded-ee-2xl bg-teal-600 hover:bg-teal-800 transition-colors text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                >
                    Add to cart
                </button>
            </div>
        </div>
    )
}
