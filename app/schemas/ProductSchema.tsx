import { z } from "zod";

export const productSchema = z.object({
  // productId: z
  // .string(),
    productTitle: z
    .string(),
    productDescription: z
    .string(),
    price: z
    .string(),
    categoryId: z
    .string(),
    brandId: z
    .string(),
    modelId: z
    .string(),
    ImageFile:z.instanceof(File, {
        message: "Please select an image file.",
      }),
      // imagePath:z.string()
   
})

export type ProductSchema=z.infer<typeof productSchema>