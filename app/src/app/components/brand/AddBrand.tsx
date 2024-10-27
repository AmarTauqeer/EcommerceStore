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

import { saveBrand } from "@/app/helper/BrandHelper" 
import BrandForm from "./BrandForm" 
import { useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";

export type addBrandType={
    token:string,
    fetchData:any,
}

export function AddBrand({ token, fetchData }:addBrandType) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data:any) => {
        const saveData={
            brandTitle:await data.brandTitle,
            brandId: 0,
        }
        
        const responseStatus = await saveBrand(saveData);

        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }

        console.log('Brand data is saved.');
        setOpen(false);
        fetchData()
        router.push(`/brand?customToken=${token}`)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><IoAddCircleOutline /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[325px] md:max-w-[450px]" onInteractOutside={(e) => {
                e.preventDefault();
            }}>
                <DialogHeader>
                    <DialogTitle>Add Brand</DialogTitle>
                </DialogHeader>
                <BrandForm onSubmit={onSubmit} buttonLabel="Add" data={[]} />
            </DialogContent>
        </Dialog>
    )
}

export default AddBrand
