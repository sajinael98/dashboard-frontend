import FileUploader from "@components/FileUploader";
import FormGrid from "@components/FormGrid";
import FormSection from "@components/FormSection";
import { useFormContext } from "@hooks/use-form";
import { ActionIcon, Badge, Button, Group, NumberInput, Select, TextInput, Textarea } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { sizeSchema } from "@modules/items/infrastructure/use-item-from";
import { ItemResponse } from "@modules/items/types";
import { CrudFilter } from "@refinedev/core";
import { useSelect } from "@refinedev/mantine";
import { IconX } from "@tabler/icons-react";

const initialSizeValues = {
    size: '',
    price: 0,
    index: -1
}

const initialModifierValues =  {
    modifier: '',
    index: -1
}

const ItemFormLayout = () => {
    const { getInputProps: modifierFormInputsProps, onSubmit: onModifierFormSubmit, setValues: setModifierValues } = useForm({
        initialValues: initialModifierValues,
        validate: {
            modifier: (value) => !!value ? null : "required"
        }
    })

    const { getInputProps: sizeFormInputsProps, onSubmit: onSizeFormSubmit, setValues: setSizeValues } = useForm({
        initialValues: initialSizeValues,
        validate: zodResolver(sizeSchema)
    })

    const { getInputProps, setValues, values, removeListItem, insertListItem, setFieldError } = useFormContext()
    const formValues = values as ItemResponse;
    const { selectProps } = useSelect({
        resource: "categories",
        onSearch(value) {
            const filters: CrudFilter[] = [{
                field: "enabled",
                operator: "eq",
                value: true
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
    })

    const modifiers = formValues.modifiers?.map((modifier, index) => {
        function removeHandler() {
            removeListItem('modifiers', index)
        }
        function clickHandler(){
            setModifierValues({
                modifier,
                index
            })
        }
        const removeButton = (
            <ActionIcon size="xs" color="blue" radius="xl" variant="transparent" onClick={removeHandler}>
                <IconX size={10} />
            </ActionIcon>
        );

        return <Badge key={index} onClick={clickHandler} rightSection={removeButton}>
            {modifier}
        </Badge>
    })

    const sizes = formValues.sizes.map((size, index) => {
        function removeHandler() {
            removeListItem('sizes', index)
        }
        function clickHandler(){
            setSizeValues({
                ...size,
                index
            })
        }
        const removeButton = (
            <ActionIcon size="xs" color="blue" radius="xl" variant="transparent" onClick={removeHandler}>
                <IconX size={10} />
            </ActionIcon>
        );

        return <Badge onClick={clickHandler} key={index} rightSection={removeButton}>
            {size.size}: {size.price}&#8362;
        </Badge>
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
                    <Select
                        label="Category"
                        {...selectProps}
                        {...getInputProps("categoryId")}
                    />
                    <Textarea
                        label="Description"
                        {...getInputProps("description")}
                    >
                    </Textarea>
                </FormGrid>
            </FormSection>

            <FormSection title="Modifiers" error={getInputProps("modifiers").error}>
                <form onSubmit={onModifierFormSubmit((values) => {
                    if (formValues.modifiers.length > 6) {
                        setFieldError("modifiers", "cannot insert than 6 modifiers")
                        return;
                    }
                    if(values.index !== -1){
                        removeListItem("modifiers", values.index)
                        insertListItem("modifiers", values.modifier, values.index)
                    }else {
                        insertListItem("modifiers", values.modifier)
                    }
                    setModifierValues(initialModifierValues)
                })}>
                    <Group mb="md" align="flex-start">
                        <TextInput placeholder="Insert modifier" {...modifierFormInputsProps("modifier")} />
                        <Button type="submit" size="sm" variant="light">
                            Add Modifier
                        </Button>
                    </Group>
                </form>
                {modifiers}
            </FormSection>

            <FormSection title="Sizes" error={getInputProps("sizes").error}>
                <form onSubmit={onSizeFormSubmit((values) => {
                    if (formValues.sizes.length === 3) {
                        setFieldError("sizes", "cannot insert than 3 sizes")
                        return;
                    }
                    if(values.index !== -1){
                        removeListItem("sizes", values.index)
                        insertListItem("sizes", {
                            size: values.size,
                            price: values.price
                        }, values.index)
                    }else {
                        insertListItem("sizes", values)
                    }
                    setSizeValues(initialSizeValues)
                })}>
                    <Group mb="md" align="flex-start">
                        <TextInput placeholder="Insert size" {...sizeFormInputsProps("size")} />
                        <NumberInput placeholder="Insert price" {...sizeFormInputsProps("price")} />
                        <Button type="submit" size="sm" variant="light">
                            Add Size
                        </Button>
                    </Group>
                </form>
                {sizes}
            </FormSection>

            <FormSection title="Image" error={getInputProps("image").error}>
                <FileUploader fileName={formValues.image} onSuccess={uploadedImageHandler} />
            </FormSection>
        </>
    )
}

export default ItemFormLayout