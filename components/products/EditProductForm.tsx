"use client"

import { updateProduct } from "@/actions/update-product-action"
import { ProductSchema } from "@/src/schema"
import { useParams, useRouter } from "next/navigation"
import { toast } from "react-toastify"

export default function EditProductForm({ children }: { children: React.ReactNode }) {

    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            categoryId: formData.get("categoryId"),
            image: formData.get("image")
        }
        const res = ProductSchema.safeParse(data)

        if (!res.success) {
            res.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        const response = await updateProduct(res.data, id)
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        toast.success("Product updated successfully")
        router.push("/admin/products")
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                action={handleSubmit}
                className="space-y-5"
            >
                {children}
                <input
                    type="submit"
                    value="Save Changes"
                    className="bg-teal-600 hover:bg-teal-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
            </form>
        </div>
    )
}