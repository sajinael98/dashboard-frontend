import { Table } from '@components/Table'
import { BaseRecord } from '@refinedev/core'
import { DeleteButton, EditButton } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import React from 'react'

interface ResourceTableProps {
    columns: ColumnDef<BaseRecord, any>[];
    canDelete?: boolean;
    canEdit?: boolean;
    withDialog?: boolean
}

const ResourceTable = ({ columns, canDelete = true, canEdit = true, withDialog = false }: ResourceTableProps) => {
    if (canEdit || canDelete) {
        const editHandler = () => {

        }
        columns.push({
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
                        {canEdit && <EditButton onClick={editHandler} />}
                        {canDelete && <DeleteButton recordItemId={getValue() as number} />}
                    </div>
                );
            },
        },)
    }
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
        <Table
            headerGroups={getHeaderGroups()}
            rows={getRowModel().rows}
            page={current}
            total={pageCount}
            setPage={setCurrent}
        />
    )
}

export default ResourceTable