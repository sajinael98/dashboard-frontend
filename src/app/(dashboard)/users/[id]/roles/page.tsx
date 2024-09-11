"use client"

import { Checkbox, Group, Paper, SimpleGrid, Text } from '@mantine/core'
import { useListState } from '@mantine/hooks'
import { useList } from '@refinedev/core'
import { SaveButton } from '@refinedev/mantine'
import { useEffect } from 'react'

const RoleAssignPage = ({ params: { id: userId } }: { params: Record<string, string> }) => {
    const { data } = useList({
        resource: "roles",
        pagination: {
            pageSize: 50
        }
    })
    const roles = data?.data.map(role => ({ role: role.role, id: role.id, checked: false })) || []
    const [values, handlers] = useListState(roles);

    const items = values.map((value, index) => (
        <Checkbox
            mt="xs"
            ml={33}
            label={value.role}
            key={value.id}
            checked={value.checked}
            onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));
    
    useEffect(() => {
        if (data?.data) {
            handlers.setState(roles)
        }
    }, [data?.data])

    return (
        <Paper p='md'>
            <Group position='apart' align='flex-start' mb='md'>
                <Text fw={500} fz='lg'>Role Assignment</Text>
                <SaveButton />
            </Group>
            <SimpleGrid
                breakpoints={[
                    {
                        minWidth: 'lg',
                        cols: 4
                    },
                    {
                        minWidth: 'md',
                        cols: 3
                    },
                    {
                        minWidth: 'xs',
                        cols: 1
                    }
                ]}
            >
                {items}
            </SimpleGrid>
        </Paper>
    )
}

export default RoleAssignPage