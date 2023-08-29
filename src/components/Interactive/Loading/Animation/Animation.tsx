"use client"

import styled from "styled-components";
import CloudAnime from "./CloudAnime";
import FlyingBirdAnime from "./FlyingBirdAnime";
import React from "react";

const LoadingContainer = styled.div`
    grid-area: loading;

    display: grid;
    grid: [bird] 1fr / [bird] 1fr;
    gap: 2rem;
`

export default function Animation() {

    return (
        <LoadingContainer>
            <CloudAnime
                id="behind-scene__cloud"
                startPosition={{
                    startX: 100,
                    endX: -300,
                    y: "50px",
                }}
                duration={2100} />
            <FlyingBirdAnime />
            <CloudAnime
                id="front-scene__cloud"
                startPosition={{
                    startX: 200,
                    endX: -100,
                    y: "-20px",
                }}
                duration={2100} />
        </LoadingContainer>
    )
}