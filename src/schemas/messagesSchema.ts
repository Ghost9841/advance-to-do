import { z } from "zod";


export const messagesSchema = z.object({
    content: z
        .string()
        .min(10, "Content must be atleast 10 characters long")
        .max(500, "Content much be no longer than 500 characters")
})


