import ProductForm from "./ProductForm";

export default function AddProductForm() {
    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
            <form
                action=""
                className="space-y-5"
            >
                <ProductForm />
                <input
                    type="submit"
                    value="New Product"
                    className="bg-teal-600 hover:bg-teal-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                />
            </form>
        </div>
    )
}
