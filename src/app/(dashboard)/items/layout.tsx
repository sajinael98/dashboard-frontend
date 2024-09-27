"use client"

import ResourceListWithDialogPage from '@components/layout/ListWithDialog';
import { PropsWithChildren } from 'react';

const layout = ({ children }: PropsWithChildren) => {
    return (
        <ResourceListWithDialogPage>
            {children}
        </ResourceListWithDialogPage>
    )
}

export default layout