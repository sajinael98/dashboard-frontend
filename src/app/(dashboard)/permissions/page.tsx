"use client"

import { Group, Select, SimpleGrid } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { PermissionCard, PermissionModalForm } from '@modules/permissions/presentation'
import { useList } from '@refinedev/core'
import { CreateButton, List } from '@refinedev/mantine'
import { useMemo, useState } from 'react'

const PermissionPage = () => {
    const [opened, { open, close }] = useDisclosure(false)
    // resourceId stand for roleId
    const [resourceId, setResourceId] = useState<number | undefined>()
    const { data: roles, isFetching: isRolesFetching } = useList({
        resource: 'roles',
        queryOptions: {

        }
    })

    const { data: permissions, isFetching } = useList({
        resource: 'roles',
        meta: {
            headers: {
                'x-resource-id': resourceId,
                'x-sub-resource': 'permissions',
            }
        },
        queryOptions: {
            queryKey: ['roles', resourceId, 'permissions'],
            enabled: !!resourceId
        }
    })
    const rolesData = useMemo(() => roles?.data.map(role => ({ label: role.role, value: role.id })) || [], [roles])

    function createHandler() {
        if (!resourceId) {
            showNotification({
                message: 'role is required',
                color: 'red'
            })
            return
        }
        open()
    }
    console.log(permissions)
    return (
        <>
            <PermissionModalForm close={close} opened={opened} roleId={resourceId} />
            <List>
                <Group position='apart'>
                    <Select
                        disabled={isRolesFetching}
                        placeholder='select a role'
                        data={rolesData as any}
                        onChange={(value) => {
                            if (value) {
                                setResourceId(parseInt(value))
                            } else {
                                setResourceId(undefined)
                            }
                        }}
                        clearable
                        withinPortal
                    />
                    <CreateButton onClick={createHandler} />
                </Group>
                {isFetching && <div>loading...</div>}
                {permissions?.data && <SimpleGrid mt='md' cols={4}>
                    {permissions?.data.map(p => <PermissionCard key={p.id} data={{ ...p, roleId: resourceId as number }} />)}
                </SimpleGrid>}
            </List>
        </>
    )
}

export default PermissionPage