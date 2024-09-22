import { Box, Checkbox, Modal, TextInput } from "@mantine/core";
import { SaveButton, UseModalFormReturnType } from "@refinedev/mantine";

interface CateogryModalFormProps {
  modalForm: UseModalFormReturnType;
}

const CateogryModalForm = ({ modalForm }: CateogryModalFormProps) => {
  const {
    getInputProps,
    saveButtonProps,
    modal: { close, visible, title },
  } = modalForm;
  return (
    <Modal opened={visible} onClose={close} title={title}>
      <TextInput
        mt={8}
        label="Title"
        placeholder="title"
        {...getInputProps("title")}
      />
      <Checkbox
        mt={8}
        label="Enabled"
        {...getInputProps("enabled")}
        checked={getInputProps("enabled").value}
      />
      <Box mt={8} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <SaveButton {...saveButtonProps} />
      </Box>
    </Modal>
  );
};

export default CateogryModalForm;
