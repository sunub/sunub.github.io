"use client"

import styled from "styled-components";
import ButtonHandler from "@/utils/btnHandler";
import { useState } from "react";

const Open = styled.g`
    transform-origin: center;
    transition: all opacity 500ms ease;

    & > #center {
        transition: all 500ms ease-in;
        transform-origin: center;
        transform: scaleX(1);
    }
    & > #bottom {
        transition: all 500ms ease-in;
    }
    & > #top {
        transition: all 500ms ease-in;
    }
    `

const Close = styled.g`
    transform: translate(0);
    transition: all 500ms ease;
    `
const Cross1 = styled.path`
    transform-origin: center center;
    transform: translate(0);
    transition: all 500ms ease;

`
const Cross2 = styled.path`
    transform-origin: center center;
    transform: translate(0);
    transition: all 500ms ease;
    `

const Circle = styled.rect`
    transition: all 500ms ease;
    stroke-width: 0px;
    transform-origin: center;
    fill: var(--color-text);
    transform: scale(.2);
`

const Btn = styled.button`
    display: none;
    opacity: 1;

    width: 40px;
    height: 40px;

    padding: 0;
    cursor: pointer;

    &[aria-label='Open menu'] ${Open} {
        opacity: 1;
        #center {
            transform: scaleX(1);
        }
    }
    /* &[aria-label='Open menu'] ${Close} {
        & > ${Circle} {
            opacity: 0;
        }
    } */
    
    &[aria-label='Close menu'] ${Open} {

        #center {
            transform: scaleX(.8);
        }

        #top {
        transform: translateY(6.75px);
        }

        #bottom {
        transform: translateY(-6.75px);
        }
    }
    /* &[aria-label='Close menu'] ${Close} {
        opacity: 1;

        & > ${Circle} {
            stroke-width: 3px;
            transform: scale(1);
            fill: none;
        }

        & > ${Cross1} {
            transform: rotate(45deg);
        }
    
        & > ${Cross2} {
            transform: rotate(-45deg);
        }
    } */

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
            <path id="center" d="M3 16H29" strokeWidth="4" strokeLinecap="round" />
        </Open>
        <Close>
            <Circle id="Rectangle 91" x="2.5" y="2.5" width="27" height="27" rx="13.5" strokeWidth="2" />
            <Cross1 id="cross2" d="M9 16H23.6601" strokeWidth="3" strokeLinecap="round" />
            <Cross2 id="cross1" d="M9 16H23.6601" strokeWidth="3" strokeLinecap="round" />
        </Close>
    </Svg>


}

export default function HamburgerBtn() {
    const [isOpen, setOpen] = useState(false);

    return (
        <Btn
            aria-label="Open menu"
            onClick={(e: any) => {
                const handler = ButtonHandler(e);
                handler.open(isOpen);
                setOpen(!isOpen);
            }}
        >
            <Hamburger />
        </Btn>
    );
}
