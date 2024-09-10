import { Box, Card, Checkbox, Group, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUpdate } from "@refinedev/core";
import { DeleteButton, SaveButton } from "@refinedev/mantine";
import { useQueryClient } from "@tanstack/react-query";
import { PermissionResponse } from "../types";

interface PermissionCardProps {
    data: PermissionResponse & { roleId: number };
}

const PermissionCard = ({ data: permission }: PermissionCardProps) => {
    const queryClient = useQueryClient();
    const { getInputProps, isDirty, onSubmit } = useForm({
        initialValues: permission,
    });
    const { mutate: update, isLoading: isUpdating } = useUpdate({
        resource: "permissions",
        id: permission.id,
        mutationOptions: {
            onSuccess(data, variables, context) {
                queryClient.setQueryData(
                    ["roles", permission.roleId.toString(), "permissions"],
                    (prev: any) => {
                        const temp = prev.data.map((p: PermissionResponse) => {
                            if (p.id === data.data.id) {
                                return data.data
                            }
                            return p;
                        });
                        return {
                            data: temp,
                            total: temp.length
                        }
                    }
                );
            },
        }
    })

    function successfullDeleteHandler() {
        queryClient.setQueryData(
            ["roles", permission.roleId.toString(), "permissions"],
            (prev: any) => {
                const temp = prev.data.filter((p: PermissionResponse) => p.id !== permission.id);
                return {
                    data: temp,
                    total: temp.length
                }
            }
        );
    }
    function editHandler(values: any) {
        update({
            values
        })
    }
    return (
        <form onSubmit={onSubmit(editHandler)}>
            <Card withBorder shadow="xs">
                <Stack>
                    <Box>
                        <Text fw={500}>Resource:</Text>
                        <Text c="dimmed">{permission.entity}</Text>
                    </Box>
                    <Checkbox
                        label="Create"
                        {...getInputProps("createR")}
                        checked={getInputProps("createR").value}
                    />
                    <Checkbox
                        label="Read"
                        {...getInputProps("readR")}
                        checked={getInputProps("readR").value}
                    />
                    <Checkbox
                        label="Update"
                        {...getInputProps("editR")}
                        checked={getInputProps("editR").value}
                    />
                    <Checkbox
                        label="Delete"
                        {...getInputProps("deleteR")}
                        checked={getInputProps("deleteR").value}
                    />
                    <Group position="right">
                        <DeleteButton size='xs' resource="permissions" recordItemId={permission.id} onSuccess={successfullDeleteHandler} />
                        <SaveButton type="submit" disabled={!isDirty() || isUpdating} size="xs" />
                    </Group>
                </Stack>
            </Card>
        </form>
    );
};

export default PermissionCard;
