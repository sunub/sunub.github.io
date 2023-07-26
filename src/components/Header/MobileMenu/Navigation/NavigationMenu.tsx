'use client'

import styled from "styled-components"
import ButtonHandler from "@/utils/btnHandler"
import React, { useContext } from "react"
import { HeaderContext } from "../../Header.context"

const MobileContainer = styled.div`
    width: 100%;
    height: 100%;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
`

const Navigation = styled.button.attrs({
    className: 'navigation-menu'
})`
    display: flex;
    width: 100%;
    height: 100%;

    background: var(--color-primary);
    backdrop-filter: blur(8px);
    
    &[aria-hidden=true] {
        transition: visibility opacity 500ms ease;
        visibility: hidden;
        opacity: 0;
    }
    
    &[aria-hidden=false] {
        transition: visibility opacity 200ms ease;
        visibility: visible;
        opacity: 1;
    }
`

export default function NavigationMenu({ children }: { children: React.ReactNode }) {
    const context = useContext(HeaderContext);

    return (
        <MobileContainer>
            <Navigation
                onClick={(e: any) => {
                    const isOpen = context.isOpen;
                    const handler = ButtonHandler(e);
                    handler.hidden(isOpen);
                    context.setOpen(!isOpen);
                }}
                aria-hidden={true}
                tabIndex={-1}
            >
            </Navigation>
            {children}
        </MobileContainer>
    )
}