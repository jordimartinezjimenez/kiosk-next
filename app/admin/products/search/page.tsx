import ProductSearchForm from "@/components/products/ProductSearchForm"
import ProductTable from "@/components/products/ProductsTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

async function searchProducts(searchTerm: string) {
    return await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: "insensitive"
            }
        },
        include: {
            category: true
        }
    })
}

export default async function SearchPage(props: { searchParams: Promise<{ search: string }> }) {

    const searchTerm = (await props.searchParams).search
    const products = await searchProducts(searchTerm)

    return (
        <>
            <Heading>Search results: {searchTerm}</Heading>
            <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
                <ProductSearchForm />
            </div>
            {products.length ? (
                <ProductTable products={products} />
            ) : (
                <p className="text-center text-lg">No products found 😥</p>
            )}
        </>
    )
}
