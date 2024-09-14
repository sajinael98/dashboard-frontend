import { createFormContext, zodResolver } from "@mantine/form";
import {
  UseFormProps as UseMantineFormProps,
  useForm as useMantineForm,
} from "@refinedev/mantine";
import { ZodObject } from "zod";

interface UseFormProps extends UseMantineFormProps {
  schema: ZodObject<any>;
}

export function useForm({ schema, initialValues, ...props }: UseFormProps) {
  return useMantineForm({
    validate: zodResolver(schema),
    initialValues: {
      id: undefined,
      ...initialValues,
    },
    ...props,
  });
}

export const [FormProvider, useFormContext] = createFormContext();
