import ResourceListPage from '@components/ResourceListPage'
import { useGetItemsTableColumns } from '@modules/items/infrastructure'
import React from 'react'

const ItemsListPage = () => {
   const columns =  useGetItemsTableColumns()
    return (
        <ResourceListPage columns={columns} />
    )
}

export default ItemsListPage