"use client"

import { FormProvider } from '@hooks/use-form'
import { Box, Button, Checkbox, Group, LoadingOverlay, Menu, Modal, Pagination, Table, TextInput } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { useResourceParams } from '@refinedev/core'
import { CreateButtonProps, List, SaveButton, UseModalFormProps, useModalForm } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table'
import { IconAdjustmentsHorizontal, IconMenu2, IconTrash } from '@tabler/icons-react'
import { ColumnDef, flexRender } from '@tanstack/react-table'
import { BaseResponse } from '@types'
import { getDefaults } from '@utils/zod'
import React, { useMemo, useState } from 'react'
import { ZodObject } from 'zod'

interface MenuItem {
    label: string;
    icon?: React.ReactNode;
    onClick: (rows: any[]) => void
}

interface ModalFormProps extends UseModalFormProps {
    form: React.ReactNode;
    schema?: ZodObject<any>;
}

interface ResourceListPageProps<T extends BaseResponse> {
    columns: ColumnDef<T>[];
    menuItems?: MenuItem[];
    formDialog?: ModalFormProps | undefined
}

const ResourceListPage = <T extends BaseResponse>({ columns, menuItems = [], formDialog }: ResourceListPageProps<T>) => {
    const { identifier } = useResourceParams()
    if (!identifier) {
        throw Error("error")
    }
    const [action, setAction] = useState<"create" | "edit">("create")
    const { modal, refineCore: { formLoading }, saveButtonProps, ...form } = useModalForm({
        refineCoreProps: {
            action: action
        },
        validate: formDialog?.schema && zodResolver(formDialog?.schema),
        initialValues: formDialog?.schema && getDefaults(formDialog?.schema),
    })
    const [filtersModalOpened, { open: openFiltersModal, close: closeFiltersModal }] = useDisclosure(false)
    const tableColumns = useMemo<ColumnDef<T>[]>(() => [
        {
            id: "selection",
            accessorKey: "id",
            enableSorting: false,
            enableColumnFilter: false,
            size: 20,
            header: function render({ table }) {
                return (
                    <Checkbox
                        styles={{ label: { display: "none" } }}
                        checked={table.getIsAllRowsSelected()}
                        indeterminate={table.getIsSomeRowsSelected()}
                        onChange={table.getToggleAllRowsSelectedHandler()}
                        size='xs'
                    />
                );
            },
            cell: function render({ row }) {
                return (
                    <Checkbox
                        styles={{ label: { display: "none" } }}
                        checked={row.getIsSelected()}
                        indeterminate={row.getIsSomeSelected()}
                        onChange={row.getToggleSelectedHandler()}
                        size='xs'
                    />
                );
            },
        },
        ...columns
    ], [])

    const {
        getHeaderGroups,
        getRowModel,
        resetRowSelection,
        getSelectedRowModel,
        refineCore: {
            tableQuery: { isLoading, isFetching },
            setCurrent,
            pageCount,
            current,
        },
    } = useTable({
        columns: tableColumns,
        getRowId: (originalRow) => originalRow.id.toString(),

    })

    function deleteHandler() {
        const ids = Object.keys(getSelectedRowModel().rowsById);
        if (!ids.length) {
            showNotification({
                color: 'red',
                message: "No selected rows!"
            })
            return;
        }
    }
    function closeHandler() {
        modal.close()
    }
    const createButtonProps: CreateButtonProps = formDialog ? {
        onClick: () => {
            setAction("create");
            form.reset();
            modal.show(0);
        }
    } : saveButtonProps
    return (
        <>
            {formDialog && <FormProvider form={form as any}>
                <Modal opened={modal.visible} title={modal.title} onClose={closeHandler}>
                    <LoadingOverlay visible={formLoading} />
                    <form >
                        {formDialog.form}
                    </form>
                    <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
                        <SaveButton {...saveButtonProps} />
                    </Box>
                </Modal>
            </FormProvider>
            }
            <List canCreate createButtonProps={createButtonProps}>
                <LoadingOverlay visible={isLoading || isFetching} />
                <Group mb='md' position='apart'>
                    <Box>
                        <TextInput placeholder='Search for id' size='xs' />
                    </Box>
                    <Group>
                        <Modal title="Filters" opened={filtersModalOpened} onClose={closeFiltersModal}>

                        </Modal>
                        <Button size='xs' variant='outline' leftIcon={<IconAdjustmentsHorizontal />} onClick={openFiltersModal}>
                            Filters
                        </Button>
                        <Menu withinPortal withArrow>
                            <Menu.Target>
                                <Button size='xs' variant='outline' leftIcon={<IconMenu2 />}>
                                    Menu
                                </Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                                <Menu.Item icon={<IconTrash size="1rem" />} onClick={deleteHandler}>Delete</Menu.Item>
                                {menuItems.map(({ label, onClick, icon: Icon }, index) => {
                                    return <Menu.Item key={index} icon={Icon} onClick={() => onClick(getSelectedRowModel().flatRows.map(row => row.original))}>{label}</Menu.Item>
                                })}
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                </Group>
                <Table highlightOnHover withBorder withColumnBorders fontSize="xs" mb='md' sx={{
                    "& td": {
                        border: "none",
                    }
                }}>
                    <Box component='thead' bg='gray.0'>
                        {getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} style={{ display: "table-row" }}>
                                {headerGroup.headers.map((header) => (
                                    <Box component='th' key={header.id} sx={(theme) => ({ width: header.getSize(), color: `${theme.colors.gray[7]} !important` })}>
                                        {!header.isPlaceholder && (
                                            <>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                            </>
                                        )}
                                    </Box>
                                ))}
                            </tr>
                        ))}
                    </Box>
                    <tbody>
                        {getRowModel().rows.map((row) => {
                            return (
                                <React.Fragment key={row.id}>
                                    <tr
                                        style={{cursor: "pointer"}}
                                        key={row.id} onDoubleClick={() => {
                                            setAction("edit")
                                            modal.show(row.id);
                                        }}
                                    >
                                        {row.getVisibleCells().map((cell) => {
                                            return (
                                                <td key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext(),
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </Table>

                <Pagination
                    position="right"
                    total={pageCount || 1}
                    page={current}
                    onChange={setCurrent}
                />
            </List>
        </>
    )
}

export default ResourceListPage