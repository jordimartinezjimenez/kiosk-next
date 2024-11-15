import Heading from "@/components/ui/Heading";
import AddProductForm from "../../../../components/products/AddProductForm";
import ProductForm from "@/components/products/ProductForm";

export default function CreateProductPage() {
    return (
        <>
            <Heading>New Product</Heading>
            <AddProductForm>
                <ProductForm />
            </AddProductForm>
        </>
    )
}
