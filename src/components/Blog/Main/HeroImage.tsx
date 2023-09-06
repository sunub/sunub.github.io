"use client"

import React from "react"
import styled from "styled-components"
import * as Matter from "matter-js"
import * as Icons from "./icons"

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 400px;
    position: relative;

    padding-left: 32px;
    padding-right: 32px;
    z-index: -1;
`

const BackgroundClouds = styled.div`
    
`

const Engine = Matter.Engine, Render = Matter.Render, Runner = Matter.Runner, Bodies = Matter.Bodies, Composite = Matter.Composite;

const engine = Engine.create()

export default function HeroImage() {
    return (
        <Container>
            <BackgroundClouds>
                <Icons.BackgroundClouds />
            </BackgroundClouds>
        </Container>
    )
}