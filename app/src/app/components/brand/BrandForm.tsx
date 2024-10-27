import { Button } from "@/components/ui/button"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { BrandSchema, brandSchema } from "../../../../schemas/BrandSchema"


export type brandFormType = {
    buttonLabel: string,
    data: any,
    onSubmit: any
}

const BrandForm = ({ onSubmit, buttonLabel, data }: brandFormType) => {

    const form = useForm<BrandSchema>({
        resolver: zodResolver(brandSchema),
        defaultValues: buttonLabel == "Update" ? {
            brandTitle: data.brandTitle,
        } : undefined,
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">

                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-2">
                        <FormField
                            name="brandTitle"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value} autoFocus />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                    </div>
                </div>
                <Button className="w-full" type="submit">{buttonLabel}</Button>
            </form>
        </Form>
    )
}

export default BrandForm
