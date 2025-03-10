import ProductForm from "@/components/admin/product-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Create Product'
}

const CreateProductPage = () => {
    return (<div>
        <h2 className="h2-bold">create Product</h2>
        <div className="my-8">

            <ProductForm type='Create' />
        </div>
    </div>
    );
}

export default CreateProductPage;