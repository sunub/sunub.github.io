"use client"

import React from "react"
import styled from "styled-components"

const RootContainer = styled.div`
    display: flex;
    
    justify-content: center;
    margin-bottom: 64px;
    
    --btn-background-color: oklch(45.56% 0.182 14.09);
    --btn-text-color: oklch(60.33% 0.24253053789753418 20.760123262951282);
    `

const BtnText = styled.span<{ $position: string }>`
    display: block;
    background-color: var(--btn-text-color);
    padding: 12px 42px;
    border-radius: 15px;
    font-size: 1.5rem;
    color: white;
    transform: translateY(${(props) => props.$position});
    white-space: break-spaces;
    
    will-change: transform;
    transition: transform 600ms cubic-bezier(.3, .7, .4, 1);

    :hover {
        transition: filter 250ms cubic-bezier(.3, .7, .4, 1);
        filter: brightness(110%);
    }
    `

const Shadow = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background-color: oklch(0% 0 0 / 25%);
    transform: translateY(6px);
`
const Edge = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 15px;
    background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
`

const Btn = styled.button`
    background-color: transparent;
    position: relative;
    
    border-radius: 15px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;

    -webkit-tap-highlight-color: transparent;
    user-select: none;

    &:focus:not(:focus-visible) {
        outline: none;
    }

    &:hover ${BtnText}{
        filter: brightness(110%);
        transform: translateY(-8px);
        transition: transform 250ms cubic-bezier(.3, .7, .4, 1);
    }


    &:focus ${Shadow}{
        transform: translateY(3px);
        transition: transform 34ms;
    }
`


// oklch(59.83% 0.24 20.83)

// oklch(63.76% 0.254 12.64)

export default function Button() {
    const [isClick, setClick] = React.useState(false);

    return (
        <RootContainer>
            <Btn
            >
                <Shadow />
                <Edge />
                <BtnText
                    onClick={() => {
                        console.log(isClick)
                        setClick(!isClick)
                    }}
                    $position={isClick ? "-2px" : "-6px"}
                >
                    play!
                </BtnText>
            </Btn>
        </RootContainer>
    )
}