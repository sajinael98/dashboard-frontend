"use client"

import { FormProvider } from '@hooks/use-form'
import { useItemForm } from '@modules/items/infrastructure'
import ItemForm from '@modules/items/presentation/ItemForm'
import { Create } from '@refinedev/mantine'

const CreateItemPage = () => {
  const form = useItemForm()
  return (
    <Create saveButtonProps={form.saveButtonProps}>
      <FormProvider form={form as any}>
        <ItemForm />
      </FormProvider>
    </Create>
  )
}

export default CreateItemPage