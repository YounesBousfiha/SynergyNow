import { z } from 'zod';

export const AddCompanySchema = z.object({
    name: z.string().min(1, "At least 1 characters needed"),
    description: z.string().min(5, "At least 5 characters needed"),
    industry: z.string().min(5, "At least 5 characters needed"),
    address: z.string().min(5, "At least 5 characters needed"),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(1, "Phone required"),
    image: z.instanceof(File)
        .refine(file => file.size <= 5 * 1024 * 1024, {
            message: "Image Must be less than 5MB"
        })
        .refine(file => ['image/jpeg', 'image/jpg', "image/png", 'image/webp'].includes(file.type), {
            message: "Only .jpg, .jpeg, .png and .webp format are supported"
        })
        .optional()
})