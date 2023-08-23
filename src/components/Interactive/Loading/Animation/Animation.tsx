"use client"

import styled from "styled-components";
import Cloud from "./Cloud";
import FlyingBird from "./FlyingBird";

const LoadingContainer = styled.div`
    grid-area: loading;

    display: grid;
    grid: [bird] 1fr / [bird] 1fr;
`

export default function Animation() {
    return (
        <LoadingContainer>
            <Cloud />
            <FlyingBird />
        </LoadingContainer>
    )
}