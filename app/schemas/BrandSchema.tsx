import { z } from "zod";

export const brandSchema = z.object({
    brandTitle: z
    .string(),   
})

export type BrandSchema=z.infer<typeof brandSchema>