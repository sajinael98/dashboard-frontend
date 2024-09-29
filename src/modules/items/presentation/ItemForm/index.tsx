import ResourceForm from '@components/ResourceForm'
import { itemSchema } from '@modules/items/infrastructure/use-item-from'
import ItemFormLayout from '../ItemFormLayout'

const ItemForm = () => {
  return (
    <ResourceForm
      formProps={{
        schema: itemSchema
      }}
      form={<ItemFormLayout />}
    />
  )
}

export default ItemForm