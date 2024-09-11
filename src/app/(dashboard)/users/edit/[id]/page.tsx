"use client"

import { FormProvider } from '@hooks/use-form';
import { useUserForm } from '@modules/users/infrastructure';
import { UserForm } from '@modules/users/presentation';
import { Edit } from '@refinedev/mantine';
import React from 'react'

const EditUserPage = () => {
    const { saveButtonProps, refineCore, ...form } = useUserForm()
    return (
        <Edit saveButtonProps={saveButtonProps}>
            <FormProvider form={form as any}>
                <UserForm />
            </FormProvider>
        </Edit>
    );
}

export default EditUserPage