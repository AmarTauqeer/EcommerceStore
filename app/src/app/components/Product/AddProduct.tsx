'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { saveProduct } from "@/app/helper/ProductHelper"
import ProductForm from "./ProductForm"
import { useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5"

export type addProductType={
    token:string,
    fetchData:any,
}

export function AddProduct({ token, fetchData }:addProductType) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data:any) => {
        const formData = new FormData();
        formData.append("productTitle", await data.productTitle);
        formData.append("productDescription", await data.productDescription);
        formData.append("categoryId", await data.categoryId);
        formData.append("brandId", await data.brandId);
        formData.append("modelId", await data.modelId);
        formData.append("price", await data.price);
        formData.append("productId", "0");
        formData.append("imageFile", await data.ImageFile);

        const responseStatus = await saveProduct(formData);

        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }

        console.log('Product data is saved.');
        setOpen(false);
        fetchData()
        router.push(`/product?customToken=${token}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><IoAddCircleOutline /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[325px] md:max-w-[700px]" onInteractOutside={(e) => {
                e.preventDefault();
            }}>
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <ProductForm onSubmit={onSubmit} buttonLabel="Add" data={[]} />
            </DialogContent>
        </Dialog>
    )
}

export default AddProduct
