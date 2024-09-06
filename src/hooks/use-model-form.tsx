import { useEffect, useState } from "react";
import { useModalForm as useMantineModalFOrm } from "@refinedev/mantine";
import { zodResolver } from "@mantine/form";
import { ZodSchema } from "zod";

interface UseModalFormProps {
    initialValues: object;
    schema: ZodSchema<Record<string, any>>;
}

export function useModalForm({ initialValues, schema }: UseModalFormProps) {
    const [action, setAction] = useState<'create' | 'edit'>('create');
    const modalCreateForm = useMantineModalFOrm({
        refineCoreProps: { action: 'create' },
        initialValues,
        validate: zodResolver(schema)
    });
    const modalEditForm = useMantineModalFOrm({
        refineCoreProps: { action: "edit" },
        initialValues,
        validate: zodResolver(schema)
    });

    function createHandler() {
        setAction(() => {
            modalCreateForm.modal.show()
            return 'create'
        })
    }

    function editHandler(id: number) {
        setAction(() => {
            modalEditForm.modal.show(id)
            return 'edit'
        });
    }

    useEffect(() => {
        if (modalCreateForm.isDirty() && !modalCreateForm.modal.visible) {
            modalCreateForm.setValues(initialValues);
        }
    }, [modalCreateForm.modal.visible, modalCreateForm.isDirty()])

    useEffect(() => {
        if (modalEditForm.isDirty() && !modalEditForm.modal.visible) {
            modalEditForm.reset();
        }
    }, [modalEditForm.modal.visible, modalEditForm.isDirty()])

    if (action === 'create') {
        return { createHandler, editHandler, ...modalCreateForm }
    }
    return { createHandler, editHandler, ...modalEditForm }
}