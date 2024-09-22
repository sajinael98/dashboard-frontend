import React, { PropsWithChildren } from 'react'

const DemoPage = ({ children }: PropsWithChildren) => {
    return (
        <div>DemoPage
            <div>{children}</div>
        </div>

    )
}

export default DemoPage