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
import CategoryForm from "./CategoryForm"
import { useRouter } from "next/navigation"
import { saveCategory } from "@/app/helper/CategoryHelper"

export type updateCategoryType={
    token:string,
    data:any,
    fetchData:any,
}

export function UpdateCategory({ token, data, fetchData }:updateCategoryType) {
    const router=useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (postedData:any) => {
        const saveData={
            title:await postedData.title,
            id: await data.id,
        }

        const responseStatus = await saveCategory(saveData);
        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }
        console.log('Category data is Updated.');
        setOpen(false);
        fetchData();
        router.push(`/category?customToken=${token}`)
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
                    <DialogTitle>Update Category</DialogTitle>
                </DialogHeader>
                {
                    data!=undefined &&  <CategoryForm onSubmit={onSubmit} buttonLabel="Update" data={data} />
                }
               
            </DialogContent>
        </Dialog>
    )
}

export default UpdateCategory
