"use client"

import { Table } from '@components/Table'
import { useRoleModalForm } from '@modules/roles/infrastructure'
import RoleModalForm from '@modules/roles/presentation/RoleModalForm'
import { DeleteButton, EditButton, List } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

const RolesListPage = () => {
  const modalForm = useRoleModalForm()
  
  const columns = useMemo<ColumnDef<RoleResponse>[]>(() => [
    {
      accessorKey: 'role',
      header: 'Role'
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
            <EditButton onClick={() => modalForm.editHandler(getValue() as number)} />
            <DeleteButton recordItemId={getValue() as number} />
          </div>
        );
      },
    },
  ], [modalForm])

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
    <>
      <RoleModalForm modalForm={modalForm as any} />
      <List canCreate createButtonProps={{ onClick: () => modalForm.createHandler() }}>
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

export default RolesListPage