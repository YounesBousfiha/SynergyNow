import { z } from "zod";


export const LoginSchema = z.object({
    email: z.string()
        .trim()
        .toLowerCase()
        .email("Invalid email address")
        .min(5, "Email must be at least 5 characters")
        .max(255, "Email should be max 255 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password should be max 255 characters"),
})