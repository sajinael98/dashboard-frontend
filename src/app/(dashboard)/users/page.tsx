"use client"

import React, { useMemo } from 'react'
import { DeleteButton, EditButton, EmailField, List } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table';
import { ColumnDef } from '@tanstack/react-table';
import { Table } from '@components/Table';
import { User } from '@modules/users/types';

const UsersListPage = () => {
  const columns = useMemo<ColumnDef<User & { id: number }>[]>(() => [
    {
      accessorKey: 'username',
      header: 'Username'
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell({ getValue }) {
        return <EmailField value={getValue() as string} />
      }
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
        pageSize: 20
      }
    }
  })
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

export default UsersListPage