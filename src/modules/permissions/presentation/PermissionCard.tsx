import { Box, Card, Checkbox, Group, Stack, Text } from "@mantine/core";
import { PermissionResponse } from "../types";
import { useForm } from "@mantine/form";
import { DeleteButton, SaveButton } from "@refinedev/mantine";
import { useCustomMutation } from "@refinedev/core";
import { useQueryClient } from "@tanstack/react-query";

interface PermissionCardProps {
  data: PermissionResponse & { roleId: number };
}
const PermissionCard = ({ data: permission }: PermissionCardProps) => {
  const queryClient = useQueryClient();
  const { getInputProps, isDirty } = useForm({
    initialValues: permission,
  });

  const { mutate: deletePermission } = useCustomMutation({
    mutationOptions: {
      onSettled(data, error, variables, context) {
        if ((data.status as number) === 200) {
          queryClient.setQueryData(
            ["roles", permission.roleId.toString(), "permissions"],
            () => ({
              data: data?.data.data,
              total: data?.data.data.length,
            })
          );
        }
      },
    },
  });

  function deleteHandler(){
    deletePermission({
        method: 'delete',
        
    })
  }
  return (
    <form>
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
            <DeleteButton size="xs" variant="light" />
            <SaveButton disabled={!isDirty()} size="xs" />
          </Group>
        </Stack>
      </Card>
    </form>
  );
};

export default PermissionCard;
