import { useForm } from "@hooks/use-form";
import { z } from "zod";

const schema = z.object({
    firstName: z.string().min(1, { message: 'required' }),
    lastName: z.string().min(1, { message: 'required' }),
    username: z.string().min(1, { message: 'required' }),
    email: z.string().email({ message: "required" }),
})

export function useUserForm() {
    return useForm({
        schema,
        initialValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: ''
        }
    })
}