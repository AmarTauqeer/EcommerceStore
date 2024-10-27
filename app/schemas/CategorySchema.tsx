import { z } from "zod";

export const categorySchema = z.object({
    title: z
    .string(),   
})

export type CategorySchema=z.infer<typeof categorySchema>