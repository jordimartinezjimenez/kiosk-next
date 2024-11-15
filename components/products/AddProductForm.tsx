"use client"

import { ProductSchema } from "@/src/schema"
import { toast } from "react-toastify"

export default function AddProductForm({ children }: { children: React.ReactNode }) {

    const handleSubmit = async (formData: FormData) => {
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            categoryId: formData.get("categoryId")
        }
        const res = ProductSchema.safeParse(data)

        if (!res.success) {
            res.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
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
                    value="New Product"
                    className="bg-teal-600 hover:bg-teal-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
            </form>
        </div>
    )
}
