'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { useState } from "react"
import { MdModeEdit } from "react-icons/md";
import BrandForm from "./BrandForm"
import { useRouter } from "next/navigation"
import { saveBrand } from "@/app/helper/BrandHelper"

export type updateBrandType={
    token:string,
    data:any,
    fetchData:any,
}

export function UpdateBrand({ token, data, fetchData }:updateBrandType) {
    const router=useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (postedData:any) => {
        const saveData={
            brandTitle:await postedData.brandTitle,
            brandId: await data.brandId,
        }

        const responseStatus = await saveBrand(saveData);
        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }
        console.log('Brand data is Updated.');
        setOpen(false);
        fetchData();
        router.push(`/brand?customToken=${token}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><MdModeEdit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[325px] md:max-w-[450px]" onInteractOutside={(e) => {
                e.preventDefault();
            }}>
                <DialogHeader>
                    <DialogTitle>Update Brand</DialogTitle>
                </DialogHeader>
                {
                    data!=undefined &&  <BrandForm onSubmit={onSubmit} buttonLabel="Update" data={data} />
                }
               
            </DialogContent>
        </Dialog>
    )
}

export default UpdateBrand
