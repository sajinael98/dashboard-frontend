"use client"

import { FormProvider } from '@hooks/use-form'
import { useItemForm } from '@modules/items/infrastructure'
import ItemForm from '@modules/items/presentation/ItemForm'
import { Edit } from '@refinedev/mantine'
import React from 'react'

const EditItemPage = () => {
    const form = useItemForm()
    return (
        <Edit saveButtonProps={form.saveButtonProps}>
            <FormProvider form={form as any}>
                <ItemForm />
            </FormProvider>
        </Edit>
    )
}

export default EditItemPage