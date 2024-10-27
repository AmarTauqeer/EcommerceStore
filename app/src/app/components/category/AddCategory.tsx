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

import { saveCategory } from "@/app/helper/CategoryHelper" 
import CategoryForm from "./CategoryForm" 
import { useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";

export type addCategoryType={
    token:string,
    fetchData:any,
}

export function AddCategory({ token, fetchData }:addCategoryType) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data:any) => {

        const saveData={
            title:await data.title,
            id: 0,
        }
        
        const responseStatus = await saveCategory(saveData);

        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }

        console.log('Category data is saved.');
        setOpen(false);
        fetchData()
        router.push(`/category?customToken=${token}`)
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
                    <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <CategoryForm onSubmit={onSubmit} buttonLabel="Add" data={[]} />
            </DialogContent>
        </Dialog>
    )
}

export default AddCategory
