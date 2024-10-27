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

import { saveModel } from "@/app/helper/ModelHelper" 
import ModelForm from "./ModelForm" 
import { useState } from "react"
import { IoAddCircleOutline } from "react-icons/io5";

export type addModelType={
    token:string,
    fetchData:any,
}

export function AddModel({ token, fetchData }:addModelType) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (data:any) => {
        const saveData={
            title:await data.title,
            id: 0,
        }
        
        const responseStatus = await saveModel(saveData);

        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }

        console.log('Model data is saved.');
        setOpen(false);
        fetchData()
        router.push(`/model?customToken=${token}`)
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
                    <DialogTitle>Add Model</DialogTitle>
                </DialogHeader>
                <ModelForm onSubmit={onSubmit} buttonLabel="Add" data={[]} />
            </DialogContent>
        </Dialog>
    )
}

export default AddModel
