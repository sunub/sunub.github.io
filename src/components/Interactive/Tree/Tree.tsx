"use client"

import React from "react"
import styled from "styled-components";

const Frame = styled.div`
    
`

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode,
    defaultOpen: boolean,
    name: string | JSX.Element,
}

function usePrevious(value) {
    const ref = React.useRef();

    React.useEffect(() => {
        ref.current = value
    }, [value])

    return ref.current
}

const Tree = React.memo(({ children, name, style, defaultOpen = false }: TreeProps) => {
    const [isOpen, setOpen] = React.useState(false);


    return (
        <Frame>
            {children}
        </Frame>
    )
})

Tree.displayName = "Tree"
