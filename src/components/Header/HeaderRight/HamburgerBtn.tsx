"use client"

import styled from "styled-components";
import ButtonHandler from "@/utils/btnHandler";
import { useContext } from "react";
import { HeaderContext } from "../Header.context";

const Open = styled.g`
    transform-origin: center;
    transform: scale(1);
    transition: all opacity 500ms ease;

    & > #center {
        transition: all 500ms ease;
        transform-origin: center;
        transform: scaleX(1);
    }
    & > #bottom {
        transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        stroke-width: 3px;

    }
    & > #top {
        transition: all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
        stroke-width: 3px;
    }
    `

const Close = styled.g`
    transform: translate(0);
    transition: all 500ms ease;
    `
const Cross1 = styled.path`
    transform-origin: center center;

    @keyframes cross1-open {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(45deg);
        }
    }

    @keyframes cross1-close {
        0% {
            transform: rotate(45deg);
            opacity: 1;
        }
        
        100% {
            transform: rotate(0deg);
            opacity: 0;
        }
    }

`
const Cross2 = styled.path`
    transform-origin: center center;

    @keyframes cross2-open {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(-45deg);
        }
    }

    @keyframes cross2-close {
        0% {
            transform: rotate(-45deg);
            opacity: 1;
        }
        
        100% {
            transform: rotate(0deg);
            opacity: 0;
        }
    }
    `

const Circle = styled.rect`
    stroke-width: 3px;
    transform-origin: center;

    @keyframes circle-pop {
        0% {
            stroke: none;
            transform: scale(0);
        }
        
        100% {
            stroke: var(--color-text);
            transform: scale(1);
        }
    }
`

const Btn = styled.button`
    display: none;
    opacity: 1;

    width: 40px;
    height: 40px;

    padding: 0;
    cursor: pointer;
    position: relative;
    z-index: 15;

    &[aria-label='Open menu'] ${Open} {
        #center {
            transform: scaleX(1);
        }
    }
    &[aria-label='Open menu'] ${Close} {
        & > ${Circle} {
            stroke: none;
        }
    
        & > ${Cross1} {
            animation: cross1-close 200ms;
            animation-iteration-count: 1;
            animation-timing-function: ease-out;
            transform: rotate(0deg);
        }
        & > ${Cross2} {
            animation: cross2-close 200ms;
            animation-iteration-count: 1;
            animation-timing-function: ease-out;
            transform: rotate(0deg);
        }
    }
    
    &[aria-label='Close menu'] ${Open} {
        transform: scale(.1);
        #center {
            transform: scaleX(.5);
        }

        #top {
        transform: translateY(6.75px);
        }

        #bottom {
        transform: translateY(-6.75px);
        }
    }
    &[aria-label='Close menu'] ${Close} {
        & > ${Circle} {
            animation: circle-pop 600ms;
            animation-iteration-count: 1;
            animation-timing-function: ease;
        }

        & > ${Cross1} {
            animation: cross1-open 500ms;
            animation-iteration-count: 1;
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: rotate(45deg);
        }
        
        & > ${Cross2} {
            animation: cross2-open 500ms;
            animation-iteration-count: 1;
            animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
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
    justify-content: center;
    width: 40px;
    height: 40px;

    display: flex;
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
    const context = useContext(HeaderContext)

    return (
        <Btn
            aria-label="Open menu"
            onClick={(e: any) => {
                const isOpen = context.isOpen;
                const handler = ButtonHandler(e);
                handler.open(isOpen);
                context.setOpen(!isOpen);
            }}
        >
            <Hamburger />
        </Btn>
    );
}
