import { useForm } from "@hooks/use-form";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, { message: "required" }),
    price: z.number().min(1, { message: "required" }),
    category: z.number().min(1, { message: "required" }),
    image: z.string().min(1, { message: "required" })
})

export function useItemForm() {
    return useForm({
        schema,
        initialValues: {
            title: undefined,
            price: 0,
            category: 0,
            image: undefined
        }
    })
}