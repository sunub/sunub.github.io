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
    transform: translateY(-.5px);
`

const Wave = styled.div<{ $size: number, $deg: string, $isClick: boolean }>`
    grid-area: wave;
    --border-color: linear-gradient(
        ${((props) => props.$deg)},
      hsl(10deg 90% 66%) 0%,
      hsl(8deg 89% 65%) 22%,
      hsl(7deg 89% 64%) 33%,
      hsl(5deg 89% 63%) 42%,
      hsl(2deg 88% 62%) 50%,
      hsl(360deg 88% 61%) 58%,
      hsl(356deg 88% 58%) 67%,
      hsl(352deg 88% 54%) 78%,
      hsl(345deg 100% 47%) 100%
    );

    width: calc(100% + ${(props) => props.$size}px);
    height: calc(100% + ${(props) => props.$size}px);
    border-radius: 30px;
    border: 5px dotted transparent;

    background-image: var(--border-color);
    background-origin: border-box;
    background-clip: content-box, border-box;
    
    opacity: ${(props) => props.$isClick ? 1 : 0};
    
    animation: ${(props) => props.$isClick
        ? "wave 1.7s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite"
        : ""};
    @keyframes wave {
        0% {
            transform: scale(0.9);
            opacity: .6;
        }
        30% {
            transform: scale(1.03);
            opacity: .5;
        }
        60%{
            transform: scale(0.85);
            opacity: .1;
        }
        100%{
            transform: scale(0.9);
            opacity: .6;
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
                    <Wave
                        id="outer-wave"
                        $size={20}
                        $deg={"90deg"}
                        $isClick={isClick} />
                </ButtonBorder>
            </Btn>
        </RootContainer>
    )
}