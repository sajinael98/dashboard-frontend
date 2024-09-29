import { Button, Card, Group, Image, SimpleGrid, Text, TextInput } from "@mantine/core";
import {
    Dropzone,
    IMAGE_MIME_TYPE,
    type FileWithPath,
} from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { useCustomMutation } from '@refinedev/core';
import { IconPhoto, IconTrash, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface FileUploaderProps {
    fileName?: string;
    onSuccess: (fileName: string) => void;
}

const ImageCard = ({ image }: { image: string }) => {
    return <Card withBorder shadow="sm">
        <Card.Section p='xs' pos="relative" h={150}>
            <Image
                style={{width: "100%", height: "100%", objectFit: "contain"}}
                src={`/backend-api/files/${image}`}
            />
        </Card.Section>
        <TextInput label="File Name" variant="filled" size="xs" value={image}/>
        <Card.Section p='xs'>
            <Group position="right">
                <Button leftIcon={<IconTrash size=".9rem" />} variant="light" size="xs" color="red">
                    Delete
                </Button>
            </Group>
        </Card.Section>
    </Card>
}

const FileUploader = ({ fileName, onSuccess }: FileUploaderProps) => {
    const [image, setImage] = useState<undefined | string>()
    const { mutateAsync } = useCustomMutation()

    useEffect(() => {
        setImage(fileName)
    }, [fileName])

    function handleOnDrop(files: FileWithPath[]) {
        mutateAsync({
            method: "post",
            url: "/files/upload",
            values: {
                file: files[0]
            },
            config: {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        }).then(() => {
            setImage(files[0].name)
            onSuccess(files[0].name)
            showNotification({
                message: "File has been uploaded successfully."
            })
        })
    }

    return (
        <>
            <Dropzone
                onDrop={handleOnDrop}
                maxSize={3 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                mb='md'
                maxFiles={1}
            >
                <Group position="center" spacing="xl" style={{ minHeight: 220, pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            size={50}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            size={50}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto size={50} stroke={1.5} />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag image here or click to select files
                        </Text>
                        {/* <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text> */}
                    </div>
                </Group>
            </Dropzone>
            <SimpleGrid breakpoints={[
                {
                    cols: 4,
                    minWidth: "lg"
                },
                {
                    cols: 3,
                    minWidth: 'md'
                },
                {
                    cols: 1,
                    minWidth: "xs"
                }
            ]}>

                {image && <ImageCard image={image} />}
            </SimpleGrid>
        </>
    )
}

export default FileUploader