import { Table } from '@components/Table'
import { ModalContext } from '@contexts/modal-context'
import { FormProvider } from '@hooks/use-form'
import { UseModalFormReturn } from '@hooks/use-model-form'
import { Modal } from '@mantine/core'
import { BaseRecord } from '@refinedev/core'
import { DeleteButton, EditButton } from '@refinedev/mantine'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { PropsWithChildren, useContext, useMemo } from 'react'

interface ResourceTableWithDialogProps {
    columns: ColumnDef<BaseRecord, any>[];
    canDelete?: boolean;
    canEdit?: boolean;
    modalProps: UseModalFormReturn
}

const ResourceTableWithDialog = ({ columns, canDelete = true, canEdit = true, children, modalProps: { modal, ...form } }: PropsWithChildren<ResourceTableWithDialogProps>) => {
    const { close, opened } = useContext(ModalContext)

    const tableColumns = useMemo<ColumnDef<any>[]>(() => {
        if (canEdit || canDelete) {
           
            return [...columns, {
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
                            {canEdit && <EditButton onClick={() => {
                                form.onEdit(getValue() as number)
                            }} />}
                            {canDelete && <DeleteButton recordItemId={getValue() as number} />}
                        </div>
                    );
                },
            }];
        }
        return columns
    }, [canDelete, canEdit])

    const {
        getHeaderGroups,
        getRowModel,
        refineCore: { setCurrent, pageCount, current },
    } = useTable({
        columns: tableColumns,
        state: {
            pagination: {
                pageIndex: 0,
                pageSize: 20,
            },
        },
    });
    function closeHandler() {
        close()
        modal.close()
    }
    return (
        <>
            <Modal opened={opened || modal.visible} onClose={closeHandler} title={modal.title}>
                <FormProvider form={form as any}>
                    {children}
                </FormProvider>
            </Modal>
            <Table
                headerGroups={getHeaderGroups()}
                rows={getRowModel().rows}
                page={current}
                total={pageCount}
                setPage={setCurrent}
            />
        </>
    )
}

export default ResourceTableWithDialog