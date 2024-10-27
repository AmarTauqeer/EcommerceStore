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
import ModelForm from "./ModelForm"
import { useRouter } from "next/navigation"
import { saveModel } from "@/app/helper/ModelHelper";

export type updateModelType={
    token:string,
    data:any,
    fetchData:any,
}

export function UpdateModel({ token, data, fetchData }:updateModelType) {
    const router=useRouter();
    const [open, setOpen] = useState(false);

    const onSubmit = async (postedData:any) => {
        const saveData={
            title:await postedData.title,
            id: await data.id,
        }

        const responseStatus = await saveModel(saveData);
        if (responseStatus != 200) {
            console.log('There are issues to store data.')
            return false;
        }
        console.log('Model data is Updated.');
        setOpen(false);
        fetchData();
        router.push(`/model?customToken=${token}`)
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
                    <DialogTitle>Update Model</DialogTitle>
                </DialogHeader>
                {
                    data!=undefined &&  <ModelForm onSubmit={onSubmit} buttonLabel="Update" data={data} />
                }
               
            </DialogContent>
        </Dialog>
    )
}

export default UpdateModel
