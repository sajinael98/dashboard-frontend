"use client"

import { Group, Select } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PermissionModalForm, PermissionsList } from '@modules/permissions/presentation'
import { CreateButton, List, useSelect } from '@refinedev/mantine'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

const PermissionPage = () => {
    const params = useSearchParams()
    const roleId = params.get("roleId") || undefined

    const [opened, { open, close }] = useDisclosure(false)

    const { selectProps, query: { isFetching: isRolesFetching }, defaultValueQuery: { isLoading, isError } } = useSelect<RoleResponse>({
        debounce: 1000,
        resource: "roles",
        defaultValue: roleId,
        optionLabel: item => item.role,
        optionValue: item => item.id.toString(),
        onSearch(value) {
            if (value) {
                return [
                    {
                        field: 'role',
                        operator: 'eq',
                        value
                    }
                ]
            }
            return []
        },
    })

    function createHandler() {
        open()
    }

    return (
        <>
            {(!isError && !isLoading && !!roleId) && <PermissionModalForm close={close} opened={opened} roleId={roleId as any} />}
            <List>
                <Group position='apart' mb='md'>
                    <Select
                        disabled={isRolesFetching}
                        defaultValue={roleId}
                        placeholder='select a role'
                        {...selectProps}
                        withinPortal
                        withAsterisk
                    />
                    {(!isError && !isLoading && !!roleId) && <CreateButton onClick={createHandler} />}
                </Group>
                <Suspense fallback={<div>loading...</div>}>
                    {(!isError && !isLoading && !!roleId) && <PermissionsList roleId={parseInt(roleId)} />}
                </Suspense>
            </List>
        </>
    )
}

export default PermissionPage