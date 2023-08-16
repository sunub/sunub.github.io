"use client"

import styled from "styled-components"
import { navigationStories } from "./DirectionBtn.helper"

/**
 * Type declaration
 */

interface DirectionBtnProps {
    uses: string
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

export default function DirectionBtn({ uses }: DirectionBtnProps) {
    const content = uses === "prev" ? "navigate_before" : "navigate_next";

    return (
        <Button
            id={`stories__${uses}-btn`}
            className="material-icons"
            onClick={() => {
                const stories = document.querySelector(".stories__container") as HTMLElement
                navigationStories({ stories: stories, direction: uses })
            }}
        >
            {content}
        </Button>
    )
}