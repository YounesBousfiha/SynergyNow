import { z } from "zod"

export const RegisterSchema = z.object({
    firstname: z.string()
        .min(3, "First name must be at least 5 characters")
        .max(30, "First name should be max 30 characters")
        .trim(),
    lastname: z.string()
        .min(3, "Last name must be at least 5 characters")
        .max(30, "Last name should be max 30 characters")
        .trim(),
    email: z.string()
        .trim()
        .toLowerCase()
        .email("Invalid email address")
        .min(5, "Email must be at least 5 characters")
        .max(255, "Email should be max 255 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password should be max 255 characters"),
    confirmPassword: z.string()
})


