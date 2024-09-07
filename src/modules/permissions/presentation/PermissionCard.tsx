import { Box, Card, Checkbox, Group, Stack, Text } from '@mantine/core'
import { PermissionResponse } from '../types'
import { useForm } from '@mantine/form'
import { DeleteButton, SaveButton } from '@refinedev/mantine'

interface PermissionCardProps {
    data: PermissionResponse & { roleId: number }
}
const PermissionCard = ({ data }: PermissionCardProps) => {
    const { getInputProps } = useForm({
        initialValues: data
    })
    return (
        <form>
            <Card withBorder shadow='xs'>
                <Stack>
                    <Box>
                        <Text fw={500}>
                            Resource:
                        </Text>
                        <Text c='dimmed'>{data.entity}</Text>
                    </Box>
                    <Checkbox
                        label='Create'
                        {...getInputProps('createR')}
                        checked={getInputProps('createR').value}
                    />
                    <Checkbox
                        label='Read'
                        {...getInputProps('readR')}
                        checked={getInputProps('readR').value}
                    />
                    <Checkbox
                        label='Update'
                        {...getInputProps('editR')}
                        checked={getInputProps('editR').value}
                    />
                    <Checkbox
                        label='Delete'
                        {...getInputProps('deleteR')}
                        checked={getInputProps('deleteR').value}
                    />
                    <Group position='right'>
                        <DeleteButton size='xs' variant='light' />
                        <SaveButton  size='xs'/>
                    </Group>
                </Stack>
            </Card>
        </form>
    )
}

export default PermissionCard