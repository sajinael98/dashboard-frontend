import { useModalForm } from "@hooks/use-model-form";
import { z } from "zod";

export const categorySchema = z.object({
    title: z.string().min(1, { message: "required" }),
    enabled: z.boolean().default(true)
})

