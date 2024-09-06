import { Box, Checkbox, Modal, TextInput } from '@mantine/core'
import { SaveButton, UseModalFormReturnType } from '@refinedev/mantine'

interface RoleModalFormProps {
    modalForm: UseModalFormReturnType
}

const RoleModalForm = ({ modalForm }: RoleModalFormProps) => {
    const { getInputProps, saveButtonProps, modal: { close, visible, title } } = modalForm
    return (
        <Modal opened={visible} onClose={close} title={title}>
            <TextInput
                mt={8}
                label="Role"
                placeholder="Role"
                {...getInputProps("role")}
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
    )
}

export default RoleModalForm