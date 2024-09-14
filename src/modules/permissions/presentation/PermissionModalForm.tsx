import resources from "@data/resources.json";
import { Box, Checkbox, Modal, Select } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useCustomMutation } from "@refinedev/core";
import { SaveButton } from "@refinedev/mantine";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";

interface PermissionModalFormProps {
  roleId: number | undefined;
  opened: boolean;
  close: () => void;
}

const schema = z.object({
  entity: z.string(),
  createR: z.boolean(),
  readR: z.boolean(),
  editR: z.boolean(),
  deleteR: z.boolean(),
});

const PermissionModalForm = ({
  roleId,
  close,
  opened,
}: PermissionModalFormProps) => {
  const queryClient = useQueryClient();
  const { getInputProps, onSubmit, reset } = useForm({
    initialValues: {
      entity: "",
      createR: false,
      readR: false,
      editR: false,
      deleteR: false,
    },
    validate: zodResolver(schema),
  });
  const { mutate } = useCustomMutation({
    mutationOptions: {
      onSettled(data, error, variables, context) {
        if (data && ((data as any).status as number) === 200) {
          close();
          reset();
          queryClient.setQueryData(["roles", roleId, "permissions"], () => ({
            data: data?.data.data,
            total: data?.data.data.length,
          }));
        }
      },
    },
  });

  function saveHandler(values: any) {
    mutate({
      method: "post",
      url: `roles/${roleId}/permissions`,
      values,
    });
  }

  return (
    <Modal opened={opened} onClose={close} title={"Create Permission"}>
      <form onSubmit={onSubmit(saveHandler)}>
        <Select
          placeholder="select a entity"
          data={resources.resources}
          {...getInputProps("entity")}
        />
        <Checkbox
          mt={8}
          label="Create"
          {...getInputProps("createR")}
          checked={getInputProps("createR").value}
        />
        <Checkbox
          mt={8}
          label="Read"
          {...getInputProps("readR")}
          checked={getInputProps("readR").value}
        />
        <Checkbox
          mt={8}
          label="Update"
          {...getInputProps("editR")}
          checked={getInputProps("editR").value}
        />
        <Checkbox
          mt={8}
          label="Delete"
          {...getInputProps("deleteR")}
          checked={getInputProps("deleteR").value}
        />
        <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <SaveButton type="submit" onClick={undefined} />
        </Box>
      </form>
    </Modal>
  );
};

export default PermissionModalForm;
