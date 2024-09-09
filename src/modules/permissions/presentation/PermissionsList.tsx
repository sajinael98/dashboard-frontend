import { SimpleGrid } from '@mantine/core';
import { useList } from '@refinedev/core';
import React from 'react'
import PermissionCard from './PermissionCard';

interface PermissionsListProps {
    roleId: number;
}

const PermissionsList = ({ roleId }: PermissionsListProps) => {
    const { data } = useList({
        resource: 'roles',
        meta: {
            headers: {
                'x-resource-id': roleId,
                'x-sub-resource': 'permissions',
            }
        },
        queryOptions: {
            queryKey: ['roles', roleId.toString(), 'permissions'],
        }
    })
    console.log(data?.data)
    return (
        <SimpleGrid
            breakpoints={[
                {
                    minWidth: 'sm',
                    cols: 1
                },
                {
                    minWidth: 'md',
                    cols: 2
                },
                {
                    minWidth: 'xl',
                    cols: 3
                }
            ]}
        >
            {
                data?.data.map((permission) => <PermissionCard key={permission.id} data={{ ...permission, roleId: roleId } as any} />)
            }
        </SimpleGrid>
    )
}

export default PermissionsList