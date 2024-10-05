import { z } from "zod";
import { usernameValidation } from "./signUpSchema";

export const signInSchema = z.object({
    username: usernameValidation,
    password: z.string().min(8, "Password must be at least 8 characters long"),
})


