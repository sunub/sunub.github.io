"use client"

import styled from "styled-components";
import Cloud from "./Cloud";
import FlyingBird from "./FlyingBird";
import React from "react";

const LoadingContainer = styled.div`
    grid-area: loading;

    display: grid;
    grid: [bird] 1fr / [bird] 1fr;
`

export default function Animation({ btnRef }: { btnRef: React.RefObject<HTMLButtonElement> }) {
    const [isPressed, setPressed] = React.useState(false);



    return (
        <LoadingContainer>
            <Cloud btnRef={btnRef} />
            <FlyingBird btnRef={btnRef} />
        </LoadingContainer>
    )
}