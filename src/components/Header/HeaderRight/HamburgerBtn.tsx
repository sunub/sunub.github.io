"use client"

import styled from "styled-components";

const Open = styled.g`
    transform: translate(0);
    `

const Close = styled.g`
    transform: translate(0);
    `
const Cross1 = styled.path`
    transform-origin: center center;
    transform: translate(0);
`
const Cross2 = styled.path`
    transform-origin: center center;
    transform: translate(0);
`

const Circle = styled.rect`
    stroke-width: 3px;
`

const Btn = styled.button`
    display: none;
    opacity: 1;

    width: 40px;
    height: 40px;

    padding: 0;
    cursor: pointer;
    
    &[aria-label='Open menu'] ${Open} {
        display: block;
        opacity: 1;
    }
    &[aria-label='Open menu'] ${Close} {
        display: none;
        opacity: 0;
    }
    
    &[aria-label='Close menu'] ${Open} {
        display: none;
        opacity: 0;
    }
    &[aria-label='Close menu'] ${Close} {
        display: block;
        opacity: 1;

        & > ${Cross1} {
            transform: rotate(45deg);
        }
    
        & > ${Cross2} {
            transform: rotate(-45deg);
        }
    }

    @media ( max-width: 768px ) {
        & {
            display: block;
            opacity: 1;
        }
    }
`

const Svg = styled.svg`
    width: 40px;
    height: 40px;

    display: flex;
    justify-content: center;
    align-items: center;

    & > g {
        & > path, rect {
            stroke: var(--color-text);
        }
    }
`


function Hamburger() {
    return <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Open>
            <path id="top" d="M6.12 9.5L25.88 9.5" strokeWidth="3" strokeLinecap="round" />
            <path id="bottom" d="M6.12 23H25.88" strokeWidth="3" strokeLinecap="round" />
            <path id="center" d="M3 16H29" strokeWidth="3" strokeLinecap="round" />
        </Open>
        <Close>
            <Circle id="Rectangle 91" x="2.5" y="2.5" width="27" height="27" rx="13.5" strokeWidth="3" />
            <Cross1 id="cross2" d="M9 16H23.6601" strokeWidth="3" strokeLinecap="round" />
            <Cross2 id="cross1" d="M9 16H23.6601" strokeWidth="3" strokeLinecap="round" />
        </Close>
    </Svg>


}

export default function HamburgerBtn() {
    return (
        <Btn
            id="hamburger-btn"
            aria-label="Open menu"
            onClick={() => {
                const button = document.querySelector('#hamburger-btn');
                button?.getAttribute('aria-label') === 'Open menu'
                    ? button?.setAttribute('aria-label', 'Close menu')
                    : button?.setAttribute('aria-label', 'Open menu');
            }}
        >
            <Hamburger />
        </Btn>
    );
}
