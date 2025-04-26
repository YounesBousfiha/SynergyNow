import { z } from "zod";

export const TaskSchema = z.object({
    title: z.
    string()
        .min(1, { message: "Title is required" })
        .max(100, { message: "Title must be less than 100 characters" }),
    description: z
        .string()
        .min(1, { message: "Description is required" })
        .max(500, { message: "Description must be less than 500 characters" }),
    start_date: z
        .string()
        .min(1, { message: "Start date is required" })
        .max(100, { message: "Start date must be less than 100 characters" }),
    due_date: z
        .string()
        .min(1, "Due date is required"),
    status: z
        .enum(['unassigned', 'todo', 'in_progress', 'in_review', 'done'], {
            required_error: "Status is required",
            invalid_type_error: "Invalid status",
        }),
    priority: z
        .enum(['low', 'medium', 'high'], {
            required_error: "Priority is required",
            invalid_type_error: "Invalid priority",
        }),
});