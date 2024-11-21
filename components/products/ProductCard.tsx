import { formatCurrency, getImagePath } from "@/src/utils"
import { Product } from "@prisma/client"
import Image from "next/image"
import AddProductButton from "./AddProductButton"

type ProductCardProps = {
    product: Product
}

export default function ProductCard({ product }: ProductCardProps) {

    const imagePath = getImagePath(product.image)

    return (
        <div className="border bg-white rounded-lg overflow-hidden h-full flex flex-col justify-between">
            <div>
                <Image
                    src={imagePath}
                    alt={`Product Image - ${product.name}`}
                    width={400}
                    height={500}
                />
                <div className="p-5 pb-0">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                </div>
            </div>
            <div className="p-5 pt-0">
                <p className="mt-5 font-black text-4xl text-amber-500">
                    {formatCurrency(product.price)}
                </p>
                <AddProductButton product={product} />
            </div>
        </div>
    )
}
