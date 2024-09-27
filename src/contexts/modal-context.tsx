import { useDisclosure } from "@mantine/hooks";
import { PropsWithChildren, createContext } from "react";
import { boolean } from "zod";

export const ModalContext = createContext({
    opened: false,
    open: () => { },
    close: () => { }
})

const ModalProvider = ({ children }: PropsWithChildren) => {
    const [opened, { close, open }] = useDisclosure(false)
    return <ModalContext.Provider value={{
        opened,
        open,
        close
    }}>
        {children}
    </ModalContext.Provider>
}

export default ModalProvider;