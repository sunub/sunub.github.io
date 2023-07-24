'use client'

import styled from "styled-components"

const Navigation = styled.button`
    width: 100%;
    height: 100%;

    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;

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

export default function NavigationMenu() {
    return (
        <Navigation
            onClick={(e) => {
                const curr = e.target as HTMLElement;
                curr.setAttribute('aria-hidden', 'false');
            }}
            aria-hidden={true}
        >

        </Navigation>
    )
}