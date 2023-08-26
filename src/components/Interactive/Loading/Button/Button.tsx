"use client"

import React from "react"
import styled from "styled-components"
import { AnimationContext } from "../Loading.context"

/**
 * Button styled-component
 */
const RootContainer = styled.div`
    display: flex;
    position: relative;
    
    justify-content: center;
    margin-bottom: 64px;
    
    --btn-background-color: oklch(45.56% 0.182 14.09);
    --btn-text-color: oklch(60.33% 0.24253053789753418 20.760123262951282);
    `

const Front = styled.span`
    display: block;
    font-size: 1.5rem;
    color: var(--color-background);
    padding: 13px 42px;
    border-radius: 20px;
    background-color: var(--btn-text-color);
    
    user-select: none;
    will-change: transform;
    transform: translateY(-6px);
    transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
    `

const Shadow = styled.span`
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    border: none;
    border-radius: 15px;
    background-color: oklch(0% 0 14.09 / 45%);
    transition: transform 600ms cubic-bezier(.3, .7, .4, 1);
    
    filter: blur(2px);
    transform: translateY(6px);
    `
const Edge = styled.span`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: none;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    border-bottom-right-radius: 15px;
    border-bottom-left-radius: 15px;
    background-image: linear-gradient(
        to left,
        oklch(19.82% 0.133 14.09) 0%,
        oklch(45.56% 0.182 14.09) 9%,
        oklch(45.56% 0.182 14.09) 91%,
        oklch(19.82% 0.133 14.09) 100%
        );
        `

const Btn = styled.button.attrs((props: any) =>
({
    "aria-pressed": props.$isClick ?? false
})) <{ $position: string, $isClick: boolean }>`
    background-color: transparent;
    padding: 0;
    border-radius: 20px;
    border: none;
    outline-offset: 4px;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    
    :focus:not(:focus-visible) {
        outline: none;
    }
    
    :hover ${Front} {
        filter: brightness(110%);
        transform: translateY(-8px);
        transition: transform 200ms cubic-bezier(.3, .7, .4, 1);
    }
    
    &[aria-pressed="true"] ${Front} {
        transform: translateY(${(props) => props.$position});
        animation: backwards;
        transition: transform 34mx;
    }

    &[aria-pressed="true"] ${Shadow} {
        transform: translateY(2px);
        transition: transform 34mx;
    }
    
    :hover:not(:focus) ${Shadow} {
        transform: translateY(4px);
        transition: transform 200ms cubic-bezier(.3, .7, .4, 1);
    }
`

const ButtonBorder = styled.div`
    display: grid;
    grid: [wave] 1fr / [wave] 1fr;
    justify-items: center;
    align-items: center;

    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    z-index: -1;
`

const Wave = styled.div<{ $size: number }>`
    grid-area: wave;
    --border-color1: linear-gradient(
        90deg,
        hsl(340deg 100% 32%) 0%,
        hsl(344deg 96% 41%) 24%,
        hsl(349deg 93% 51%) 35%,
        hsl(353deg 89% 60%) 45%,
        hsl(357deg 86% 69%) 55%,
        hsl(2deg 82% 78%) 65%,
        hsl(6deg 78% 87%) 76%,
        hsl(10deg 75% 97%) 100%
        );
    --border-color2: linear-gradient(
        -90deg,
        hsl(340deg 100% 32%) 0%,
        hsl(344deg 96% 41%) 24%,
        hsl(349deg 93% 51%) 35%,
        hsl(353deg 89% 60%) 45%,
        hsl(357deg 86% 69%) 55%,
        hsl(2deg 82% 78%) 65%,
        hsl(6deg 78% 87%) 76%,
        hsl(10deg 75% 97%) 100%
        );

    width: calc(100% + ${(props) => props.$size}px);
    height: calc(100% + ${(props) => props.$size}px);
    transform: translateY(-3px);
    border-radius: 20px;
    border: 3px solid transparent;

    background: var(--border-color1), var(--border-color2) padding-box, var(--border-color1) border-box;
    background-origin: content-box;

    animation: wave 1.725s ease 0s infinite;
    @keyframes wave {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        60% {
            transform: scale(1.15);
            opacity: .4;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`

/**
 * Button Components
 */

export default function Button() {
    const [isClick, setClick] = React.useState(false);
    const [position, setPosition] = React.useState("-8px");
    const ctx = React.useContext(AnimationContext);

    React.useEffect(() => {
        const newPosition = isClick ? "-2px" : "-8px"
        setPosition(newPosition);
        ctx?.setter(isClick);
    }, [isClick])
    return (
        <RootContainer>
            <Btn
                aria-pressed={false}
                onClick={() => setClick(!isClick)}
                $position={position}
                $isClick={isClick}
            >
                <Shadow />
                <Edge />
                <Front >
                    {isClick ? "pause!" : "play!"}
                </Front>
                <ButtonBorder>
                    <Wave $size={8} />
                    <Wave $size={20} />
                </ButtonBorder>
            </Btn>
        </RootContainer>
    )
}