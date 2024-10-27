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
import { ModelSchema, modelSchema } from "../../../../schemas/ModelSchema"


export type modelFormType = {
    buttonLabel: string,
    data: any,
    onSubmit: any
}

const ModelForm = ({ onSubmit, buttonLabel, data }: modelFormType) => {

    const form = useForm<ModelSchema>({
        resolver: zodResolver(modelSchema),
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
                                    <FormLabel>Model Title</FormLabel>
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

export default ModelForm
