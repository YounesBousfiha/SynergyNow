import { z } from 'zod';


export const UpdateUserInfoSchema = z.object({
    firstname: z.string().min(4, "At least 4 characters"),
    lastname: z.string().min(4, "At least 4 characters"),
    email: z.string().email("Invalid email"),
    image: z.instanceof(File).optional()
});