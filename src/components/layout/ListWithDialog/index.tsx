import { Table } from '@components/Table';
import { BaseRecord } from '@refinedev/core';
import { List } from '@refinedev/mantine';
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import React, { PropsWithChildren } from 'react'

interface ResourceListPageProps {
    resource: string;
    columns: ColumnDef<BaseRecord, any>[]

}

const ResourceListWithDialogPage = ({ resource, columns, children }: PropsWithChildren<ResourceListPageProps>) => {
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
            {children}
            <List canCreate>
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

export default ResourceListWithDialogPage