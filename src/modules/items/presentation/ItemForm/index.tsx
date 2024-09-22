import FileUploader from "@components/FileUploader";
import FormGrid from "@components/FormGrid";
import FormSection from "@components/FormSection";
import { useFormContext } from "@hooks/use-form";
import { NumberInput, Select, Text, TextInput } from "@mantine/core";
import { CrudFilter } from "@refinedev/core";
import { useSelect } from "@refinedev/mantine";

const ItemForm = () => {
  const { getInputProps, setValues, values } = useFormContext()

  const { selectProps } = useSelect({
    resource: "categories",
    onSearch(value) {
      const filters: CrudFilter[] = [{
        field: "enabled",
        operator: "eq",
        value: false
      }]
      if (value) {
        filters.push({
          field: "title",
          operator: "eq",
          value
        })
      }
      return filters
    },
    optionLabel(item) {
      return item.title
    },
    optionValue(item) {
      return item.id
    },
  })

  function uploadedImageHandler(fileName: string) {
    setValues({
      image: fileName
    })
  }

  return (
    <>
      <FormSection title="Information">
        <FormGrid>
          <TextInput
            label="Title"
            {...getInputProps("title")}
          />
          <NumberInput
            label="Price"
            {...getInputProps("price")}
          />
          <Select
            label="Category"
            {...selectProps}
            {...getInputProps("category")}
          />
        </FormGrid>
      </FormSection>
      <FormSection title="Image">
        <Text>{getInputProps("image").error}</Text>
        <FileUploader fileName={values.image} onSuccess={uploadedImageHandler} />
      </FormSection>
    </>
  )
}

export default ItemForm