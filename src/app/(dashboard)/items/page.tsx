"use client"

import ResourceTable from '@components/ResourceTable'
import { DeleteButton, EditButton } from '@refinedev/mantine';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react'

const ItemsListPage = () => {
    const columns = useMemo<ColumnDef<any>[]>(() => [
        {
            id: "title",
            header: "Title",
            accessorKey: "title"
        },
        {
            id: "actions",
            accessorKey: "id",
            header: "Actions",
            cell: function render({ getValue }) {
                return (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "wrap",
                            gap: "4px",
                        }}
                    >
                        <EditButton recordItemId={getValue() as number} />
                        <DeleteButton recordItemId={getValue() as number} />
                    </div>
                );
            },
        },
    ], [])

    return (
        <ResourceTable columns={columns as any} />
    )
}

export default ItemsListPage