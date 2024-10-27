import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ProductSchema, productSchema } from "../../../../schemas/ProductSchema"
import { useEffect, useState } from "react"
import { fetchCategory, fetchBrand, fetchModel } from "@/app/helper/ProductHelper"

export type productFormType={
    buttonLabel:string,
    data:any,
    onSubmit:any
}

const ProductForm = ({ onSubmit, buttonLabel, data }:productFormType) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [categories, setcategories] = useState([])
    const [brands, setbrands] = useState([])
    const [models, setmodels] = useState([])

    const form = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
        defaultValues: buttonLabel=="Update"? {
            productTitle:data.productTitle,
            productDescription:data.productDescription,
            price:data.price.toString(),
            categoryId:data.categoryId.toString(),
            brandId:data.brandId.toString(),
            modelId:data.modelId.toString(),
        }:undefined,
    })

    useEffect(() => {
        // get category brand and model
        async function getData() {
            const category = await fetchCategory();
            setcategories(category);
            const brand = await fetchBrand();
            setbrands(brand);
            const model = await fetchModel();
            setmodels(model);

        }
        getData()

    }, [buttonLabel])


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                        <FormField
                            name="productTitle"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Product Title</FormLabel>
                                    <FormControl>
                                        <Input {...field} value={field.value} autoFocus />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name="productDescription"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>

                        <FormField
                            name="categoryId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={(value) => field.onChange(value)}
                                        // onValueChange={(value)=>field.onChange(handleChange(value))}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Category</SelectLabel>
                                                    {
                                                        categories && categories.map((c: any, idx: number) => (
                                                            <SelectItem value={c.id.toString()} key={idx}>{c.title}</SelectItem>
                                                        ))

                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>

                        <FormField
                            name="brandId"
                            control={form.control}

                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand</FormLabel>
                                    <FormControl>


                                        <Select
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a brand" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Brand</SelectLabel>
                                                    {
                                                        brands && brands.map((b: any, idx: number) => (
                                                            <SelectItem value={b.brandId.toString()} key={idx}>{b.brandTitle}</SelectItem>
                                                        ))

                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>

                        <FormField
                            name="modelId"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Model</FormLabel>
                                    <FormControl>
                                        <Select
                                            defaultValue={field.value}
                                            value={field.value}
                                            onValueChange={field.onChange}

                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Model</SelectLabel>
                                                    {
                                                        models && models.map((m: any, idx: number) => (
                                                            <SelectItem value={m.id.toString()} key={idx}>{m.title}</SelectItem>
                                                        ))

                                                    }
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>
                        <FormField
                            name="price"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}>
                        </FormField>

                    </div>
                    <div className="flex flex-col">
                        <div className="text-center mb-[200px] h-24 md:h-[320px] md:mb-0">
                            {/* {id == 0 ? <Image src={Preview} alt="preview" width={350} height={250} /> : <img className='aspect-square rounded-md object-cover' src={`${apiUrl}Uploads/` + data.imagePath} alt={data.productTitle} />} */}
                            {/* <img className='aspect-square rounded-md object-cover' src={`${apiUrl}Uploads/` + data.imagePath} alt={data.productTitle} /> */}
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="ImageFile"
                                render={({ field: { value, onChange, ...fieldProps } }) => (
                                    <FormItem>
                                        <FormLabel>Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                placeholder="Upload"
                                                {...fieldProps}
                                                accept="image/png, image/jpeg, image/jpg"
                                                onChange={(event) =>
                                                    onChange(event.target.files && event.target.files[0])
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </div>
                <Button className="w-full" type="submit">{buttonLabel}</Button>
            </form>
        </Form>
    )
}

export default ProductForm
