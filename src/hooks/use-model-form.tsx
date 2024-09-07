import { useEffect, useState } from "react";
import { UseModalFormProps as UseMantineModalFormProps, useModalForm as useMantineModalFOrm } from "@refinedev/mantine";
import { zodResolver } from "@mantine/form";
import { ZodSchema } from "zod";

interface UseModalFormProps extends UseMantineModalFormProps {
    schema: ZodSchema<Record<string, any>>;
}

export function useModalForm({ schema, ...props }: UseModalFormProps) {
    const [action, setAction] = useState<'create' | 'edit'>('create');
   
    const createDefaultOptions = {
        refineCoreProps: { action: 'create' },
        initialValues: props.initialValues,
        validate: zodResolver(schema)
    }
    const createOptions = Object.assign({}, createDefaultOptions, props)
    const modalCreateForm = useMantineModalFOrm(createOptions);

    const editDefaultOptions = {
        refineCoreProps: { action: 'edit' },
        initialValues: props.initialValues,
        validate: zodResolver(schema)
    }
    const editOptions = Object.assign({}, editDefaultOptions, props)
    const modalEditForm = useMantineModalFOrm(editOptions);

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
            modalCreateForm.setValues(props.initialValues as Record<string, unknown>);
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