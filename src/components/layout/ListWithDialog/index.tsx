import { ModalContext } from '@contexts/modal-context';
import { useDisclosure } from '@mantine/hooks';
import { List } from '@refinedev/mantine';
import { ComponentProps, PropsWithChildren } from 'react';

interface ResourceListWithDialogPageProps extends ComponentProps<typeof List> {
}

const ResourceListWithDialogPage = ({ children, ...props }: PropsWithChildren<ResourceListWithDialogPageProps>) => {
    const [opened, { close, open }] = useDisclosure(false)

    return (
        <ModalContext.Provider value={{
            opened,
            open,
            close
        }}>
            <List canCreate createButtonProps={{ onClick: () => open() }} {...props}>
                {children}
            </List>
        </ModalContext.Provider>
    )
}

export default ResourceListWithDialogPage