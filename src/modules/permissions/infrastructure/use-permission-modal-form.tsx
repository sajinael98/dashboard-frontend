import { useModalForm } from "@hooks/use-model-form";
import { z } from "zod";

const schema = z.object({
    resource: z.string().min(1, { message: 'is required' }),
    create: z.boolean(),
    read: z.boolean(),
    update: z.boolean(),
    delete: z.boolean(),
})

const initialValues = {
    resource: '',
    create: false,
    read: false,
    update: false,
    delete: false
};

interface UsePermissionModalFormProps {
    resourceId?: number
}

export function usePermissionModalForm({ resourceId }: UsePermissionModalFormProps) {
    return useModalForm({
        initialValues,
        schema,
        refineCoreProps: {
            resource: 'roles',
            mutationMeta: {
                headers: {
                    'x-resource-id': resourceId,
                    'x-sub-resouce': 'permissions'
                },
            }
        }
    })
}