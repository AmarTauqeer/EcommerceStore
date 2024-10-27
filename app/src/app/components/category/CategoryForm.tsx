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
import { CategorySchema, categorySchema } from "../../../../schemas/CategorySchema"


export type categoryFormType = {
    buttonLabel: string,
    data: any,
    onSubmit: any
}

const CategoryForm = ({ onSubmit, buttonLabel, data }: categoryFormType) => {

    const form = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: buttonLabel == "Update" ? {
            title: data.title,
        } : undefined,
    })


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className="space-y-4">

                <div className="grid grid-cols-1">
                    <div className="flex flex-col gap-2">
                        <FormField
                            name="title"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category Title</FormLabel>
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

export default CategoryForm
