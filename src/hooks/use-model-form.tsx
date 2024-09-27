import { useEffect, useState } from "react";
import {
  UseModalFormProps as UseMantineModalFormProps,
  useModalForm as useMantineModalFOrm,
  UseModalFormReturnType as UseMantineModalFormReturnType
} from "@refinedev/mantine";
import { zodResolver } from "@mantine/form";
import { ZodSchema } from "zod";

export interface UseModalFormProps extends UseMantineModalFormProps {
  schema: ZodSchema<Record<string, any>>;
}

export interface UseModalFormReturn extends UseMantineModalFormReturnType {
  onCreate: () => void
  onEdit: (id: number) => void
}

export function useModalForm({ schema, ...props }: UseModalFormProps): UseModalFormReturn {
  const [action, setAction] = useState<"create" | "edit">("create");

  const createDefaultOptions = {
    refineCoreProps: { action: "create" },
    initialValues: props.initialValues,
    validate: zodResolver(schema),
  };
  const createOptions = Object.assign({}, createDefaultOptions, props);
  const modalCreateForm = useMantineModalFOrm(createOptions);

  const editDefaultOptions = {
    refineCoreProps: { action: "edit" },
    initialValues: props.initialValues,
    validate: zodResolver(schema),
  };
  const editOptions = Object.assign({}, editDefaultOptions, props);
  const modalEditForm = useMantineModalFOrm(editOptions);

  function createHandler() {
    setAction(() => {
      modalCreateForm.modal.show();
      return "create";
    });
  }

  function editHandler(id: number) {
    setAction(() => {
      modalEditForm.modal.show(id);
      return "edit";
    });
  }

  const { isDirty, modal, setValues, reset } = modalCreateForm;
  useEffect(() => {
    if (isDirty() && !modal.visible) {
      setValues(props.initialValues as Record<string, unknown>);
    }
  }, [modal.visible, isDirty, props.initialValues, setValues]);

  useEffect(() => {
    if (isDirty() && !modal.visible) {
      reset();
    }
  }, [modal.visible, isDirty, reset]);

  if (action === "create") {
    return { onCreate: createHandler, onEdit: editHandler, ...modalCreateForm };
  }
  return { onCreate: createHandler, onEdit: editHandler, ...modalEditForm };
}
