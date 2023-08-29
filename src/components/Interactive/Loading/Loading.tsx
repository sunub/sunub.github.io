"use client"

import React from "react"
import Animation from "./Animation/index"
import Button from "./Button/index"
import AnimationProvider from "./Loading.context"
import { Spacer } from "@/constants/Spacer"
import styled from "styled-components"

const Container = styled.div`
    display: flex;
    flex-direction: column;

    gap: 2rem;
`

export default function Loading() {

    return (<>
        <Spacer dir="vertical" size={16} />
        <Container>
            <AnimationProvider>
                <Animation />
                <Button />
            </AnimationProvider>
        </Container>
    </>)
}