"use client"

import { FormProvider } from '@hooks/use-form';
import { Button } from '@mantine/core';
import { useUserForm } from '@modules/users/infrastructure';
import { UserForm } from '@modules/users/presentation';
import { useResourceParams } from '@refinedev/core';
import { Edit } from '@refinedev/mantine';
import { useRouter } from 'next/navigation';

const EditUserPage = () => {
    const { saveButtonProps, refineCore, ...form } = useUserForm()
    const { id } = useResourceParams()
    const router = useRouter();
    
    function navigateToRoleAssign() {
        router.push(`/users/${id}/roles`)
    }

    return (
        <Edit
            saveButtonProps={saveButtonProps}
            headerButtons={({ defaultButtons, listButtonProps, refreshButtonProps }) => {
                return <>
                    {defaultButtons}
                    <Button onClick={navigateToRoleAssign}>
                        Role Assignment
                    </Button>
                </>
            }}
        >
            <FormProvider form={form as any}>
                <UserForm />
            </FormProvider>
        </Edit>
    );
}

export default EditUserPage