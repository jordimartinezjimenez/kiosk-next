import ProductsPagination from "@/components/products/ProductsPagination"
import ProductTable from "@/components/products/ProductsTable"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { redirect } from "next/navigation"

async function productCount() {
    return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize
    return await prisma.product.findMany({
        take: pageSize,
        skip: skip,
        include: {
            category: true
        }
    })
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage(props: { searchParams: Promise<{ page: string }> }) {
    const searchParams = await props.searchParams;

    const page = await +searchParams.page || 1
    const pageSize = 10

    if (page < 0) redirect("/admin/products")

    const produtsData = await getProducts(page, pageSize)
    const totalProductsData = await productCount()
    const [produts, totalProducts] = await Promise.all([produtsData, totalProductsData])
    const totalPages = Math.ceil(totalProducts / pageSize)

    if (page > totalPages) redirect("/admin/products")

    return (
        <>
            <Heading>Manage Products</Heading>
            <ProductTable
                products={produts}
            />
            <ProductsPagination
                page={page}
                totalPages={totalPages}
            />
        </>
    )
}
