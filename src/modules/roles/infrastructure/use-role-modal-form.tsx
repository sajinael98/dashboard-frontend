import { useModalForm } from "@hooks/use-model-form";
import { z } from "zod";

const schema = z.object({
  role: z.string().min(1, { message: "is required" }),
});

const initialValues = {
  role: "",
  enabled: true,
};

export function useRoleModalForm() {
  return useModalForm({
    initialValues,
    schema,
  });
}
