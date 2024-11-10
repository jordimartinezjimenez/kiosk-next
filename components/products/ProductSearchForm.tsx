"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

export default function ProductSearchForm() {

    const router = useRouter()

    const handleSearchForm = (formData: FormData) => {
        const data = {
            search: formData.get("search")
        }
        const res = SearchSchema.safeParse(data)

        if (!res.success) {
            res.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        // redirect(`/admin/products?search=${res.data.search}`)
        router.push(`/admin/products/search?search=${res.data.search}`)
    }

    return (
        <form
            action={handleSearchForm}
            className="flex items-center"
        >
            <input
                type="text"
                name="search"
                placeholder="Search for a product"
                className="p-2 placeholder-gray-400 w-full rounded-ss rounded-se"
            />
            <input
                type="submit"
                value="Search"
                className="bg-teal-600 p-2 uppercase text-white cursor-pointer rounded-se rounded-ee"
            />
        </form>
    )
}
