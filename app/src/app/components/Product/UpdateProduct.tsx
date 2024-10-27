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

import { useState } from "react"
import { saveProduct } from "@/app/helper/ProductHelper"
import Image from "next/image";
import ProductForm from "./ProductForm";
import { MdModeEdit } from "react-icons/md"

export type updateProductType={
    token:string,
    data:any,
    fetchData:any,
}

export function UpdateProduct({ token, data, fetchData }:updateProductType) {
    // console.log(data)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (postedData:any) => {
        // console.log(postedData)
        const formData = new FormData();
        formData.append("productTitle", await postedData.productTitle);
        formData.append("productDescription", await postedData.productDescription);
        formData.append("categoryId", await postedData.categoryId);
        formData.append("brandId", await postedData.brandId);
        formData.append("modelId", await postedData.modelId);
        formData.append("price", await postedData.price);
        formData.append("productId", await data.productId);
        formData.append("imageFile", await postedData.ImageFile);

        const responseStatus = await saveProduct(formData);
        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }
        console.log('Product data is Updated.');
        setOpen(false);
        fetchData();
        router.push(`/product?customToken=${token}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><MdModeEdit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[325px] md:max-w-[700px]" onInteractOutside={(e) => {
                e.preventDefault();
            }}>
                <DialogHeader>
                    <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <ProductForm onSubmit={onSubmit} buttonLabel="Update" data={data} />
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProduct
