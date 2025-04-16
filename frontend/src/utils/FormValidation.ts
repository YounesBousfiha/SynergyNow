import { toast } from "sonner";
import { ZodSchema } from "zod";

interface ValidationResult<T> {
    success: boolean;
    validData?: T;
}

export  const validateForm = <T>(
    data: unknown,
    schema: ZodSchema,
    formElement?: HTMLFormElement
): ValidationResult<T> => {
    const result = schema.safeParse(data);

    if (!result.success) {
        result.error.errors.forEach((err) => {
            toast.error(err.message, { duration: 3000 });
        });
        return { success: false };
    }

    toast.success("Form submitted successfully!");
    formElement?.reset();

    return {
        success: true,
        validData: result.data as T
    };
};