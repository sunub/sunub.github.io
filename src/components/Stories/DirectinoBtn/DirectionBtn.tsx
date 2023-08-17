"use client"

import styled from "styled-components"
import { navigationStories } from "./DirectionBtn.helper"
import React from "react"

/**
 * Type declaration
 */

interface DirectionBtnProps {
    direction: string
}

/**
 * Styled components
 */

const Button = styled.button`
    width: fit-content;
    height: fit-content;
`

/**
 * React Components
 */

export default function DirectionBtn({ direction }: DirectionBtnProps) {
    const content = direction === "prev" ? "navigate_before" : "navigate_next";

    return (
        <Button
            id={`stories__${direction}-btn`}
            className="material-icons"
            onClick={() => navigationStories(direction)}
        >
            {content}
        </Button>
    )
}