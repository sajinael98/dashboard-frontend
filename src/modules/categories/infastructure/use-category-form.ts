import { useModalForm } from "@hooks/use-model-form";
import { z } from "zod";

const schema = z.object({
    title: z.string().min(1, { message: "required" }),
    enabled: z.boolean()
})

export function useCategoryModalForm() {
    return useModalForm({
        schema,
        initialValues: {
            title: undefined,
            enabled: true
        }
    })
}