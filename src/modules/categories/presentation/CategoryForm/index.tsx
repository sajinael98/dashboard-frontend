import { useFormContext } from "@hooks/use-form";
import { Checkbox, TextInput } from "@mantine/core";

const CateogryModalForm = () => {
  const { getInputProps } = useFormContext()
  return (
    <>
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
    </>
  );
};

export default CateogryModalForm;
