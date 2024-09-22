"use client"

import { Table } from '@components/Table';
import { Item } from '@modules/items/types';
import { DeleteButton, EditButton, List } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react'

const ItemsListPage = () => {
    const columns = useMemo<ColumnDef<Item>[]>(() => [
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

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns,
        state: {
            pagination: {
                pageIndex: 0,
                pageSize: 20,
            },
        },
    });
    return (
        <List canCreate>
            <Table
                headerGroups={getHeaderGroups()}
                rows={getRowModel().rows}
                page={current}
                total={pageCount}
                setPage={setCurrent}
            />
        </List>
    )
}

export default ItemsListPage