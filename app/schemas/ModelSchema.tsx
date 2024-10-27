import { z } from "zod";

export const modelSchema = z.object({
    title: z
    .string(),   
})

export type ModelSchema=z.infer<typeof modelSchema>