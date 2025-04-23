import { z } from 'zod';


export const AddContactSchema = z.object({
    firstname: z.string().min(4, "At least 4 characters"),
    lastname: z.string().min(4, "At least 4 characters"),
    email: z.string().email("Invalid email"),
    phone: z.string().min(10, "At least 10 characters"),
    address: z.string().min(10, "At least 10 characters"),
    job_title: z.string().min(2, "At least 2 characters"),
    status: z.enum(['active', 'inactive'], {
        errorMap: () => ({ message: "Status must be either active or inactive" }),
    })
})