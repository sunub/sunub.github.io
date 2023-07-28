'use client'

import styled from "styled-components"
import ButtonHandler from "@/utils/btnHandler"
import React, { useContext } from "react"
import { HeaderContext } from "../../Header.context"

const Navigation = styled.button.attrs({
    className: 'navigation-menu'
})`
    position: absolute;
    inset: 0px;
    width: 100vw;
    height: 100vh;

    display: flex;

    background: color-mix(in oklch, var(--color-primary) 80%, transparent);
    backdrop-filter: blur(8px);
    
    &[aria-hidden=true] {
        transition: all 500ms ease;
        visibility: hidden;
        opacity: 0;
    }
    
    &[aria-hidden=false] {
        transition: all 200ms ease;
        visibility: visible;
        opacity: 1;
    }
`

const MobileContainer = styled.div.attrs({
    id: "mobile-nav-btn"
})`
        position: fixed;
        inset: 0px;
        z-index: 10000;
        overflow: hidden;
    `


export default function NavigationMenu({ children }: { children: React.ReactNode }) {
    const context = useContext(HeaderContext);

    return (
        <MobileContainer style={context.isOpen ? { pointerEvents: "auto"} : { pointerEvents: "none"}}>
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