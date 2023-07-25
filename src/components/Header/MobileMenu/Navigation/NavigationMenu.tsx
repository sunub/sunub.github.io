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

const Navigation = styled.button`
    width: 100%;
    height: 100%;

    background: hsla(0deg, 0%, 100%, 0.85);
    backdrop-filter: blur(8px);

    &[aria-hidden=true] {
        display: none;
        opacity: 0;
    }
    
    &[aria-hidden=false] {
        display: flex;
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
            >
                {children}
            </Navigation>
        </MobileContainer>
    )
}