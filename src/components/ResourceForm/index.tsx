import { FormProvider } from '@hooks/use-form';
import { zodResolver } from '@mantine/form';
import { useResourceParams } from '@refinedev/core';
import { Create, CreateProps, Edit, EditProps, UseFormProps, useForm } from '@refinedev/mantine';
import { getDefaults } from '@utils/zod';
import React from 'react';
import { ZodObject } from 'zod';

interface OptimizedCreateProps extends CreateProps {
    type: "create"
}

interface OptimizedEditProps extends EditProps {
    type: "edit"
}

interface OptimizedUseFormProps extends UseFormProps {
    schema: ZodObject<any>
}

interface ResourceFormProps {
    form: React.ReactNode;
    formProps?: OptimizedUseFormProps
    pageProps?: OptimizedCreateProps | OptimizedEditProps
}

const ResourceForm = ({ form: resourceForm, formProps, pageProps }: ResourceFormProps) => {
    const { identifier, action } = useResourceParams()
    const { refineCore, saveButtonProps, ...form } = useForm(formProps && { ...formProps, validate: zodResolver(formProps.schema), initialValues: getDefaults(formProps.schema) })

    if (action === "create")
        return <Create {...pageProps as OptimizedCreateProps} saveButtonProps={saveButtonProps}>
            <FormProvider form={form as any}>
                {resourceForm}
            </FormProvider>
        </Create>
    else if (action === "edit") {
        return <Edit {...pageProps} saveButtonProps={saveButtonProps}>
            <FormProvider form={form as any}>
                {resourceForm}
            </FormProvider>
        </Edit>
    }
}

export default ResourceForm