import { Group, Image, SimpleGrid, Text } from "@mantine/core";
import {
    Dropzone,
    IMAGE_MIME_TYPE,
    type FileWithPath,
} from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { useCustomMutation } from '@refinedev/core';
import { IconPhoto, IconUpload, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface FileUploaderProps {
    fileName?: string;
    onSuccess: (fileName: string) => void;
}

const FileUploader = ({ fileName, onSuccess }: FileUploaderProps) => {
    const [hasFile, setHasFile] = useState(false)
    const { mutateAsync } = useCustomMutation()
    const [files, setFiles] = useState<FileWithPath[]>([]);

    useEffect(() => {
        if (files.length) {
            setHasFile(false)
        }
    }, [files.length])
    
    useEffect(() => {
        if(!!fileName){
            setHasFile(true)
        }
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
            setFiles(files)
            onSuccess(files[0].name)
            showNotification({
                message: "File has been uploaded successfully."
            })
        })
    }

    const previews = files.map((file, index) => {
        const imageUrl = URL.createObjectURL(file);
        return (
            <Image
                key={index}
                src={imageUrl}
                imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
            />
        );
    });

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
                {hasFile ? <Image
                    src={`/backend-api/files/${fileName}`}
                /> : previews}
            </SimpleGrid>
        </>
    )
}

export default FileUploader