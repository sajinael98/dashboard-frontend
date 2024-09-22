"use client"

import { Table } from '@components/Table'
import { Checkbox } from '@mantine/core'
import { useCategoryModalForm } from '@modules/categories/infastructure'
import { CateogryModalForm } from '@modules/categories/presentation'
import { DeleteButton, EditButton, List } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'

const CategoriesListPage = () => {
    const modalForm = useCategoryModalForm()
    const columns = useMemo<ColumnDef<CategoryResponse>[]>(() => [
        {
            id: "title",
            header: "Title",
            accessorKey: "title"
        },
        {
            id: "enabled",
            header: "Enabled",
            accessorKey: "enabled",
            cell: ({ getValue }) => <Checkbox disabled checked={getValue() as boolean} />
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
                        <EditButton
                            onClick={() => modalForm.editHandler(getValue() as number)}
                        />
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
        <>
            <CateogryModalForm modalForm={modalForm} />
            <List canCreate createButtonProps={{ onClick: () => modalForm.modal.show() }}>
                <Table
                    headerGroups={getHeaderGroups()}
                    rows={getRowModel().rows}
                    page={current}
                    total={pageCount}
                    setPage={setCurrent}
                />
            </List>
        </>
    )
}

export default CategoriesListPage